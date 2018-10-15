"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _yargs = _interopRequireDefault(require("yargs"));

var core = _interopRequireWildcard(require("./core"));

var _package = _interopRequireDefault(require("../../package"));

var _string = _interopRequireDefault(require("../utils/string"));

_yargs.default.usage('Tupe\nUsage: $0 [command] [options]').command(core).example('$0 test.js').example('$0 test-*.js --watch').example('$0 test.js test-*.js --watch').option('h', {
  alias: 'help'
}).option('v', {
  alias: 'verbose',
  default: false
}).version(false).epilog(_string.default.hint("version: ".concat(_package.default.version))).strict();

_yargs.default.parse(process.argv.slice(2));