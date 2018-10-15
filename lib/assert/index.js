"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.inherit = inherit;
exports.default = void 0;

var _core = _interopRequireDefault(require("./core"));

function create(ctx) {
  var instance = _core.default.bind(null);

  instance.context = ctx || Object.create(null);
  return instance;
}

function inherit(from) {
  var ctx = from && from.context;
  return create(Object.assign(Object.create(null), ctx));
}

var _default = {
  create: create,
  inherit: inherit
};
exports.default = _default;