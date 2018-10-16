"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builder = builder;
exports.handler = handler;
exports.describe = exports.command = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var cfg = _interopRequireWildcard(require("../config"));

var command = '$0 [<files...>]';
exports.command = command;
var describe = 'Run Tests';
exports.describe = describe;
var args = {
  files: {
    type: 'string',
    describe: 'path or glob for test files'
  }
};
var options = {
  watch: {
    type: 'boolean',
    describe: 'watch mode'
  },
  port: {
    type: 'number',
    describe: 'server port'
  },
  tmpdir: {
    type: 'string',
    describe: 'temporary directory'
  },
  'fail-fast': {
    type: 'boolean',
    describe: 'exit on first fail'
  }
};

function builder(yargs) {
  yargs.options(options);
  yargs.positional('files', args.files);
  return yargs;
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(argv) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = cfg.resolve(argv);
            _context.prev = 1;
            cfg.env('TUPE_FAIL_FAST', config.failFast);
            _context.next = 5;
            return require('../agent').run(config);

          case 5:
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            process.exit(0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));
  return _handler.apply(this, arguments);
}