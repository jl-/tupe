"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ora = _interopRequireDefault(require("ora"));

var _figures = _interopRequireDefault(require("figures"));

var _string = _interopRequireDefault(require("../utils/string"));

var _options = _interopRequireDefault(require("./options"));

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Logger);
    this.options = (0, _options.default)(options);
    this.stream = this.options.stream;

    if (this.constructor.registry.has(this.stream)) {
      return this.constructor.registry.get(this.stream);
    }

    this.powerline = (0, _ora.default)();
    this.log = this.info = this.writeln;
    this.constructor.registry.set(this.stream, this);
  }

  (0, _createClass2.default)(Logger, [{
    key: "write",
    value: function write(message) {
      this.stream.write(message);
    }
  }, {
    key: "writeln",
    value: function writeln(message) {
      this.write("".concat(message, "\n"));
    }
  }, {
    key: "success",
    value: function success(text) {
      this.writeln("".concat(_string.default.green(_figures.default.tick), "  ").concat(text));
    }
  }, {
    key: "error",
    value: function error(text) {
      this.writeln("".concat(_string.default.red(_figures.default.cross), "  ").concat(text));
    }
  }, {
    key: "title",
    value: function title(str) {
      this.writeln(_string.default.bold("\n\n".concat(str)));
    }
  }, {
    key: "console",
    value: function (_console) {
      function console(_x) {
        return _console.apply(this, arguments);
      }

      console.toString = function () {
        return _console.toString();
      };

      return console;
    }(function (type) {
      var _console2;

      for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      (_console2 = console)[type].apply(_console2, data);
    })
  }, {
    key: "pending",
    value: function pending(active) {
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'stop';
      var text = arguments.length > 2 ? arguments[2] : undefined;

      if (active) {
        this.powerline.start(active);
      } else {
        this.powerline[action](text);
      }
    }
  }]);
  return Logger;
}();

exports.default = Logger;
(0, _defineProperty2.default)(Logger, "registry", new WeakMap());