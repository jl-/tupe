import path from 'path';
import { camelize } from '../utils/string';

const defaults = {
    port: 1234,
    watch: false,
    tmpdir: '.tmp',
    failFast: true,
    files: [],
    coverageDirectory: "",
    coverageReporters: []
};

export function env (name, positive) {
    process.env[name] = positive || '';
}

export function resolve (runtime) {
    const config = { ...defaults };
    try {
        const override = Object.create(null);
        const pkg = require(path.resolve('package'));

        Object.assign(override, pkg.tupe, runtime);
        for (const field of Object.keys(override)) {
            config[camelize(field)] = override[field];
        }
    } catch (e) {
        //
    }
    return config;
}
