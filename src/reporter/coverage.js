import istanbul from 'istanbul-api';
import { createCoverageMap } from 'istanbul-lib-coverage';

export default class Coverage {
    constructor (config) {
        this.map = createCoverageMap();
        this.config = istanbul.config.loadObject(config);
        this.reporter = istanbul.createReporter(this.config);
        this.reporter.addAll(this.config.reporting.reports());
    }

    merge (result) {
        this.map.merge(result);
    }

    clear () {
        this.map = createCoverageMap();
    }

    report () {
        this.reporter.write(this.map);
    }
}
