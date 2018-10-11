export const command = '$0 <files...>';
export const describe = 'Run Tests';

const options = {
    watch: {
        describe: 'watch mode',
        default: false
    }
};

const args = {
    files: {
        type: 'string',
        describe: 'spec files'
    }
};

export function builder (yargs) {
    yargs.options(options);
    yargs.positional('files', args.files);
    return yargs;
}

export async function handler (options) {
    try {
        await require('../agent').run(options);
    } catch (err) {
        process.exit(0);
    }
}
