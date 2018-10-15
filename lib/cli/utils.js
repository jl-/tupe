"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = env;

function env(name, positive) {
  process.env[name] = positive || '';
}