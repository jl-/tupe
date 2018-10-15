"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sanitize;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var defaults = {
  stream: process.stdout
};

function sanitize() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _objectSpread2.default)({}, defaults, options);
}