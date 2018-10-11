import path from 'path';
import fs from '../utils/fs';
import hash from 'string-hash';
import * as status from '../meta/status';

export default class Suite {
    constructor (fpath, tmpdir) {
        this.status = status.INIT;

        this.htmlName = `tmp-${hash(fpath)}.html`;
        this.htmlPath = path.resolve(tmpdir, this.htmlName);
        this.path = path.relative(path.dirname(this.htmlPath), path.resolve(fpath));

        fs.outputFileSync(this.htmlPath, this.html);
    }

    get html () {
        return `
            <html>
                <body>
                    <script src="${this.path}"></script>
                </body>
            </html>
        `;
    }
}
