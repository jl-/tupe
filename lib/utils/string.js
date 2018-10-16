"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelize = camelize;
exports.uniq = exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _proxy = require("./proxy");

var _default = (0, _proxy.intercept)(_chalk.default, {
  log: _chalk.default.gray,
  info: _chalk.default.gray,
  desc: _chalk.default.gray,
  hint: _chalk.default.dim,
  warn: _chalk.default.red,
  error: _chalk.default.red,
  ok: _chalk.default.green,
  pass: _chalk.default.green
});

exports.default = _default;

function camelize(string) {
  var corece = function corece(_, x) {
    return x.toUpperCase();
  };

  return string.replace(/[_-](\w)/g, corece);
}

var uniq = function () {
  var seed = Math.pow(2, 24);
  var history = Object.create(null);

  var memorize = function memorize(key) {
    return history[key] = true, key;
  };

  function generate(k) {
    var key = typeof k === 'string' ? k : '';

    while (!key || !isNaN(+key) || history[key]) {
      key = Math.floor(Math.random() * seed).toString(32);
    }

    return memorize(key);
  }

  generate.omit = function () {
    for (var _len = arguments.length, list = new Array(_len), _key = 0; _key < _len; _key++) {
      list[_key] = arguments[_key];
    }

    return list.map(memorize);
  };

  return generate;
}();

exports.uniq = uniq;