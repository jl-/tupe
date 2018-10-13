import now from '../utils/now';
import assert from '../assert';
import { uniq } from '../utils/string';
import * as status from '../meta/status';

export default class Spec {
    constructor (title, fn, type) {
        this.key = uniq();
        this.type = type;
        this.error = null;
        this.runtime = 0;
        this.status = status.INIT;
        this.fn = typeof fn === 'function' ? fn : title;
        this.title = typeof title === 'string' ? title : '';
    }

    static derive (spec) {
        return Object.setPrototypeOf(spec, this.prototype);
    }

    get failed () {
        return this.status === status.FAILED;
    }

    get passed () {
        return this.status === status.PASSED;
    }

    get pending () {
        return this.status === status.PENDING;
    }

    async run () {
        this.runtime = now();
        this.status = status.PENDING;

        const stop = err => this.stop(err);
        const promise = new Promise((resolve, reject) => {
            this.resolve = resolve; this.reject = reject;
        });

        try {
            const cbAsync = this.fn.length >= 2;
            const result = this.fn(assert, cbAsync ? stop : null);
            if (result && typeof result.then === 'function') {
                result.then(() => stop(), err => stop(err || true));
            } else if (!cbAsync) {
                stop();
            }
        } catch (err) {
            stop(err || true);
        }

        return promise;
    }

    stop (err) {
        this.runtime = now() - this.runtime;
        this.status = err ? status.FAILED : status.PASSED;
        return this.passed ? this.resolve() : this.reject(
            this.error = err !== true ? err : 'Failed with no falsy reason.'
        );
    }
}
