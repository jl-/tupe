import Spec from '../spec';
import Assert from '../assert';
import EventEmitter from 'events';

export default class Runner extends EventEmitter {
    constructor (options) {
        super();
        this.options = options;

        this.case = null;
        this.hook = null;
        this.hasFailure = false;

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
        this.hasFailure = false;
        const runHooks = async (hooks, assert) => {
            for (const hook of hooks) {
                try {
                    await (this.hook = hook).run(assert);
                } catch (e) {
                    this.hasFailure = true;
                    throw e;
                } finally {
                    const caseState = this.case && this.case.state;
                    this.emit('hook:finished', this.hook.state, caseState);
                }
            }
        };

        try {
            const rootAssert = Assert.create();
            this.emit('suite:ready', this.cases);

            // clear previous run case or hook before runing global hooks
            this.case = this.hook = null;
            await runHooks(this.beforeHooks, rootAssert);

            for (const spec of this.cases) {
                // clear previous hooks, and pre-set case so that its hooks can refer
                this.hook = null; this.case = spec;
                this.emit('case:ready', this.case.state);
                try {
                    const assert = Assert.inherit(rootAssert);
                    await runHooks(this.beforeEachHooks, assert);
                    await this.case.run(assert);
                    await runHooks(this.afterEachHooks, assert);
                } catch (e) {
                    this.hasFailure = true;
                    if (this.options.failFast) throw e;
                } finally {
                    const hookState = this.hook && this.hook.state;
                    this.emit('case:finished', this.case.state, hookState);
                }
            }

            // clear previous run case or hook before runing global hooks
            // global afterHooks share the same assert with global beforeHooks
            this.case = this.hook = null;
            await runHooks(this.afterHooks, rootAssert);
        } finally {
            this.emit('suite:finished', !this.hasFailure);
        }
    }

    uncaught (err) {
        return true;
    }
}
