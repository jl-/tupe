"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _istanbulApi = _interopRequireDefault(require("istanbul-api"));

var _istanbulLibCoverage = require("istanbul-lib-coverage");

var Coverage =
/*#__PURE__*/
function () {
  function Coverage(config) {
    (0, _classCallCheck2.default)(this, Coverage);
    this.map = (0, _istanbulLibCoverage.createCoverageMap)();
    this.config = _istanbulApi.default.config.loadObject(config);
    this.reporter = _istanbulApi.default.createReporter(this.config);
    this.reporter.addAll(this.config.reporting.reports());
  }

  (0, _createClass2.default)(Coverage, [{
    key: "merge",
    value: function merge(result) {
      this.map.merge(result);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.map = (0, _istanbulLibCoverage.createCoverageMap)();
    }
  }, {
    key: "report",
    value: function report() {
      this.reporter.write(this.map);
    }
  }]);
  return Coverage;
}();

exports.default = Coverage;