import ora from 'ora';
import logger from '../utils/logger';
import { formatError, crumbTitle } from './formatter';

export default class Reporter {
    spinner = ora();
    pendings = new Map();

    onSpecReady (suite, spec) {
        const pending = { suite, spec };
        this.pendings.set(spec.key, pending);
        this.showPendingInfo(pending);
    }

    showPendingInfo ({ suite, spec }) {
        this.spinner.start(' ' + crumbTitle(suite.srcpath, spec.title));
    }

    onSpecFinished (suite, spec) {
        this.spinner.stop();
        this.pendings.delete(spec.key);
        const message = crumbTitle(suite.srcpath, spec.title);
        logger[spec.passed ? 'success' : 'error'](message);
        if (this.pendings.size > 0) {
            this.showPendingInfo(this.pendings.values().next().value);
        }
    }

    onSuiteFinished (suite) {
        //
    }

    sumup (suites, metric) {
        this.spinner.start().succeed('finished.');
        const isFailed = v => v.failed;
        for (const suite of suites.filter(isFailed)) {
            const specs = [...suite.specs.values()];
            for (const spec of specs.filter(isFailed)) {
                console.log(formatError(spec.error.powerAssertContext));
            }
        }
    }
}
