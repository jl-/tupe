import path from 'path';
import figures from 'figures';
import string from '../utils/string';
import AssertionRenderer from 'power-assert-renderer-assertion';
import DiagramRenderer from 'power-assert-renderer-diagram';
import createErrFormatter from 'power-assert-context-formatter';
import { FileRenderer, ComparisonRenderer } from './renderers';

export const formatError = createErrFormatter({
    renderers: [
        FileRenderer,
        AssertionRenderer,
        DiagramRenderer,
        ComparisonRenderer
    ]
});

export function crumbTitle (filepath, title) {
    const prefix = filepath.split(path.sep).join(
        string.dim(` ${figures.pointerSmall} `)
    );

    return [prefix, title].join(string.dim(` ${figures.arrowRight} `));
}
