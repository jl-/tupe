"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _proxy = require("./proxy");

var extensions = {};

var _default = (0, _proxy.intercept)(_fsExtra.default, extensions);

exports.default = _default;