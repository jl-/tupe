export const command = '$0 <files...>';
export const describe = 'Run Tests';

const args = {
    files: {
        type: 'string',
        describe: 'path or glob for test files'
    }
};

const options = {
    watch: {
        default: false,
        describe: 'watch mode'
    },
    port: {
        default: 1234,
        describe: 'server port'
    },
    tmpdir: {
        default: '.tmp',
        describe: 'temporary directory'
    }
};

export function builder (yargs) {
    yargs.options(options);
    yargs.positional('files', args.files);
    return yargs;
}

export async function handler ({ files, ...options }) {
    try {
        await require('../agent').run(files, options);
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
}
