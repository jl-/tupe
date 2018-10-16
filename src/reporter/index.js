import figures from 'figures';
import Coverage from './coverage';
import string from '../utils/string';
import { isFailed } from '../meta/status';
import { explainError, crumbTitle } from './formatter';

export default class Reporter {
    constructor (logger, config) {
        this.logger = logger;
        this.states = new Map();
        this.pendings = new Map();
        this.failures = new Map();
        this.coverage = new Coverage(config.coverage);
    }

    prepare () {
        this.states.clear();
        this.pendings.clear();
        this.failures.clear();
        this.coverage.clear();
        this.totalCaseCount = 0;
        this.passedCaseCount = 0;
    }

    get lastPending () {
        return this.pendings.size === 0 ? '' :
            [...this.pendings.values()].pop();
    }

    get statusText () {
        return [
            string.cyan(`Total: ${this.totalCaseCount}`),
            string.green(`Passed: ${this.passedCaseCount}`),
            string.error(`Failed: ${this.failures.size}`)
        ].join(string.dim(',  '));
    }

    onSuiteReady (suite, cases) {
        this.totalCaseCount += cases.length;
    }

    onHookFinished (suite, hookState, caseState) {
        if (!caseState && isFailed(hookState.status)) {
            this.failures.set(hookState.key, { hookState });
        }
    }

    onCaseReady (suite, caseState) {
        const text = crumbTitle(suite.srcpath, caseState.title);
        this.pendings.set(caseState.key, text);
        this.showPendingText(this.lastPending);
    }

    onCaseFinished (suite, caseState, hookState) {
        this.logger.pending(false);
        const text = this.pendings.get(caseState.key);

        if (isFailed(caseState.status)) {
            this.logger.error(text);
            this.failures.set(caseState.key, { caseState, hookState });
        } else if (hookState && isFailed(hookState.status)) {
            const title = hookState.type + hookState.title + ' Failed For';
            this.logger.error(title + text);
            this.failures.set(caseState.key, { caseState, hookState });
        } else {
            this.passedCaseCount += 1;
            this.logger.success(text);
        }
        this.pendings.delete(caseState.key);
        this.showPendingText(this.lastPending);
    }

    onSuiteFinished (suite, passed, cov) {
        this.coverage.merge(cov);
    }

    showPendingText (text = this.lastPending) {
        if (!text) return;
        const indicator = string.dim(figures.pointerSmall.repeat(3));
        this.logger.pending(` ${text}` + `\n\n${indicator} ` + this.statusText);
    }

    sumup (suites, metric) {
        this.logger.writeln('');
        if (this.failures.size === 0) {
            this.logger.success(this.statusText);
        } else {
            const failures = [...this.failures.values()];
            const isHook = f => f.hookState && isFailed(f.hookState.status);

            const failedHookCount = failures.filter(isHook).length;
            const failedCaseCount = failures.length - failedHookCount;

            const title = [
                failedHookCount > 0 ? `${failedHookCount} hooks` : '',
                failedCaseCount > 0 ? `${failedCaseCount} cases` : ''
            ].filter(Boolean).join(string.dim(',  '));

            this.logger.title(string.white.bgRed(` Failures `) + `  ${string.red(title)}`);
            for (const { caseState, hookState } of failures) {
                this.logger.error(string.bold(caseState.title));
                if (caseState && isFailed(caseState.status)) {
                    explainError(this.logger, caseState.error);
                } else {
                    explainError(this.logger, hookState.error);
                }
            }
            this.logger.error(this.statusText);
        }
        this.logger.writeln('');
        this.coverage.report();
        this.logger.writeln('\n');
    }
}
