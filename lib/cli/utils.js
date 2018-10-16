"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = env;
exports.resolveOptions = resolveOptions;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _path = _interopRequireDefault(require("path"));

function env(name, positive) {
  process.env[name] = positive || '';
}

var defaultOptions = {
  port: 1234,
  watch: false,
  tmpdir: '.tmp',
  failFast: true,
  files: []
};

function resolveOptions(source) {
  var options = (0, _objectSpread2.default)({}, defaultOptions);

  try {
    var pkg = require(_path.default.resolve('package'));

    Object.assign(options, pkg.tupe, source);
    options.failFast = options['fail-fast'] || options.failFast;
  } catch (e) {//
  }

  return options;
}