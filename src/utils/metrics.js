import now from './now';

export default class Metrics {
    constructor (phase) {
        this.phase = phase;
        this.metrics = new Map();
    }

    get phase () {
        const length = this.phases && this.phases.length || 0;
        return length > 0 ? this.phases[length - 1] : void 0;
    }

    set phase (value) {
        if (value !== this.phase) {
            this.phases = (this.phases || []).concat(value);
        }
    }

    get (phase) {
        return this.metrics.get(phase);
    }

    set (phase, metric) {
        return this.metrics.set(phase, metric), metric;
    }

    record (phase) {
        this.phase = phase;
        return this.set(this.phase, { start: now() });
    }

    end (phase) {
        const metric = this.get(phase);
        const index = this.phases.indexOf(phase);
        if (metric && index >= 0) {
            metric.end = now();
            metric.duration = (metric.end - metric.start) / 1000;
            this.phases.splice(index, 1);
        }
        return metric;
    }
}
