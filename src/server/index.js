import EventEmitter from 'events';
import Bundler from 'parcel-bundler';
import { getPortPromise } from 'portfinder';

export default class Server extends EventEmitter {
    constructor (options) {
        super();
        this.host = 'localhost';
        this.port = options.port;
        this.watch = options.watch;
        this.tmpdir = options.tmpdir;
    }

    async start (suites) {
        const suitePaths = [];
        for (const suite of suites.values()) {
            suitePaths.push(suite.path);
        }

        const port = this.port;
        this.port = await getPortPromise({ port });

        const watch = this.watch;
        this.bundler = new Bundler(suitePaths, {
            outDir: this.tmpdir, watch, hmr: watch, logLevel: 1
        });
        this.bundler.on('bundled', b => this.emit('bundled', b));

        return this.bundler.serve(this.port);
    }

    async stop () {

    }
}
