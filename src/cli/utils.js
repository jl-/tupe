import path from 'path';

export function env (name, positive) {
    process.env[name] = positive || '';
}

const defaultOptions = {
    port: 1234,
    watch: false,
    tmpdir: '.tmp',
    failFast: true,
    files: []
};

export function resolveOptions (source) {
    const options = { ...defaultOptions };
    try {
        const pkg = require(path.resolve('package'));
        Object.assign(options, pkg.tupe, source);
        options.failFast = options['fail-fast'] || options.failFast;
    } catch (e) {
        //
    }
    return options;
}
