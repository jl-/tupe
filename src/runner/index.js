import Spec from '../spec';
import EventEmitter from 'events';

export default class Runner extends EventEmitter {
    constructor (options) {
        super();
        this.options = options;

        this.spec = null;
        this.specs = new Map();

        this.cases = [];
        this.beforeHooks = [];
        this.afterHooks = [];
        this.beforeEachHooks = [];
        this.afterEachHooks = [];

        window.onerror = err => this.uncaught(err);
        window.onunhandledrejection = e => { throw e };
    }

    addSpec (cate, title, fn, type) {
        const spec = new Spec(title, fn, type);
        this.specs.set(spec.key, spec);
        cate.push(spec);
        return spec;
    }

    addCase (title, fn) {
        return this.addSpec(this.cases, title, fn, 'case');
    }

    addBeforeHook (title, fn) {
        return this.addSpec(this.beforeHooks, title, fn, 'beforeHook');
    }

    addAfterHook (title, fn) {
        return this.addSpec(this.afterHooks, title, fn, 'afterHook');
    }

    addBeforeEachHook (title, fn) {
        return this.addSpec(this.beforeEachHooks, title, fn, 'beforeEachHook');
    }

    addAfterEachHook (title, fn) {
        return this.addSpec(this.afterEachHooks, title, fn, 'afterEachHook');
    }

    async run () {
        const runSpec = async (spec) => {
            try {
                await (this.spec = spec).run();
                this.emit(`${this.spec.type}:passed`, this.spec);
            } catch (e) {
                this.emit(`${this.spec.type}:failed`, this.spec);
                if (this.options.failFast) throw e;
            }
        };

        const runHooks = async (hooks) => {
            for (const hook of hooks) {
                await runSpec(hook);
            }
        };

        try {
            await runHooks(this.beforeHooks);
            for (const spec of this.cases) {
                await runHooks(this.beforeEachHooks);
                await runSpec(spec);
                await runHooks(this.afterEachHooks);
            }
            await runHooks(this.afterHooks);
            this.emit('done', [...this.specs.values()], true);
        } catch (err) {
            this.emit('done', [...this.specs.values()], false);
        }
    }

    uncaught (err) {
        return true;
    }
}
