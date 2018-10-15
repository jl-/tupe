"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exposeInterface;

function exposeInterface(runner) {
  var api = runner.addCase.bind(runner);
  api.before = runner.addBeforeHook.bind(runner);
  api.after = runner.addAfterHook.bind(runner);
  api.beforeEach = runner.addBeforeEachHook.bind(runner);
  api.afterEach = runner.addAfterEachHook.bind(runner);
  return api;
}