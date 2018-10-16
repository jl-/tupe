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

export function explainError (logger, error) {
    if (error.powerAssertContext) {
        logger.writeln(formatError(error.powerAssertContext));
    } else {
        logger.writeln(string.dim(error.trace));
        logger.writeln(`\n ${string.dim(error.name + ':')}   ${error.message}\n`);
        logger.writeln(string.red('expected: ') + JSON.stringify(error.expected));
        logger.writeln(string.green('actual:   ') + JSON.stringify(error.actual));
        logger.writeln('');
    }
}
