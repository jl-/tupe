import * as cfg from '../config';

export const command = '$0 [<files...>]';
export const describe = 'Run Tests';

const args = {
    files: {
        type: 'string',
        describe: 'path or glob for test files'
    }
};

const options = {
    watch: {
        type: 'boolean',
        describe: 'watch mode'
    },
    port: {
        type: 'number',
        describe: 'server port'
    },
    tmpdir: {
        type: 'string',
        describe: 'temporary directory'
    },
    'fail-fast': {
        type: 'boolean',
        describe: 'exit on first fail'
    }
};

export function builder (yargs) {
    yargs.options(options);
    yargs.positional('files', args.files);
    return yargs;
}

export async function handler (argv) {
    const config = cfg.resolve(argv);
    try {
        cfg.env('TUPE_FAIL_FAST', config.failFast);
        await require('../agent').run(config);
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
}
