"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComparisonRenderer = exports.FileRenderer = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _typeName = _interopRequireDefault(require("type-name"));

var _string = _interopRequireDefault(require("../utils/string"));

var _diffMatchPatch = _interopRequireDefault(require("diff-match-patch"));

var _powerAssertRendererBase = _interopRequireDefault(require("power-assert-renderer-base"));

var _powerAssertRendererComparison = _interopRequireDefault(require("power-assert-renderer-comparison"));

var dmp = new _diffMatchPatch.default();

var FileRenderer =
/*#__PURE__*/
function (_BaseRenderer) {
  (0, _inherits2.default)(FileRenderer, _BaseRenderer);

  function FileRenderer() {
    (0, _classCallCheck2.default)(this, FileRenderer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FileRenderer).apply(this, arguments));
  }

  (0, _createClass2.default)(FileRenderer, [{
    key: "onStart",
    value: function onStart(ctx) {
      this.line = ctx.source.line;
      this.filepath = ctx.source.filepath;
    }
  }, {
    key: "onEnd",
    value: function onEnd() {
      if (!this.filepath) {
        this.write(_string.default.dim("# at line: ".concat(this.line)));
      } else {
        this.write(_string.default.dim("# ".concat(this.filepath, ":").concat(this.line)));
      }
    }
  }]);
  return FileRenderer;
}(_powerAssertRendererBase.default);

exports.FileRenderer = FileRenderer;

var ComparisonRenderer =
/*#__PURE__*/
function (_BaseComparisionRende) {
  (0, _inherits2.default)(ComparisonRenderer, _BaseComparisionRende);

  function ComparisonRenderer() {
    (0, _classCallCheck2.default)(this, ComparisonRenderer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ComparisonRenderer).apply(this, arguments));
  }

  (0, _createClass2.default)(ComparisonRenderer, [{
    key: "showExpectedAndActual",
    value: function showExpectedAndActual(pair) {
      this.write('');

      var tagType = function tagType(v) {
        return _string.default.dim('[') + (0, _typeName.default)(v) + _string.default.dim(']');
      };

      this.write(tagType(pair.right.value) + ' ' + pair.right.code);
      this.write(_string.default.dim('=> ') + this.stringify(pair.right.value));
      this.write(tagType(pair.left.value) + ' ' + pair.left.code);
      this.write(_string.default.dim('=> ') + this.stringify(pair.left.value));
    }
  }, {
    key: "showStringDiff",
    value: function showStringDiff(_ref) {
      var left = _ref.left,
          right = _ref.right;
      this.write('');
      this.write(_string.default.error('--- [string] ') + left.code);
      this.write(_string.default.green('+++ [string] ') + right.code);
      var diffs = dmp.diff_main(right.value, left.value);
      dmp.diff_cleanupSemantic(diffs);
      var patches = dmp.patch_make(right.value, diffs);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = patches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var patch = _step.value;
          this.write(stringifyDiffPatch(patch));
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
    }
  }]);
  return ComparisonRenderer;
}(_powerAssertRendererComparison.default);

exports.ComparisonRenderer = ComparisonRenderer;

function stringifyDiffPatch(patch) {
  var DELETE = _string.default.error('-');

  var INSERT = _string.default.green('+');

  var coordsOf = function coordsOf(start, length) {
    if (length === 0) return "".concat(start, ",0");
    if (length === 1) return start + 1;
    return "".concat(start + 1, ",").concat(length);
  };

  var header = "@@ ".concat(DELETE) + coordsOf(patch.start1, patch.length1) + " ".concat(INSERT) + coordsOf(patch.start2, patch.length2) + ' @@';
  var originLine = "".concat(DELETE, " ");
  var patchLine = "".concat(INSERT, " ");
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = patch.diffs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
          op = _step2$value[0],
          text = _step2$value[1];

      if (op === 0) {
        originLine += text;
        patchLine += text;
      } else if (op === 1) {
        originLine += _string.default.bgRed(text);
      } else if (op === -1) {
        patchLine += _string.default.bgGreen(text);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return [header, originLine, patchLine].join('\n').replace(/%20/g, ' ');
}