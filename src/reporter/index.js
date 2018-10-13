import path from 'path';
import figures from 'figures';
import string from '../utils/string';
import logger from '../utils/logger';

export default class Reporter {
    receive (suite, spec) {
        const p = suite.srcpath.split(path.sep).join(
            string.gray(` ${figures.pointerSmall} `)
        );
        const message = [p, spec.title].join(
            string.gray(` ${figures.arrowRight} `)
        );

        logger[spec.passed ? 'success' : 'error'](message);
    }

    sumup (suites, metric) {
        console.log(suites);
        console.log(metric);
        logger.finish('bb');
    }
}
