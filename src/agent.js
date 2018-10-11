import Server from './server';
import Browser from './browser';
import Reporter from './reporter';
import Metrics from './utils/metrics';
import * as status from './meta/status';

export default class Agent {
    constructor ({ watch, files }) {
        this.watch = watch;
        this.entries = files;

        this.browser = new Browser();
        this.server = new Server({ watch });
        this.metrics = new Metrics(status.INIT);
        this.reporter = new Reporter();
    }

    async run () {
        this.server.removeAllListeners();
        this.browser.removeAllListeners();

        this.metrics.record(status.PENDING);

        process.once('SIGINT', async () => await this.stop());

        return this.server.start();
    }

    async stop () {
        await this.server.stop();
        await this.browser.exit();
        process.exit(this.isFailed ? 1 : 0);
    }
}

export function run (params) {
    return (new Agent(params)).run();
}
