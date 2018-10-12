import path from 'path';
import fs from '../utils/fs';
import hash from 'string-hash';
import * as status from '../meta/status';

export default class Suite {
    constructor (fpath, tmpdir) {
        this.fpath = fpath;
        this.status = status.INIT;

        tmpdir = path.join(tmpdir, path.basename(tmpdir));
        this.name = `tmp-${hash(fpath)}.html`;
        this.path = path.resolve(tmpdir, this.name);

        fs.outputFileSync(this.path, genHtml(this.path, fpath));
    }

    forServer (port, host = 'localhost') {
        this.url = `http://${host}:${port}/${this.name}`;
    }
}

function genHtml (destPath, entryPath) {
    const dir = path.dirname(destPath);
    const relpath = path.relative(dir, entryPath);

    return `
        <html>
            <body>
                <script src="${relpath}"></script>
                <script>tupe.run();</script>
            </body>
        </html>
    `;
}
