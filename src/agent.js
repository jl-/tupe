import glob from 'glob';
import Suite from './suite';
import Server from './server';
import Browser from './browser';
import Reporter from './reporter';
import Metrics from './utils/metrics';
import * as status from './meta/status';

export default class Agent {
    constructor (entryPaths, options = {}) {
        this.options = options;
        this.suites = new Map();
        this.addSuites(entryPaths);

        this.browser = new Browser();
        this.metrics = new Metrics();
        this.reporter = new Reporter();
        this.server = new Server(options);
    }

    addSuites (entryPaths) {
        const paths = entryPaths
            .reduce((r, p) => r.concat(glob.sync(p, { nodir: true })), []);

        for (const fpath of [...new Set(paths)]) {
            const suite = new Suite(fpath, this.options.tmpdir);
            this.suites.set(suite.path, suite);
        }
    }

    async run () {
        this.server.removeAllListeners();
        this.browser.removeAllListeners();

        this.metrics.record(status.PENDING);

        process.once('SIGINT', async () => await this.stop());

        return this.server.start(this.suites);
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
