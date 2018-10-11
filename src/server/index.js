import EventEmitter from 'events';
import Bundler from 'parcel-bundler';

export default class Server extends EventEmitter {
    constructor (options = {}) {
        super();
        this.server = null;
        this.tmpdir = options.tmpdir;
    }

    async start (suites) {
        const entryPaths = [];
        for (const suite of suites.values()) {
            entryPaths.push(suite.htmlPath);
        }

        this.bundler = new Bundler(entryPaths, {
            outDir: this.tmpdir, hmr: true
        });

        return this.bundler.serve(1235);
    }

    async stop () {

    }
}
