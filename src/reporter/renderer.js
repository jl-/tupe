import string from '../utils/string';
import Base from 'power-assert-renderer-base';

export default class Renderer extends Base {
    onStart (ctx) {
        this.line = ctx.source.line;
        this.content = ctx.source.context;
        this.filepath = ctx.source.filepath;
    }

    onEnd () {
        this.write(string.bold('sebb'));
    }
}
