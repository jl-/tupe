import Spec from '../spec';
import EventEmitter from 'events';

export default class Runner extends EventEmitter {
    constructor (options) {
        super();
        this.options = options;

        this.spec = null;
        this.cases = [];
        this.beforeHooks = [];
        this.afterHooks = [];
        this.beforeEachHooks = [];
        this.afterEachHooks = [];

        window.onerror = err => this.uncaught(err);
        window.onunhandledrejection = e => { throw e };
    }

    addCase (title, fn) {
        this.cases.push(new Spec(title, fn, 'case'));
    }

    addBeforeHook (title, fn) {
        this.beforeHooks.push(new Spec(title, fn, 'beforeHook'));
    }

    addAfterHook (title, fn) {
        this.afterHooks.push(new Spec(title, fn, 'afterHook'));
    }

    addBeforeEachHook (title, fn) {
        this.beforeEachHooks.push(new Spec(title, fn, 'beforeEachHook'));
    }

    addAfterEachHook (title, fn) {
        this.afterEachHooks.push(new Spec(title, fn, 'afterEachHook'));
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
            this.emit('done', true);
        } catch (err) {
            this.emit('done', false);
        }
    }

    uncaught (err) {
        // this.spec.stop(err || true);
        return true;
    }
}
