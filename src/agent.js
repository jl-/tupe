import glob from 'glob';
import Suite from './suite';
import Server from './server';
import Browser from './browser';
import Reporter from './reporter';
import Metrics from './utils/metrics';
import * as status from './meta/status';

export default class Agent {
    constructor (files, options = {}) {
        this.options = options;
        this.suites = new Map();
        this.status = status.INIT;

        this.browser = new Browser();
        this.metrics = new Metrics();
        this.server = new Server(options);
        this.reporter = new Reporter(this);

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
        this.browser.on('specReady', ::this.onSpecReady);
        this.browser.on('specFinished', ::this.onSpecFinished);
        this.browser.on('suiteFinished', ::this.onSuiteFinished);

        process.once('SIGINT', async () => await this.stop());

        return this.server.start(this.suites);
    }

    async digest () {
        const server = this.server;
        this.metrics.record(this.status = status.PENDING);
        for (const suite of this.suites.values()) {
            suite.prepare(server.port, server.host);
            await this.browser.runSuite(suite);
        }
    }

    onSuiteReady (suite, specs) {
        suite.start(specs);
    }

    onSpecReady (suite, spec) {
        this.reporter.onSpecReady(suite, suite.onSpecReady(spec));
    }

    onSpecFinished (suite, spec) {
        this.reporter.onSpecFinished(suite, suite.onSpecFinished(spec));
    }

    async onSuiteFinished (suite, passed, cov) {
        suite.stop(passed, cov);
        this.reporter.onSuiteFinished(suite);

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

export function run (files, options) {
    return (new Agent(files, options)).run();
}
