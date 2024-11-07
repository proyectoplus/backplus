"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _register = _interopRequireDefault(require("./register.route"));
var rutas = (0, _express.Router)();
rutas.use("/", _register["default"]);
var _default = exports["default"] = rutas;