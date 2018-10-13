import puppeteer from 'puppeteer';
import EventEmitter from 'events';
import mergeOptions from './options';

export default class Browser extends EventEmitter {
    constructor (options = {}) {
        super();
        this.$remote = null;
        this.options = mergeOptions(options);
    }

    async launch (options) {
        if (!this.$remote) {
            this.options = mergeOptions(this.options, options);
            this.$remote = puppeteer.launch(this.options);
        }
        return this.$remote = await this.$remote;
    }

    async exit () {
        await this.$remote.close();
        this.$remote = null;
    }

    async newPage () {
        const $remote = await this.launch();
        const page = await $remote.newPage();
        page.on('console', msg => this.parseConsole(msg));
        return page;
    }

    async runSuite (suite) {
        const page = await this.newPage();
        page.exposeFunction('onSpecFinished', spec => {
            this.emit('specFinished', suite, spec);
        });

        page.exposeFunction('onSuiteFinished', async (specs, passed, cov) => {
            await page.close();
            this.emit('suiteFinished', suite, specs, passed, cov);
        });

        await page.goto(suite.url);
    }

    async parseConsole (msg) {
        for (const arg of msg.args()) {
            const { type, subtype } = arg._remoteObject;
            if (type === 'function' || subtype === 'regexp') {
                console[msg.type()](arg._remoteObject.description);
            } else {
                try {
                    console[msg.type()](await arg.jsonValue());
                } catch (e) {}
            }
        }
    }
}
