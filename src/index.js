import Tupe from './runner';
import bindReporter from './runner/reporter';
import exposeInterface from './runner/interface';

const tupe = global.tupe = new Tupe();

export default exposeInterface(bindReporter(tupe));
