import yargs from 'yargs';
import * as core from './core';
import pkg from '../../package';
import string from '../utils/string';

yargs
    .usage('Tupe\nUsage: $0 [command] [options]')

    .command(core)
    .example('$0 test.js')
    .example('$0 test-*.js --watch')
    .example('$0 test.js test-*.js --watch')

    .option('h', { alias: 'help' })
    .option('v', { alias: 'verbose', default: false })

    .version(false)
    .epilog(string.hint(`version: ${pkg.version}`))
    .strict();

yargs.parse(process.argv.slice(2));
