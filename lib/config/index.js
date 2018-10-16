"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = env;
exports.resolve = resolve;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _path = _interopRequireDefault(require("path"));

var _string = require("../utils/string");

var defaults = {
  port: 1234,
  watch: false,
  tmpdir: '.tmp',
  failFast: true,
  files: [],
  coverage: {// dir, print, reporters|reporters, hooks, check, summarizer
    // https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-api/lib/config.js
  }
};

function env(name, positive) {
  process.env[name] = positive || '';
}

function resolve(runtime) {
  var config = (0, _objectSpread2.default)({}, defaults);

  try {
    var override = Object.create(null);

    var pkg = require(_path.default.resolve('package'));

    Object.assign(override, pkg.tupe, runtime);

    var _arr = Object.keys(override);

    for (var _i = 0; _i < _arr.length; _i++) {
      var field = _arr[_i];
      config[(0, _string.camelize)(field)] = override[field];
    }

    config.coverage = coerceCoverageConfig(config.coverage);
  } catch (e) {//
  }

  return config;
}

function coerceCoverageConfig(raw) {
  var override = (0, _objectSpread2.default)({}, defaults.coverage, raw);
  var hooks = override.hooks,
      check = override.check,
      reporting = (0, _objectWithoutProperties2.default)(override, ["hooks", "check"]);

  if (Array.isArray(reporting.reporters)) {
    reporting.reports = reporting.reporters;
    delete reporting.reporters;
  }

  return {
    hooks: hooks,
    check: check,
    reporting: reporting
  };
}