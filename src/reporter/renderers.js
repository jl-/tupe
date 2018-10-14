import typeName from 'type-name';
import string from '../utils/string';
import DiffMatchPatch from 'diff-match-patch';
import BaseRenderer from 'power-assert-renderer-base';
import BaseComparisionRenderer from 'power-assert-renderer-comparison';

const dmp = new DiffMatchPatch();

export class FileRenderer extends BaseRenderer {
    onStart (ctx) {
        this.line = ctx.source.line;
        this.filepath = ctx.source.filepath;
    }

    onEnd () {
        if (!this.filepath) {
            this.write(string.dim(`# at line: ${this.line}`));
        } else {
            this.write(string.dim(`# ${this.filepath}:${this.line}`));
        }
    }
}

export class ComparisonRenderer extends BaseComparisionRenderer {
    showExpectedAndActual (pair) {
        this.write('');
        this.write('[' + typeName(pair.right.value) + '] ' + pair.right.code);
        this.write(string.dim('=> ') + this.stringify(pair.right.value));
        this.write('[' + typeName(pair.left.value)  + '] ' + pair.left.code);
        this.write(string.dim('=> ') + this.stringify(pair.left.value));
    }

    showStringDiff ({ left, right }) {
        this.write('');
        this.write(string.error('--- [string] ') + right.code);
        this.write(string.green('+++ [string] ') + left.code);

        const diffs = dmp.diff_main(right.value, left.value);
        dmp.diff_cleanupSemantic(diffs);
        const patches = dmp.patch_make(right.value, diffs);
        for (const patch of patches) {
            this.write(decorateDiffPatch(patch));
        }
    }
}

function decorateDiffPatch (patch) {
    const EQUAL  = ' ';
    const DELETE = string.error('-');
    const INSERT = string.green('+');

    const coordsOf = (start, length) => {
        if (length === 0) return `${start},0`;
        if (length === 1) return start + 1;
        return `${start + 1},${length}`;
    };

    const header = `@@ ${DELETE}` + coordsOf(patch.start1, patch.length1) +
        ` ${INSERT}` + coordsOf(patch.start2, patch.length2) + ' @@';

    const lines = patch.diffs.map(([op, text]) => {
        if (op === 0) return EQUAL + ' ' + text;
        if (op === 1) return INSERT + ' ' + string.bgGreen(text);
        return DELETE + ' ' + string.bgRed(text);
    });

    return [header].concat(lines).join('\n').replace(/%20/g, ' ');
}
