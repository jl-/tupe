import string from './string';
import { Signale } from 'signale';
import { intercept } from './proxy';

const config = {
    displayLabel: false
};

const logger = new Signale({ config });

export default intercept(logger, {
    log: logger._log,

    write (str, stream = process.stdout) {
        stream.write(str);
    },

    writeln (str, stream) {
        this.write(`${str}\n`, stream);
    },

    title (str) {
        this.log(string.bold(`\n\n${str}\n`));
    },

    br (char = '=', stream = process.stdout) {
        stream.write(char.repeat(stream.columns));
    }
});
