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

var _events = _interopRequireDefault(require("events"));

var _parcelBundler = _interopRequireDefault(require("parcel-bundler"));

var _portfinder = require("portfinder");

var Server =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2.default)(Server, _EventEmitter);

  function Server(options) {
    var _this;

    (0, _classCallCheck2.default)(this, Server);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Server).call(this));
    _this.host = 'localhost';
    _this.port = options.port;
    _this.watch = options.watch;
    _this.tmpdir = options.tmpdir;
    return _this;
  }

  (0, _createClass2.default)(Server, [{
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(suites) {
        var _this2 = this;

        var suitePaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, suite, port, watch;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                suitePaths = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;

                for (_iterator = suites.values()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  suite = _step.value;
                  suitePaths.push(suite.path);
                }

                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 12:
                _context.prev = 12;
                _context.prev = 13;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 15:
                _context.prev = 15;

                if (!_didIteratorError) {
                  _context.next = 18;
                  break;
                }

                throw _iteratorError;

              case 18:
                return _context.finish(15);

              case 19:
                return _context.finish(12);

              case 20:
                port = this.port;
                _context.next = 23;
                return (0, _portfinder.getPortPromise)({
                  port: port
                });

              case 23:
                this.port = _context.sent;
                watch = this.watch;
                this.bundler = new _parcelBundler.default(suitePaths, {
                  outDir: this.tmpdir,
                  watch: watch,
                  hmr: watch,
                  logLevel: 1
                });
                this.bundler.on('bundled', function (b) {
                  return _this2.emit('bundled', b);
                });
                return _context.abrupt("return", this.bundler.serve(this.port));

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      return function start(_x) {
        return _start.apply(this, arguments);
      };
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function stop() {
        return _stop.apply(this, arguments);
      };
    }()
  }]);
  return Server;
}(_events.default);

exports.default = Server;