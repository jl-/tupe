"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _debug = _interopRequireDefault(require("debug"));

var _package = _interopRequireDefault(require("../../package"));

module.exports = function (tag) {
  return (0, _debug.default)("".concat(_package.default.name, ":").concat(tag));
};