"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeOptions;
exports.browserOptions = void 0;
var browserOptions = {
  timeout: 12000,
  handleSIGINT: false,
  ignoreHTTPSErrors: true,
  args: ['--disable-gpu', '--ignore-certificate-errors', '--force-device-scale-factor']
};
exports.browserOptions = browserOptions;

function mergeOptions() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}, browserOptions].concat(options));
}