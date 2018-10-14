import ora from 'ora';
import figures from 'figures';
import string from '../utils/string';
import logger from '../utils/logger';
import { formatError, crumbTitle } from './formatter';

export default class Reporter {
    pending = ora();
    pendings = new Map();

    prepare () {
        this.pending.stop();
        this.pendings.clear();
        this.totalSpecCount = 0;
        this.passedSpecCount = 0;
        this.failedSpecs = [];
    }

    get lastPending () {
        return this.pendings.size === 0 ? '' :
            [...this.pendings.values()].pop();
    }

    get statusText () {
        return [
            string.cyan(`Total: ${this.totalSpecCount}`),
            string.green(`Passed: ${this.passedSpecCount}`),
            string.error(`Failed: ${this.failedSpecs.length}`)
        ].join(string.dim(',  '));
    }

    onSuiteReady (suite, specs) {
        this.totalSpecCount += specs.length;
    }

    onSpecReady (suite, spec) {
        const text = crumbTitle(suite.srcpath, spec.title);
        this.pendings.set(spec.key, text);
        this.showPendingStatus(text);
    }

    onSpecFinished (suite, spec) {
        this.pending.stop();
        const text = this.pendings.get(spec.key);
        if (spec.failed) {
            logger.error(text);
            this.failedSpecs.push(spec);
        } else {
            logger.success(text);
            this.passedSpecCount += 1;
        }
        this.pendings.delete(spec.key);
        this.showPendingStatus();
    }

    onSuiteFinished (suite) {
        //
    }

    showPendingStatus (text = this.lastPending) {
        if (!text) return;
        const indicator = string.dim(figures.pointerSmall.repeat(3));
        this.pending.start(` ${text}` + `\n\n${indicator} ` + this.statusText);
    }

    sumup (suites, metric) {
        if (this.failedSpecs.length) {
            const title = string.error(`${this.failedSpecs.length} Failed.`);
            logger.title(string.white.bgRed(` Failures `) + `  ${title}`);
            for (const spec of this.failedSpecs) {
                logger.writeln(string.error(figures.cross) + ' ' + string.bold(spec.title));
                logger.log(formatError(spec.error.powerAssertContext));
            }
        }

        const result = this.failedSpecs.length ? 'error' : 'success';
        logger.scope('FINISHED')[result](this.statusText);
    }
}
