import puppeteer from 'puppeteer';
import EventEmitter from 'events';
import mergeOptions from './options';

export default class Browser extends EventEmitter {
    constructor (logger, options = {}) {
        super();
        this.$remote = null;
        this.logger = logger;
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
        page.on('console', data => this.pipeLog(data));
        return page;
    }

    async runSuite (suite) {
        const page = await this.newPage();

        page.exposeFunction('onSuiteReady', cases => {
            this.emit('suiteReady', suite, cases);
        });

        page.exposeFunction('onHookFinished', (hookState, caseState) => {
            this.emit('hookFinished', suite, hookState, caseState);
        });

        page.exposeFunction('onCaseReady', caseState => {
            this.emit('caseReady', suite, caseState);
        });

        page.exposeFunction('onCaseFinished', (caseState, hookState) => {
            this.emit('caseFinished', suite, caseState, hookState);
        });

        page.exposeFunction('onSuiteFinished', async (passed, cov) => {
            await page.close();
            this.emit('suiteFinished', suite, passed, cov);
        });

        await page.goto(suite.url);
    }

    async pipeLog (data) {
        for (const arg of data.args()) {
            const { type, subtype } = arg._remoteObject;
            if (type === 'function' || subtype === 'regexp') {
                this.logger.console(data.type(), arg._remoteObject.description);
            } else {
                try {
                    this.logger.console(data.type(), await arg.jsonValue());
                } catch (e) {}
            }
        }
    }
}
