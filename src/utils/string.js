import chalk from 'chalk';
import { intercept } from './proxy';

export default intercept(chalk, {
    log: chalk.gray,
    info: chalk.gray,
    desc: chalk.gray,
    hint: chalk.dim,
    warn: chalk.red,
    error: chalk.red,
    ok: chalk.green,
    pass: chalk.green,
});

export const uid = (i => p => `${p || ''}${i++}`)(0);
