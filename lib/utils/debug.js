"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _package = _interopRequireDefault(require("../../package"));

var _default = function _default(tag) {
  return (0, _debug.default)("".concat(_package.default.name, ":").concat(tag));
};

exports.default = _default;