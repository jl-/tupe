import chalk from 'chalk';

const string = {
    log: chalk.gray,
    info: chalk.gray,
    desc: chalk.gray,
    hint: chalk.dim,
    warn: chalk.red,
    error: chalk.red,
    stack: chalk.red,
    ok: chalk.green,
    pass: chalk.green,
    skip: chalk.yellow,
    todo: chalk.blue,
    title: chalk.bold.white,
    duration: chalk.gray.dim,
};

export default new Proxy(string, {
    get (target, prop) {
        return prop in target ? target[prop] : chalk[prop];
    }
});
