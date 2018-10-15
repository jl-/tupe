"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("../utils/fs"));

var _stringHash = _interopRequireDefault(require("string-hash"));

var _metrics = _interopRequireDefault(require("../utils/metrics"));

var status = _interopRequireWildcard(require("../meta/status"));

var Suite =
/*#__PURE__*/
function () {
  function Suite(srcpath, tmpdir) {
    (0, _classCallCheck2.default)(this, Suite);
    this.status = status.INIT;
    this.metrics = new _metrics.default();
    this.srcpath = srcpath;
    this.name = "tmp-".concat((0, _stringHash.default)(srcpath), ".html");
    this.path = _path.default.resolve(tmpdir, _path.default.basename(tmpdir), this.name);

    _fs.default.outputFileSync(this.path, genHtml(this.path, this.srcpath));
  }

  (0, _createClass2.default)(Suite, [{
    key: "prepare",
    value: function prepare(port) {
      var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'localhost';
      this.url = "http://".concat(host, ":").concat(port, "/").concat(this.name);
      this.metrics.record(this.status = status.PENDING);
    }
  }, {
    key: "onReady",
    value: function onReady() {}
  }, {
    key: "onHookFinished",
    value: function onHookFinished() {}
  }, {
    key: "onCaseReady",
    value: function onCaseReady() {}
  }, {
    key: "onCaseFinished",
    value: function onCaseFinished() {}
  }, {
    key: "onFinished",
    value: function onFinished(passed) {
      this.metrics.end(this.status);
      this.status = passed ? status.PASSED : status.FAILED;
    }
  }, {
    key: "passed",
    get: function get() {
      return this.status === status.PASSED;
    }
  }, {
    key: "failed",
    get: function get() {
      return this.status === status.FAILED;
    }
  }]);
  return Suite;
}();

exports.default = Suite;

function genHtml(fpath, srcpath) {
  var dir = _path.default.dirname(fpath);

  var relpath = _path.default.relative(dir, srcpath);

  return "\n        <html>\n            <body>\n                <script src=\"".concat(relpath, "\"></script>\n                <script>tupe.run();</script>\n            </body>\n        </html>\n    ");
}