import debug from 'debug';
import pkg from '../../package';

export default tag => debug(`${pkg.name}:${tag}`);
