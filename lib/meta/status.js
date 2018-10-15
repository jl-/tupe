"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPassed = exports.isFailed = exports.PASSED = exports.FAILED = exports.PENDING = exports.INIT = void 0;
var INIT = 0;
exports.INIT = INIT;
var PENDING = 1;
exports.PENDING = PENDING;
var FAILED = 2;
exports.FAILED = FAILED;
var PASSED = 3;
exports.PASSED = PASSED;

var isFailed = function isFailed(status) {
  return status === FAILED;
};

exports.isFailed = isFailed;

var isPassed = function isPassed(status) {
  return status === PASSED;
};

exports.isPassed = isPassed;