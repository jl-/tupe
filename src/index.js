import Tupe from './runner';
import bindReporter from './runner/reporter';
import exposeInterface from './runner/interface';

const tupe = global.tupe = new Tupe({
    failFast: Boolean(process.env.TUPE_FAIL_FAST)
});

export default exposeInterface(bindReporter(tupe));
