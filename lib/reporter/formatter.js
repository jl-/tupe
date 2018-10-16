"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crumbTitle = crumbTitle;
exports.explainError = explainError;
exports.formatError = void 0;

var _path = _interopRequireDefault(require("path"));

var _figures = _interopRequireDefault(require("figures"));

var _string = _interopRequireDefault(require("../utils/string"));

var _powerAssertRendererAssertion = _interopRequireDefault(require("power-assert-renderer-assertion"));

var _powerAssertRendererDiagram = _interopRequireDefault(require("power-assert-renderer-diagram"));

var _powerAssertContextFormatter = _interopRequireDefault(require("power-assert-context-formatter"));

var _renderers = require("./renderers");

var formatError = (0, _powerAssertContextFormatter.default)({
  renderers: [_renderers.FileRenderer, _powerAssertRendererAssertion.default, _powerAssertRendererDiagram.default, _renderers.ComparisonRenderer]
});
exports.formatError = formatError;

function crumbTitle(filepath, title) {
  var prefix = filepath.split(_path.default.sep).join(_string.default.dim(" ".concat(_figures.default.pointerSmall, " ")));
  return [prefix, title].join(_string.default.dim(" ".concat(_figures.default.arrowRight, " ")));
}

function explainError(logger, error) {
  if (error.powerAssertContext) {
    logger.writeln(formatError(error.powerAssertContext));
  } else {
    logger.writeln(_string.default.dim(error.trace));
    logger.writeln("\n ".concat(_string.default.dim(error.name + ':'), "   ").concat(error.message, "\n"));
    logger.writeln(_string.default.red('expected: ') + JSON.stringify(error.expected));
    logger.writeln(_string.default.green('actual:   ') + JSON.stringify(error.actual));
    logger.writeln('');
  }
}