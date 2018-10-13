import path from 'path';
import figures from 'figures';
import string from '../utils/string';
import ErrRenderer from './renderer';
import createErrFormatter from 'power-assert-context-formatter';

export const formatError = createErrFormatter({
    renderers: [ErrRenderer]
});

export function crumbTitle (filepath, title) {
    const prefix = filepath.split(path.sep).join(
        string.dim(` ${figures.pointerSmall} `)
    );

    return [prefix, title].join(string.dim(` ${figures.arrowRight} `));
}
