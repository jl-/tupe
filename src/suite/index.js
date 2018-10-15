import path from 'path';
import fs from '../utils/fs';
import hash from 'string-hash';
import Metrics from '../utils/metrics';
import * as status from '../meta/status';

export default class Suite {
    constructor (srcpath, tmpdir) {
        this.status = status.INIT;
        this.metrics = new Metrics();

        this.srcpath = srcpath;
        this.name = `tmp-${hash(srcpath)}.html`;
        this.path = path.resolve(tmpdir, path.basename(tmpdir), this.name);
        fs.outputFileSync(this.path, genHtml(this.path, this.srcpath));
    }

    get passed () {
        return this.status === status.PASSED;
    }

    get failed () {
        return this.status === status.FAILED;
    }

    prepare (port, host = 'localhost') {
        this.url = `http://${host}:${port}/${this.name}`;
        this.metrics.record(this.status = status.PENDING);
    }

    onReady () {

    }

    onHookFinished () {

    }

    onCaseReady () {

    }

    onCaseFinished () {

    }

    onFinished (passed) {
        this.metrics.end(this.status);
        this.status = passed ? status.PASSED : status.FAILED;
    }
}

function genHtml (fpath, srcpath) {
    const dir = path.dirname(fpath);
    const relpath = path.relative(dir, srcpath);

    return `
        <html>
            <body>
                <script src="${relpath}"></script>
                <script>tupe.run();</script>
            </body>
        </html>
    `;
}
