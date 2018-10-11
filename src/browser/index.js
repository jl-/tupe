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

    }

    async newPage (data) {
        const $remote = await this.launch();
        const page = await $remote.newPage();

        return page;
    }
}
