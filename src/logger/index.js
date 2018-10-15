import ora from 'ora';
import figures from 'figures';
import string from '../utils/string';
import sanitizeOptions from './options';

export default class Logger {
    static registry = new WeakMap();

    constructor (options = {}) {
        this.options = sanitizeOptions(options);

        this.stream = this.options.stream;
        if (this.constructor.registry.has(this.stream)) {
            return this.constructor.registry.get(this.stream);
        }

        this.powerline = ora();
        this.log = this.info = this.writeln;
        this.constructor.registry.set(this.stream, this);
    }

    write (message) {
        this.stream.write(message);
    }

    writeln (message) {
        this.write(`${message}\n`);
    }

    success (text) {
        this.writeln(`${string.green(figures.tick)}  ${text}`);
    }

    error (text) {
        this.writeln(`${string.red(figures.cross)}  ${text}`);
    }

    title (str) {
        this.writeln(string.bold(`\n\n${str}`));
    }

    console (type, ...data) {
        console[type](...data);
    }

    pending (active, action = 'stop', text) {
        if (active) {
            this.powerline.start(active);
        } else {
            this.powerline[action](text);
        }
    }
}
