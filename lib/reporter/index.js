"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _figures = _interopRequireDefault(require("figures"));

var _string = _interopRequireDefault(require("../utils/string"));

var _status = require("../meta/status");

var _formatter = require("./formatter");

var Reporter =
/*#__PURE__*/
function () {
  function Reporter(logger) {
    (0, _classCallCheck2.default)(this, Reporter);
    this.logger = logger;
    this.states = new Map();
    this.pendings = new Map();
    this.failures = new Map();
  }

  (0, _createClass2.default)(Reporter, [{
    key: "prepare",
    value: function prepare() {
      this.states.clear();
      this.pendings.clear();
      this.failures.clear();
      this.totalCaseCount = 0;
      this.passedCaseCount = 0;
    }
  }, {
    key: "onSuiteReady",
    value: function onSuiteReady(suite, cases) {
      this.totalCaseCount += cases.length;
    }
  }, {
    key: "onHookFinished",
    value: function onHookFinished(suite, hookState, caseState) {
      if (!caseState && (0, _status.isFailed)(hookState.status)) {
        this.failures.set(hookState.key, {
          hookState: hookState
        });
      }
    }
  }, {
    key: "onCaseReady",
    value: function onCaseReady(suite, caseState) {
      var text = (0, _formatter.crumbTitle)(suite.srcpath, caseState.title);
      this.pendings.set(caseState.key, text);
      this.showPendingText(this.lastPending);
    }
  }, {
    key: "onCaseFinished",
    value: function onCaseFinished(suite, caseState, hookState) {
      this.logger.pending(false);
      var text = this.pendings.get(caseState.key);

      if ((0, _status.isFailed)(caseState.status)) {
        this.logger.error(text);
        this.failures.set(caseState.key, {
          caseState: caseState,
          hookState: hookState
        });
      } else if (hookState && (0, _status.isFailed)(hookState.status)) {
        var title = hookState.type + hookState.title + ' Failed For';
        this.logger.error(title + text);
        this.failures.set(caseState.key, {
          caseState: caseState,
          hookState: hookState
        });
      } else {
        this.passedCaseCount += 1;
        this.logger.success(text);
      }

      this.pendings.delete(caseState.key);
      this.showPendingText(this.lastPending);
    }
  }, {
    key: "onSuiteFinished",
    value: function onSuiteFinished(suite) {}
  }, {
    key: "showPendingText",
    value: function showPendingText() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lastPending;
      if (!text) return;

      var indicator = _string.default.dim(_figures.default.pointerSmall.repeat(3));

      this.logger.pending(" ".concat(text) + "\n\n".concat(indicator, " ") + this.statusText);
    }
  }, {
    key: "sumup",
    value: function sumup(suites, metric) {
      if (this.failures.size === 0) {
        this.logger.success(this.statusText);
      } else {
        var failures = (0, _toConsumableArray2.default)(this.failures.values());

        var isHook = function isHook(f) {
          return f.hookState && (0, _status.isFailed)(f.hookState.status);
        };

        var failedHookCount = failures.filter(isHook).length;
        var failedCaseCount = failures.length - failedHookCount;
        var title = [failedHookCount > 0 ? "".concat(failedHookCount, " hooks") : '', failedCaseCount > 0 ? "".concat(failedCaseCount, " cases") : ''].filter(Boolean).join(_string.default.dim(',  '));
        this.logger.title(_string.default.white.bgRed(" Failures ") + "  ".concat(_string.default.red(title)));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = failures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value,
                caseState = _step$value.caseState,
                hookState = _step$value.hookState;
            this.logger.error(_string.default.bold(caseState.title));

            if (caseState && (0, _status.isFailed)(caseState.status)) {
              (0, _formatter.explainError)(this.logger, caseState.error);
            } else {
              (0, _formatter.explainError)(this.logger, hookState.error);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.logger.error(this.statusText);
      }
    }
  }, {
    key: "lastPending",
    get: function get() {
      return this.pendings.size === 0 ? '' : (0, _toConsumableArray2.default)(this.pendings.values()).pop();
    }
  }, {
    key: "statusText",
    get: function get() {
      return [_string.default.cyan("Total: ".concat(this.totalCaseCount)), _string.default.green("Passed: ".concat(this.passedCaseCount)), _string.default.error("Failed: ".concat(this.failures.size))].join(_string.default.dim(',  '));
    }
  }]);
  return Reporter;
}();

exports.default = Reporter;