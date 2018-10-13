import string from './string';
import figures from 'figures';
import { Signale } from 'signale';
import { intercept } from './proxy';

const config = {
    displayLabel: false
};

const logger = new Signale({ config });

export default intercept(logger, {
    log: logger._log,

    finish (message) {
        this.log(string.ok(figures.checkboxOn + ' bb'));
    }
});
