"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _runner = _interopRequireDefault(require("./runner"));

var _reporter = _interopRequireDefault(require("./runner/reporter"));

var _interface = _interopRequireDefault(require("./runner/interface"));

var tupe = global.tupe = new _runner.default({
  failFast: Boolean(process.env.TUPE_FAIL_FAST)
});

var _default = (0, _interface.default)((0, _reporter.default)(tupe));

exports.default = _default;