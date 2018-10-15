"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _now = _interopRequireDefault(require("./now"));

var Metrics =
/*#__PURE__*/
function () {
  function Metrics(phase) {
    (0, _classCallCheck2.default)(this, Metrics);
    this.phase = phase;
    this.metrics = new Map();
  }

  (0, _createClass2.default)(Metrics, [{
    key: "get",
    value: function get(phase) {
      return this.metrics.get(phase);
    }
  }, {
    key: "set",
    value: function set(phase, metric) {
      return this.metrics.set(phase, metric), metric;
    }
  }, {
    key: "record",
    value: function record(phase) {
      this.phase = phase;
      return this.set(this.phase, {
        start: (0, _now.default)()
      });
    }
  }, {
    key: "end",
    value: function end(phase) {
      var metric = this.get(phase);
      var index = this.phases.indexOf(phase);

      if (metric && index >= 0) {
        metric.end = (0, _now.default)();
        metric.duration = (metric.end - metric.start) / 1000;
        this.phases.splice(index, 1);
      }

      return metric;
    }
  }, {
    key: "phase",
    get: function get() {
      var length = this.phases && this.phases.length || 0;
      return length > 0 ? this.phases[length - 1] : void 0;
    },
    set: function set(value) {
      if (value !== this.phase) {
        this.phases = (this.phases || []).concat(value);
      }
    }
  }]);
  return Metrics;
}();

exports.default = Metrics;