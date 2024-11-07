"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var success = function success(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var mes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  res.status(status).json({
    error: false,
    status: status,
    body: mes
  });
};
var error = function error(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var mes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  res.status(status).json({
    error: true,
    status: status,
    body: mes
  });
};
var _default = exports["default"] = {
  success: success,
  error: error
};