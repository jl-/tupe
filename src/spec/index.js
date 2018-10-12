import assert from 'assert';
import now from '../utils/now';
import * as status from '../meta/status';

// var assert = require('power-assert').customize({
//     output: {
//         maxDepth: 2
//     }
// });

export default class Spec {
    constructor (title, fn) {
        this.status = status.INIT;
        this.fn = typeof fn === 'function' ? fn : title;
        this.title = typeof title === 'string' ? title : '';
        this.error = null;
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
        this.startedAt = now();
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
        this.finishedAt = now();
        this.status = err ? status.FAILED : status.PASSED;

        if (this.passed) {
            this.resolve();
        } else {
            this.message = err.message ||
                (typeof err === 'string' && err) ||
                'failed wiht no or falsy reason';
            this.reject(this.message);
        }
    }
}
