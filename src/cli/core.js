export const command = '$0 <files...>';
export const describe = 'Run Tests';

const args = {
    files: {
        type: 'string',
        describe: 'test files'
    }
};

const options = {
    watch: {
        describe: 'watch mode',
        default: false
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
        console.log(err);
        process.exit(0);
    }
}
