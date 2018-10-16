import path from 'path';
import { camelize } from '../utils/string';

const defaults = {
    port: 1234,
    watch: false,
    tmpdir: '.tmp',
    failFast: true,
    files: [],
    coverage: {
        // dir, print, reporters|reporters, hooks, check, summarizer
        // https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-api/lib/config.js
    }
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
        config.coverage = coerceCoverageConfig(config.coverage);
    } catch (e) {
        //
    }
    return config;
}

function coerceCoverageConfig (raw) {
    const override = { ...defaults.coverage, ...raw };
    const { hooks, check, ...reporting } = override;

    if (Array.isArray(reporting.reporters)) {
        reporting.reports = reporting.reporters;
        delete reporting.reporters;
    }

    return { hooks, check, reporting };
}
