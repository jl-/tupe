"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intercept = intercept;

function intercept(source, middleman) {
  return new Proxy(middleman, {
    get: function get(target, prop) {
      return (prop in target ? target : source)[prop];
    }
  });
}