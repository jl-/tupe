"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _glob = _interopRequireDefault(require("glob"));

var _suite = _interopRequireDefault(require("./suite"));

var _logger = _interopRequireDefault(require("./logger"));

var _server = _interopRequireDefault(require("./server"));

var _browser = _interopRequireDefault(require("./browser"));

var _reporter = _interopRequireDefault(require("./reporter"));

var _metrics = _interopRequireDefault(require("./utils/metrics"));

var status = _interopRequireWildcard(require("./meta/status"));

var debug = require('./utils/debug')('agent');

var Agent =
/*#__PURE__*/
function () {
  function Agent() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        files = _ref.files,
        config = (0, _objectWithoutProperties2.default)(_ref, ["files"]);

    (0, _classCallCheck2.default)(this, Agent);
    this.config = config;
    this.suites = new Map();
    this.status = status.INIT;
    this.logger = new _logger.default();
    this.metrics = new _metrics.default();
    this.server = new _server.default(config);
    this.browser = new _browser.default(this.logger);
    this.reporter = new _reporter.default(this.logger, config);
    this.addSuites(files);
  }

  (0, _createClass2.default)(Agent, [{
    key: "addSuites",
    value: function addSuites(files) {
      var entryPaths = files.reduce(function (r, p) {
        return r.concat(_glob.default.sync(p, {
          nodir: true
        }));
      }, []);

      var _arr = (0, _toConsumableArray2.default)(new Set(entryPaths));

      for (var _i = 0; _i < _arr.length; _i++) {
        var entryPath = _arr[_i];
        var suite = new _suite.default(entryPath, this.server.tmpdir);
        this.suites.set(suite.path, suite);
      }
    }
  }, {
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var _this = this;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.server.removeAllListeners();
                this.browser.removeAllListeners();
                this.server.on('bundled', this.digest.bind(this));
                this.browser.on('suiteReady', this.onSuiteReady.bind(this));
                this.browser.on('hookFinished', this.onHookFinished.bind(this));
                this.browser.on('caseReady', this.onCaseReady.bind(this));
                this.browser.on('caseFinished', this.onCaseFinished.bind(this));
                this.browser.on('suiteFinished', this.onSuiteFinished.bind(this));
                process.once('SIGINT',
                /*#__PURE__*/
                (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee() {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _this.stop();

                        case 2:
                          return _context.abrupt("return", _context.sent);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                })));
                return _context2.abrupt("return", this.server.start(this.suites));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function run() {
        return _run.apply(this, arguments);
      };
    }()
  }, {
    key: "digest",
    value: function () {
      var _digest = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(bundle) {
        var server, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, suite;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                server = this.server;
                this.reporter.prepare();
                this.metrics.record(this.status = status.PENDING);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 6;
                _iterator = this.suites.values()[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 16;
                  break;
                }

                suite = _step.value;
                suite.prepare(server.port, server.host);
                _context3.next = 13;
                return this.browser.runSuite(suite);

              case 13:
                _iteratorNormalCompletion = true;
                _context3.next = 8;
                break;

              case 16:
                _context3.next = 22;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 22:
                _context3.prev = 22;
                _context3.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 25:
                _context3.prev = 25;

                if (!_didIteratorError) {
                  _context3.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context3.finish(25);

              case 29:
                return _context3.finish(22);

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 18, 22, 30], [23,, 25, 29]]);
      }));

      return function digest(_x) {
        return _digest.apply(this, arguments);
      };
    }()
  }, {
    key: "onSuiteReady",
    value: function onSuiteReady(suite, cases) {
      suite.onReady(cases);
      this.reporter.onSuiteReady(suite, cases);
    }
  }, {
    key: "onHookFinished",
    value: function onHookFinished(suite, hookState, caseState) {
      suite.onHookFinished(hookState, caseState);
      this.reporter.onHookFinished(suite, hookState, caseState);
    }
  }, {
    key: "onCaseReady",
    value: function onCaseReady(suite, caseState) {
      suite.onCaseReady(caseState);
      this.reporter.onCaseReady(suite, caseState);
    }
  }, {
    key: "onCaseFinished",
    value: function onCaseFinished(suite, caseState, hookState) {
      suite.onCaseFinished(caseState, hookState);
      this.reporter.onCaseFinished(suite, caseState, hookState);
    }
  }, {
    key: "onSuiteFinished",
    value: function () {
      var _onSuiteFinished = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(suite, passed, cov) {
        var suites, metric;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                suite.onFinished(passed, cov);
                this.reporter.onSuiteFinished(suite, passed, cov);
                suites = (0, _toConsumableArray2.default)(this.suites.values());

                if (!suites.every(function (s) {
                  return s.passed || s.failed;
                })) {
                  _context4.next = 10;
                  break;
                }

                metric = this.metrics.end(this.status);
                this.reporter.sumup(suites, metric);
                this.status = suites.every(function (s) {
                  return s.passed;
                }) ? status.PASSED : status.FAILED;

                if (this.server.watch) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 10;
                return this.stop();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function onSuiteFinished(_x2, _x3, _x4) {
        return _onSuiteFinished.apply(this, arguments);
      };
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.server.stop();

              case 2:
                _context5.next = 4;
                return this.browser.exit();

              case 4:
                process.exit(this.isFailed ? 1 : 0);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function stop() {
        return _stop.apply(this, arguments);
      };
    }()
  }]);
  return Agent;
}();

exports.default = Agent;

function run(config) {
  debug('config: ', config);
  return new Agent(config).run();
}