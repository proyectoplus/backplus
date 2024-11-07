"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metodo = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _db = _interopRequireDefault(require("../db/db"));
var _res = _interopRequireDefault(require("../mes/res"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _dotenv = require("dotenv");
var _morgan = require("morgan");
(0, _dotenv.config)();
var Register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var name, lastname, age, phone, email, paswordsin, idrole, salt, hashpasword, pasword, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          name = req.body.name;
          lastname = req.body.lastname;
          age = req.body.age;
          phone = req.body.phone;
          email = req.body.email;
          paswordsin = req.body.pasword;
          idrole = req.body.idrole; // "${name}","${lastname}","${age}","${phone}","${email}","${pasword}","${idrole}"
          _context.prev = 7;
          _context.next = 10;
          return _bcrypt["default"].genSalt(5);
        case 10:
          salt = _context.sent;
          _context.next = 13;
          return _bcrypt["default"].hash(paswordsin, salt);
        case 13:
          hashpasword = _context.sent;
          pasword = hashpasword;
          _context.next = 17;
          return _db["default"].query("CALL SP_REGISTER(?,?,?,?,?,?,?);", [name, lastname, age, phone, email, pasword, idrole]);
        case 17:
          result = _context.sent;
          if (result[0].affectedRows == 1) {
            _res["default"].success(req, res, 201, "User Register");
          } else {
            _res["default"].error(req, res, 401, "Error Register");
          }
          _context.next = 24;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](7);
          _res["default"].error(req, res, 500, "Error Connection", _context.t0);
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 21]]);
  }));
  return function Register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var viewRegister = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _db["default"].query("CALL SP_VIEW_REGISTER()");
        case 3:
          result = _context2.sent;
          _res["default"].success(req, res, 200, result[0]);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          _res["default"].error(req, res, 500, "Error Connection", _context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function viewRegister(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var loginUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, email, pasword, result, comparePasword, payload, _token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, pasword = _req$body.pasword;
          _context3.prev = 1;
          _context3.next = 4;
          return _db["default"].query("CALL SP_LOGIN(?);", [email]);
        case 4:
          result = _context3.sent;
          if (!(result[0][0][0].length === 0)) {
            _context3.next = 8;
            break;
          }
          res.error(req, res, 401, "User Denied");
          return _context3.abrupt("return");
        case 8:
          _context3.next = 10;
          return _bcrypt["default"].compare(pasword, result[0][0][0].pasword);
        case 10:
          comparePasword = _context3.sent;
          if (comparePasword) {
            _context3.next = 16;
            break;
          }
          res.error(req, res, 401, "Email or Password Incorrect");
          return _context3.abrupt("return");
        case 16:
          payload = {
            iduser: result[0][0][0].iduser,
            name: result[0][0][0].name,
            lastname: result[0][0][0].lastname,
            email: result[0][0][0].email,
            idrole: result[0][0][0].idrole
          };
          _token = _jsonwebtoken["default"].sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: process.env.EXPIRES_IN
          }); // .cookie('access_token', token{
          //     httpOnly: true,
          //     secure: process.env.NODE_ENV === 'production'
          // })
          _res["default"].success(req, res, 201, {
            token: _token
          });
        case 19:
          _context3.next = 24;
          break;
        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](1);
          _res["default"].error(req, res, 500, "Login Incorrect");
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 21]]);
  }));
  return function loginUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var metodo = exports.metodo = {
  Register: Register,
  viewRegister: viewRegister,
  loginUser: loginUser
};