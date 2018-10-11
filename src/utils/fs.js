import glob from 'glob';
import fs from 'fs-extra';
import { intercept } from './proxy';

const extensions = {
    async resolveGlob (pattern, options) {
        return new Promise((resolve, reject) => {
            glob(pattern, options, (err, paths) => {
                return err ? reject(err) : resolve(paths);
            });
        });
    }
};

export default intercept(fs, extensions);
