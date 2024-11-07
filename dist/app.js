"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _routes = _interopRequireDefault(require("./routes"));
var _dotenv = require("dotenv");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
(0, _dotenv.config)();
var app = (0, _express["default"])();

// Middleware
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
// port 
app.set("port", process.env.PORT || 3100);
app.use("/", _routes["default"]);
var _default = exports["default"] = app;