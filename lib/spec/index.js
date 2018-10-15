"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _now = _interopRequireDefault(require("../utils/now"));

var _string = require("../utils/string");

var status = _interopRequireWildcard(require("../meta/status"));

var Spec =
/*#__PURE__*/
function () {
  function Spec(title, fn, type) {
    (0, _classCallCheck2.default)(this, Spec);
    this.key = (0, _string.uniq)();
    this.type = type;
    this.error = null;
    this.runtime = 0;
    this.status = status.INIT;
    this.fn = typeof fn === 'function' ? fn : title;
    this.title = typeof title === 'string' ? title : '';
  }

  (0, _createClass2.default)(Spec, [{
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(assert) {
        var _this = this;

        var stop, promise, cbAsync, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.runtime = (0, _now.default)();
                this.status = status.PENDING;

                stop = function stop(err) {
                  return _this.stop(err);
                };

                promise = new Promise(function (resolve, reject) {
                  _this.resolve = resolve;
                  _this.reject = reject;
                });

                try {
                  cbAsync = this.fn.length >= 2;
                  result = this.fn(assert, cbAsync ? stop : null);

                  if (result && typeof result.then === 'function') {
                    result.then(function () {
                      return stop();
                    }, function (err) {
                      return stop(err || true);
                    });
                  } else if (!cbAsync) {
                    stop();
                  }
                } catch (err) {
                  stop(err || true);
                }

                return _context.abrupt("return", promise);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function run(_x) {
        return _run.apply(this, arguments);
      };
    }()
  }, {
    key: "stop",
    value: function stop(err) {
      this.runtime = (0, _now.default)() - this.runtime;
      this.status = err ? status.FAILED : status.PASSED;
      return !err ? this.resolve() : this.reject(this.error = err !== true ? err : 'Failed with no falsy reason.');
    }
  }, {
    key: "state",
    get: function get() {
      return (0, _objectSpread2.default)({}, this, {
        fn: null
      });
    }
  }]);
  return Spec;
}();

exports.default = Spec;