import debug from 'debug';
import pkg from '../../package';

module.exports = tag => debug(`${pkg.name}:${tag}`);
