import now from '../utils/now';
import { uniq } from '../utils/string';
import * as status from '../meta/status';
import { mapStackTrace } from 'sourcemapped-stacktrace';

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

    get state () {
        return { ...this, fn: null };
    }

    async run (assert) {
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

        if (!err) {
            this.resolve(this.error = null);
        } else if (err.powerAssertContext) {
            this.reject(this.error = err);
        } else if (!err.stack) {
            const message = 'Failed with no falsy reason.';
            this.reject(this.error = { message, trace: '' });
        } else {
            mapStackTrace(err.stack, mapped => {
                const filter = line => !/node_modules/.test(line);
                const coerce = line => line.replace(/\(\.\.\//, '(');
                const source = mapped.filter(filter).map(coerce);
                this.reject(this.error = { ...err, trace: source.join('\n')});
            });
        }
    }
}
