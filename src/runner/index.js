import Spec from '../spec';
import EventEmitter from 'events';

export default class Runner extends EventEmitter {
    constructor () {
        super();

        this.cases = [];
        this.beforeHooks = [];
        this.afterHooks = [];
        this.beforeEachHooks = [];
        this.afterEachHooks = [];
        this.pendingSpec = null;

        window.onerror = err => this.uncaught(err);
        window.onunhandledrejection = e => { throw e };
    }

    addCase (title, fn) {
        this.cases.push(new Spec(title, fn));
    }

    addBeforeHook (title, fn) {
        this.beforeHooks.push(new Spec(title, fn));
    }

    addAfterHook (title, fn) {
        this.afterHooks.push(new Spec(title, fn));
    }

    addBeforeEachHook (title, fn) {
        this.beforeEachHooks.push(new Spec(title, fn));
    }

    addAfterEachHook (title, fn) {
        this.afterEachHooks.push(new Spec(title, fn));
    }

    async run () {
        const runHooks = async (hooks) => {
            for (const hook of hooks) {
                this.pendingSpec = hook;
                await hook.run();
            }
        }
        try {
            await runHooks(this.beforeHooks);
            for (const spec of this.cases) {
                await runHooks(this.beforeEachHooks);
                this.pendingSpec = spec;
                await spec.run();
                await runHooks(this.afterEachHooks);
            }
            await runHooks(this.afterHooks);
        } catch (err) {
            // console.log(err);
        } finally {
            this.emit('done');
        }
    }

    uncaught (err) {
        this.pendingSpec.stop(err || true);
        return true;
    }
}
