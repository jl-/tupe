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
        this.browser.on('specFinished', ::this.onSpecFinished);
        this.browser.on('suiteFinished', ::this.onSuiteFinished);

        process.once('SIGINT', async () => await this.stop());

        return this.server.start(this.suites);
    }

    async digest () {
        const server = this.server;
        this.metrics.record(status.PENDING);
        for (const suite of this.suites.values()) {
            suite.start(server.port, server.host);
            await this.browser.runSuite(suite);
        }
    }

    async onSpecFinished (suite, spec) {
        this.reporter.receive(suite, suite.record(spec));
    }

    async onSuiteFinished (suite, specs, passed, cov) {
        suite.stop(specs, passed, cov);
        if ([...this.suites.values()].every(
            suite => suite.finished
        )) {
            const metric = this.metrics.end(status.PENDING);
            this.reporter.sumup(this.suites, metric);
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
