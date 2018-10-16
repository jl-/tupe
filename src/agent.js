import glob from 'glob';
import Suite from './suite';
import Logger from './logger';
import Server from './server';
import Browser from './browser';
import Reporter from './reporter';
import Metrics from './utils/metrics';
import * as status from './meta/status';
const debug = require('./utils/debug')('agent');

export default class Agent {
    constructor ({ files, ...options } = {}) {
        this.options = options;
        this.suites = new Map();
        this.status = status.INIT;
        this.logger = new Logger();
        this.metrics = new Metrics();

        this.server = new Server(options);
        this.browser = new Browser(this.logger);
        this.reporter = new Reporter(this.logger);

        this.addSuites(files);
    }

    addSuites (files) {
        const entryPaths = files
            .reduce((r, p) => r.concat(glob.sync(p, { nodir: true })), []);

        for (const entryPath of [...new Set(entryPaths)]) {
            const suite = new Suite(entryPath, this.server.tmpdir);
            this.suites.set(suite.path, suite);
        }
    }

    async run () {
        this.server.removeAllListeners();
        this.browser.removeAllListeners();

        this.server.on('bundled', ::this.digest);

        this.browser.on('suiteReady', ::this.onSuiteReady);
        this.browser.on('hookFinished', ::this.onHookFinished);
        this.browser.on('caseReady', ::this.onCaseReady);
        this.browser.on('caseFinished', ::this.onCaseFinished);
        this.browser.on('suiteFinished', ::this.onSuiteFinished);

        process.once('SIGINT', async () => await this.stop());

        return this.server.start(this.suites);
    }

    async digest (bundle) {
        const server = this.server;
        this.reporter.prepare();
        this.metrics.record(this.status = status.PENDING);
        for (const suite of this.suites.values()) {
            suite.prepare(server.port, server.host);
            await this.browser.runSuite(suite);
        }
    }

    onSuiteReady (suite, cases) {
        suite.onReady(cases);
        this.reporter.onSuiteReady(suite, cases);
    }

    onHookFinished (suite, hookState, caseState) {
        suite.onHookFinished(hookState, caseState);
        this.reporter.onHookFinished(suite, hookState, caseState);
    }

    onCaseReady (suite, caseState) {
        suite.onCaseReady(caseState);
        this.reporter.onCaseReady(suite, caseState);
    }

    onCaseFinished (suite, caseState, hookState) {
        suite.onCaseFinished(caseState, hookState);
        this.reporter.onCaseFinished(suite, caseState, hookState);
    }

    async onSuiteFinished (suite, passed, cov) {
        suite.onFinished(passed, cov);
        this.reporter.onSuiteFinished(suite, passed, cov);

        const suites = [...this.suites.values()];
        if (suites.every(s => s.passed || s.failed)) {
            const metric = this.metrics.end(this.status);
            this.reporter.sumup(suites, metric);

            this.status = suites.every(s => s.passed) ?
                status.PASSED : status.FAILED;
            if (!this.server.watch) {
                await this.stop();
            }
        }
    }

    async stop () {
        await this.server.stop();
        await this.browser.exit();
        process.exit(this.isFailed ? 1 : 0);
    }
}

export function run (options) {
    debug('options: ', options);
    return (new Agent(options)).run();
}
