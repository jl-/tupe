"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _spec = _interopRequireDefault(require("../spec"));

var _assert = _interopRequireDefault(require("../assert"));

var _events = _interopRequireDefault(require("events"));

var Runner =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2.default)(Runner, _EventEmitter);

  function Runner(options) {
    var _this;

    (0, _classCallCheck2.default)(this, Runner);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Runner).call(this));
    _this.options = options;
    _this.case = null;
    _this.hook = null;
    _this.hasFailure = false;
    _this.cases = [];
    _this.beforeHooks = [];
    _this.afterHooks = [];
    _this.beforeEachHooks = [];
    _this.afterEachHooks = [];

    window.onerror = function (err) {
      return _this.uncaught(err);
    };

    window.onunhandledrejection = function (e) {
      throw e;
    };

    return _this;
  }

  (0, _createClass2.default)(Runner, [{
    key: "addCase",
    value: function addCase(title, fn) {
      this.cases.push(new _spec.default(title, fn, 'case'));
    }
  }, {
    key: "addBeforeHook",
    value: function addBeforeHook(title, fn) {
      this.beforeHooks.push(new _spec.default(title, fn, 'beforeHook'));
    }
  }, {
    key: "addAfterHook",
    value: function addAfterHook(title, fn) {
      this.afterHooks.push(new _spec.default(title, fn, 'afterHook'));
    }
  }, {
    key: "addBeforeEachHook",
    value: function addBeforeEachHook(title, fn) {
      this.beforeEachHooks.push(new _spec.default(title, fn, 'beforeEachHook'));
    }
  }, {
    key: "addAfterEachHook",
    value: function addAfterEachHook(title, fn) {
      this.afterEachHooks.push(new _spec.default(title, fn, 'afterEachHook'));
    }
  }, {
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var _this2 = this;

        var runHooks, rootAssert, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, spec, assert, hookState;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.hasFailure = false;

                runHooks =
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee(hooks, assert) {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, hook, caseState;

                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = hooks[Symbol.iterator]();

                          case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 23;
                              break;
                            }

                            hook = _step.value;
                            _context.prev = 7;
                            _context.next = 10;
                            return (_this2.hook = hook).run(assert);

                          case 10:
                            _context.next = 16;
                            break;

                          case 12:
                            _context.prev = 12;
                            _context.t0 = _context["catch"](7);
                            _this2.hasFailure = true;
                            throw _context.t0;

                          case 16:
                            _context.prev = 16;
                            caseState = _this2.case && _this2.case.state;

                            _this2.emit('hook:finished', _this2.hook.state, caseState);

                            return _context.finish(16);

                          case 20:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;

                          case 23:
                            _context.next = 29;
                            break;

                          case 25:
                            _context.prev = 25;
                            _context.t1 = _context["catch"](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t1;

                          case 29:
                            _context.prev = 29;
                            _context.prev = 30;

                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                              _iterator.return();
                            }

                          case 32:
                            _context.prev = 32;

                            if (!_didIteratorError) {
                              _context.next = 35;
                              break;
                            }

                            throw _iteratorError;

                          case 35:
                            return _context.finish(32);

                          case 36:
                            return _context.finish(29);

                          case 37:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this, [[3, 25, 29, 37], [7, 12, 16, 20], [30,, 32, 36]]);
                  }));

                  return function runHooks(_x, _x2) {
                    return _ref.apply(this, arguments);
                  };
                }();

                _context2.prev = 2;
                rootAssert = _assert.default.create();
                this.emit('suite:ready', this.cases); // clear previous run case or hook before runing global hooks

                this.case = this.hook = null;
                _context2.next = 8;
                return runHooks(this.beforeHooks, rootAssert);

              case 8:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 11;
                _iterator2 = this.cases[Symbol.iterator]();

              case 13:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 40;
                  break;
                }

                spec = _step2.value;
                // clear previous hooks, and pre-set case so that its hooks can refer
                this.hook = null;
                this.case = spec;
                this.emit('case:ready', this.case.state);
                _context2.prev = 18;
                assert = _assert.default.inherit(rootAssert);
                _context2.next = 22;
                return runHooks(this.beforeEachHooks, assert);

              case 22:
                _context2.next = 24;
                return this.case.run(assert);

              case 24:
                _context2.next = 26;
                return runHooks(this.afterEachHooks, assert);

              case 26:
                _context2.next = 33;
                break;

              case 28:
                _context2.prev = 28;
                _context2.t0 = _context2["catch"](18);
                this.hasFailure = true;

                if (!this.options.failFast) {
                  _context2.next = 33;
                  break;
                }

                throw _context2.t0;

              case 33:
                _context2.prev = 33;
                hookState = this.hook && this.hook.state;
                this.emit('case:finished', this.case.state, hookState);
                return _context2.finish(33);

              case 37:
                _iteratorNormalCompletion2 = true;
                _context2.next = 13;
                break;

              case 40:
                _context2.next = 46;
                break;

              case 42:
                _context2.prev = 42;
                _context2.t1 = _context2["catch"](11);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t1;

              case 46:
                _context2.prev = 46;
                _context2.prev = 47;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 49:
                _context2.prev = 49;

                if (!_didIteratorError2) {
                  _context2.next = 52;
                  break;
                }

                throw _iteratorError2;

              case 52:
                return _context2.finish(49);

              case 53:
                return _context2.finish(46);

              case 54:
                // clear previous run case or hook before runing global hooks
                // global afterHooks share the same assert with global beforeHooks
                this.case = this.hook = null;
                _context2.next = 57;
                return runHooks(this.afterHooks, rootAssert);

              case 57:
                _context2.prev = 57;
                this.emit('suite:finished', !this.hasFailure);
                return _context2.finish(57);

              case 60:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2,, 57, 60], [11, 42, 46, 54], [18, 28, 33, 37], [47,, 49, 53]]);
      }));

      return function run() {
        return _run.apply(this, arguments);
      };
    }()
  }, {
    key: "uncaught",
    value: function uncaught(err) {
      return true;
    }
  }]);
  return Runner;
}(_events.default);

exports.default = Runner;