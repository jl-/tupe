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

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _events = _interopRequireDefault(require("events"));

var _options = _interopRequireDefault(require("./options"));

var Browser =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2.default)(Browser, _EventEmitter);

  function Browser(logger) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Browser);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Browser).call(this));
    _this.$remote = null;
    _this.logger = logger;
    _this.options = (0, _options.default)(options);
    return _this;
  }

  (0, _createClass2.default)(Browser, [{
    key: "launch",
    value: function () {
      var _launch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(options) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.$remote) {
                  this.options = (0, _options.default)(this.options, options);
                  this.$remote = _puppeteer.default.launch(this.options);
                }

                _context.next = 3;
                return this.$remote;

              case 3:
                return _context.abrupt("return", this.$remote = _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function launch(_x) {
        return _launch.apply(this, arguments);
      };
    }()
  }, {
    key: "exit",
    value: function () {
      var _exit = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$remote.close();

              case 2:
                this.$remote = null;

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function exit() {
        return _exit.apply(this, arguments);
      };
    }()
  }, {
    key: "newPage",
    value: function () {
      var _newPage = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var _this2 = this;

        var $remote, page;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.launch();

              case 2:
                $remote = _context3.sent;
                _context3.next = 5;
                return $remote.newPage();

              case 5:
                page = _context3.sent;
                page.on('console', function (data) {
                  return _this2.pipeLog(data);
                });
                return _context3.abrupt("return", page);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function newPage() {
        return _newPage.apply(this, arguments);
      };
    }()
  }, {
    key: "runSuite",
    value: function () {
      var _runSuite = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(suite) {
        var _this3 = this;

        var page;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.newPage();

              case 2:
                page = _context5.sent;
                page.exposeFunction('onSuiteReady', function (cases) {
                  _this3.emit('suiteReady', suite, cases);
                });
                page.exposeFunction('onHookFinished', function (hookState, caseState) {
                  _this3.emit('hookFinished', suite, hookState, caseState);
                });
                page.exposeFunction('onCaseReady', function (caseState) {
                  _this3.emit('caseReady', suite, caseState);
                });
                page.exposeFunction('onCaseFinished', function (caseState, hookState) {
                  _this3.emit('caseFinished', suite, caseState, hookState);
                });
                page.exposeFunction('onSuiteFinished',
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee4(passed, cov) {
                    return _regenerator.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return page.close();

                          case 2:
                            _this3.emit('suiteFinished', suite, passed, cov);

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this);
                  }));

                  return function (_x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context5.next = 10;
                return page.goto(suite.url);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function runSuite(_x2) {
        return _runSuite.apply(this, arguments);
      };
    }()
  }, {
    key: "pipeLog",
    value: function () {
      var _pipeLog = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(data) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, arg, _arg$_remoteObject, type, subtype;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context6.prev = 3;
                _iterator = data.args()[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context6.next = 26;
                  break;
                }

                arg = _step.value;
                _arg$_remoteObject = arg._remoteObject, type = _arg$_remoteObject.type, subtype = _arg$_remoteObject.subtype;

                if (!(type === 'function' || subtype === 'regexp')) {
                  _context6.next = 12;
                  break;
                }

                this.logger.console(data.type(), arg._remoteObject.description);
                _context6.next = 23;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = this.logger;
                _context6.t1 = data.type();
                _context6.next = 17;
                return arg.jsonValue();

              case 17:
                _context6.t2 = _context6.sent;

                _context6.t0.console.call(_context6.t0, _context6.t1, _context6.t2);

                _context6.next = 23;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t3 = _context6["catch"](12);

              case 23:
                _iteratorNormalCompletion = true;
                _context6.next = 5;
                break;

              case 26:
                _context6.next = 32;
                break;

              case 28:
                _context6.prev = 28;
                _context6.t4 = _context6["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context6.t4;

              case 32:
                _context6.prev = 32;
                _context6.prev = 33;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 35:
                _context6.prev = 35;

                if (!_didIteratorError) {
                  _context6.next = 38;
                  break;
                }

                throw _iteratorError;

              case 38:
                return _context6.finish(35);

              case 39:
                return _context6.finish(32);

              case 40:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 28, 32, 40], [12, 21], [33,, 35, 39]]);
      }));

      return function pipeLog(_x5) {
        return _pipeLog.apply(this, arguments);
      };
    }()
  }]);
  return Browser;
}(_events.default);

exports.default = Browser;