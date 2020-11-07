module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ "1x2o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



const Input = ({
  autoComplete,
  autoFocus,
  defaultValue,
  id,
  maxLength,
  name,
  onChange,
  onFocus,
  placeholder,
  required,
  style,
  type = "text",
  value,
  readOnly,
  disabled,
  onKeyDown
}) => {
  // autofocus is bugging if has states/onChanges
  const inputRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])();
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  });
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("input", _extends({
    autoFocus: autoFocus,
    ref: inputRef
  }, {
    autoComplete,
    defaultValue,
    id,
    maxLength,
    name,
    onChange,
    onFocus,
    placeholder,
    required,
    style,
    type,
    value,
    readOnly,
    disabled,
    onKeyDown
  }, {
    className: "jsx-1623030887" + " " + "form-control"
  })), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1623030887"
  }, [".form-control.jsx-1623030887{border-color:rgba(var(--gray2-rgb),.55);border-width:2px;color:var(--black);}", ".form-control[disabled].jsx-1623030887{background-color:var(--gray);}"]));
};

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("oBQu");


/***/ }),

/***/ "2MRG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return baseURL; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("I83c");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("rOcY");



const baseURL = _config__WEBPACK_IMPORTED_MODULE_2__[/* API_URL */ "a"];
let http, apiCtx, apiSignOut;

const api = (ctx, signOut) => {
  if (!http) {
    // client creation
    http = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
      baseURL: `${baseURL}/api`
    }); // request interceptor (before)

    http.interceptors.request.use(async config => {
      const accessToken = Object(_auth__WEBPACK_IMPORTED_MODULE_1__[/* getAccessToken */ "c"])(apiCtx);
      config.headers.Accept = 'application/json';

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    }); // response interceptor (after)

    http.interceptors.response.use(response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // if the request is unauthorized
      const unauthorized = error.response && error.response.status === 401; // if it's a backend request

      if (apiCtx && unauthorized) {
        Object(_auth__WEBPACK_IMPORTED_MODULE_1__[/* backendLogout */ "a"])(apiCtx); // if it's a front end request
      } else if (unauthorized) {
        Object(_auth__WEBPACK_IMPORTED_MODULE_1__[/* frontendLogout */ "b"])(apiSignOut);
      } // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error


      return Promise.reject(error);
    });
  }

  apiCtx = ctx;
  apiSignOut = signOut;
  return http;
};

/* harmony default export */ __webpack_exports__["b"] = (api);

/***/ }),

/***/ "3YKB":
/***/ (function(module, exports) {

module.exports = require("color");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "DKqL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

const FormGroup = ({
  children
}) => {
  return __jsx("div", {
    className: "jsx-4136920119" + " " + "form-group"
  }, children, __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "4136920119"
  }, [".form-group.jsx-4136920119{font-size:16px;line-height:1;text-align:left;}"]));
};

/* harmony default export */ __webpack_exports__["a"] = (FormGroup);

/***/ }),

/***/ "Dtiu":
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "HJQg":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "I83c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ACCESS_TOKEN_KEY */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getAccessToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setAccessToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeAccessToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return frontendLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return backendLogout; });
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_0__);

const ACCESS_TOKEN_KEY = 'access_token';
const getAccessToken = ctx => {
  const cookies = nookies__WEBPACK_IMPORTED_MODULE_0___default.a.get(ctx, ACCESS_TOKEN_KEY);
  return cookies[ACCESS_TOKEN_KEY];
};
const setAccessToken = accessToken => {
  nookies__WEBPACK_IMPORTED_MODULE_0___default.a.set({}, ACCESS_TOKEN_KEY, accessToken, {
    path: '/'
  });
};
const removeAccessToken = ctx => {
  nookies__WEBPACK_IMPORTED_MODULE_0___default.a.destroy(ctx, ACCESS_TOKEN_KEY, {
    path: '/'
  });
};
const frontendLogout = signOut => {
  signOut();
};
const backendLogout = ctx => {
  removeAccessToken(ctx);
  nookies__WEBPACK_IMPORTED_MODULE_0___default.a.destroy(ctx, 'user', {
    path: '/'
  });
  ctx.res.redirect('/login');
  ctx.res.end();
}; // export const isAuthenticated = _ => getAccessToken() !== null

/* export const login = accessToken => {
  setAccessToken(accessToken)
} */

/***/ }),

/***/ "K2gz":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "SjLB":
/***/ (function(module, exports) {

module.exports = require("json-parse-safe");

/***/ }),

/***/ "Y54+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const Label = ({
  children,
  htmlFor,
  className
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("label", {
    htmlFor,
    className
  }, children));
};

/* harmony default export */ __webpack_exports__["a"] = (Label);

/***/ }),

/***/ "a3/r":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("K2gz");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3YKB");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("knb4");
/* harmony import */ var react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("rOcY");

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







const Button = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef((_ref, ref) => {
  let {
    block,
    children,
    className = '',
    color = 'primary',
    disabled,
    home,
    href,
    loading,
    onClick,
    outline,
    size = '',
    style,
    target,
    textColor,
    type
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["block", "children", "className", "color", "disabled", "home", "href", "loading", "onClick", "outline", "size", "style", "target", "textColor", "type"]);

  const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()([{
    'home': home
  }, 'btn', `btn-${color}`, {
    'btn-block': block
  }, {
    'btn-outline': outline
  }, {
    'btn-sm': size === 'sm'
  }, {
    'btn--color-white': textColor
  }, className]);
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_5__["ThemeContext"]);
  const secondaryBackground = theme.colors.backgroundContrast2;
  const secondaryHover = color__WEBPACK_IMPORTED_MODULE_2___default()(secondaryBackground).lighten(.1).hsl().string();
  return __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, ['button', 'submit'].includes(type) ? __jsx("button", _extends({
    href,
    onClick,
    ref,
    type,
    style,
    disabled
  }, {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["861150020", [color__WEBPACK_IMPORTED_MODULE_2___default()(_config__WEBPACK_IMPORTED_MODULE_6__[/* CONFIG */ "b"].color).fade(.5).string(), secondaryBackground, secondaryHover]]]) + " " + (classes || "")
  }), children, '  ', loading && __jsx(react_bootstrap_Spinner__WEBPACK_IMPORTED_MODULE_4___default.a, {
    as: "span",
    animation: "border",
    size: "sm",
    role: "status",
    "aria-hidden": "true"
  })) : __jsx("a", {
    href: href,
    onClick: onClick,
    ref: ref,
    target: target,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["861150020", [color__WEBPACK_IMPORTED_MODULE_2___default()(_config__WEBPACK_IMPORTED_MODULE_6__[/* CONFIG */ "b"].color).fade(.5).string(), secondaryBackground, secondaryHover]]]) + " " + (classes || "")
  }, children), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "861150020",
    dynamic: [color__WEBPACK_IMPORTED_MODULE_2___default()(_config__WEBPACK_IMPORTED_MODULE_6__[/* CONFIG */ "b"].color).fade(.5).string(), secondaryBackground, secondaryHover]
  }, [".btn.__jsx-style-dynamic-selector{border:0;border-radius:5px;cursor:pointer;display:inline-block;font-family:var(--sans-serif-condensed);font-size:20px;font-weight:bold;line-height:1.35;padding:10px 20px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}", ".btn-primary.__jsx-style-dynamic-selector{background-color:var(--primary) !important;color:var(--white) !important;}", `.btn-primary.__jsx-style-dynamic-selector:focus,.btn-primary.__jsx-style-dynamic-selector:active.__jsx-style-dynamic-selector:focus{box-shadow:0 0 0 .2rem ${color__WEBPACK_IMPORTED_MODULE_2___default()(_config__WEBPACK_IMPORTED_MODULE_6__[/* CONFIG */ "b"].color).fade(.5).string()};}`, ".btn-primary.__jsx-style-dynamic-selector:focus,.btn-primary.__jsx-style-dynamic-selector:hover{background-color:var(--primary-hover) !important;}", `.btn-secondary.__jsx-style-dynamic-selector{background-color:${secondaryBackground};color:var(--white);}`, `.btn-secondary.__jsx-style-dynamic-selector:focus,.btn-secondary.__jsx-style-dynamic-selector:hover{background-color:${secondaryHover};}`, ".btn-secondary.btn-outline.__jsx-style-dynamic-selector{background-color:transparent;border:1px solid var(--gray);color:var(--gray);padding-top:8px;padding-bottom:8px;}", ".btn-secondary.btn-outline.__jsx-style-dynamic-selector:hover{background-color:white;border:1px solid white;color:black;}", ".btn-secondary.btn-outline.btn--color-white.__jsx-style-dynamic-selector{color:var(--white);}", ".btn-block.__jsx-style-dynamic-selector{display:block;}", ".btn.__jsx-style-dynamic-selector img{margin-right:10px;}", ".btn-sm.__jsx-style-dynamic-selector{line-height:1.75;padding-top:0;padding-bottom:0;}", "@media (max-width:576px){.home.btn.__jsx-style-dynamic-selector{font-size:12px;padding:5px 12px;}.home.btn-secondary.btn-outline.__jsx-style-dynamic-selector{padding-top:5px;padding-bottom:5px;border:1px solid white;color:white;}}"]));
});
/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "dSS1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Select; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Select({
  children,
  defaultValue,
  id,
  name,
  onChange,
  required,
  value,
  style
}) {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("select", _extends({
    id,
    defaultValue,
    name,
    onChange,
    required,
    value,
    style
  }, {
    className: "jsx-2308053182" + " " + "form-control"
  }), children), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2308053182"
  }, [".form-control.jsx-2308053182{border-color:rgba(var(--gray2-rgb),.55);border-width:2px;color:var(--black);}"]));
}

/***/ }),

/***/ "fqU8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const InvalidFeedback = ({
  error,
  loading,
  name
}) => {
  return __jsx("div", {
    className: "col-12"
  }, !loading && error && error.errors && error.errors[name] && __jsx("div", {
    className: "invalid-feedback"
  }, error.errors[name]));
};

/* harmony default export */ __webpack_exports__["a"] = (InvalidFeedback);

/***/ }),

/***/ "gGgb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var json_parse_safe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("SjLB");
/* harmony import */ var json_parse_safe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_parse_safe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("gdJV");
/* harmony import */ var _components_withApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ihRs");
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








const withAuth = (WrappedComponent, update = false) => {
  const WithAuth = props => {
    const {
      user,
      updateUser
    } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"]);
    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
      if (!user) {
        next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push('/');
      }
    }, [user]);
    return __jsx(WrappedComponent, _extends({
      updateUser: updateUser
    }, props));
  };

  WithAuth.getInitialProps = async ctx => {
    const {
      api
    } = ctx;
    let user;

    if (update) {
      try {
        // get updated user
        const {
          data
        } = await api.get('user');
        user = data; // set user to cookies

        nookies__WEBPACK_IMPORTED_MODULE_3___default.a.set(ctx, 'user', JSON.stringify(user), {
          path: '/'
        });
      } catch (error) {}
    } else {
      const {
        user: userString
      } = nookies__WEBPACK_IMPORTED_MODULE_3___default.a.get(ctx, 'user');
      user = json_parse_safe__WEBPACK_IMPORTED_MODULE_0___default()(userString).value;
    }

    if (!user) {
      const {
        pathname,
        res
      } = ctx;
      const redirectRoute = `/login?redirectTo=${pathname}`;
      console.log('redirectroute', redirectRoute);

      if (res) {
        res.redirect(redirectRoute);
        res.end();
      } else {
        next_router__WEBPACK_IMPORTED_MODULE_2___default.a.replace(redirectRoute);
      }

      return {};
    }

    if (WrappedComponent.getInitialProps) {
      // append user to the context
      ctx.user = user;
      const componentProps = await WrappedComponent.getInitialProps(ctx);
      return _objectSpread({
        user
      }, componentProps);
    } else {
      return {
        user
      };
    }
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`; // wrap this hoc on withApi hoc

  return Object(_components_withApi__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(WithAuth);
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/* harmony default export */ __webpack_exports__["a"] = (withAuth);

/***/ }),

/***/ "gdJV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var json_parse_safe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("SjLB");
/* harmony import */ var json_parse_safe__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(json_parse_safe__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("2MRG");
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("I83c");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const UserContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])();
/* harmony default export */ __webpack_exports__["b"] = (UserContext);
function UserProvider({
  children
}) {
  const {
    user: userString
  } = nookies__WEBPACK_IMPORTED_MODULE_3___default.a.get({}, 'user');
  const userCookie = json_parse_safe__WEBPACK_IMPORTED_MODULE_2___default()(userString).value;
  const {
    0: user,
    1: setUser
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(userCookie);

  const signIn = (user, tokenResponse) => {
    const {
      access_token,
      expires_in,
      refresh_token,
      token_type
    } = tokenResponse;
    Object(_services_auth__WEBPACK_IMPORTED_MODULE_5__[/* setAccessToken */ "e"])(access_token);
    localStorage.setItem('token_type', token_type);
    localStorage.setItem('expires_in', expires_in);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user', JSON.stringify(user));
    nookies__WEBPACK_IMPORTED_MODULE_3___default.a.set({}, 'user', JSON.stringify(user), {
      path: '/'
    });
    setUser(user);

    if (!user.register_completed_at) {
      next_router__WEBPACK_IMPORTED_MODULE_1___default.a.replace('/register/welcome');
    } else {
      next_router__WEBPACK_IMPORTED_MODULE_1___default.a.replace('/');
    }
  };

  const signOut = async _ => {
    Object(_services_api__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"])().post('logout').then(response => {
      console.log('Logout successfully', response);
      Object(_services_auth__WEBPACK_IMPORTED_MODULE_5__[/* removeAccessToken */ "d"])();
      localStorage.removeItem('token_type');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('refresh_token');
    }).catch(error => {
      console.log("Couldn't logout", error);
    });
    localStorage.removeItem('user');
    nookies__WEBPACK_IMPORTED_MODULE_3___default.a.destroy({}, 'user', {
      path: '/'
    });
    setUser(null); // Router.push('/signin')
    // location.href = location.protocol + '//' + location.host + location.pathname
  };

  const updateUser = user => {
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
    nookies__WEBPACK_IMPORTED_MODULE_3___default.a.set({}, 'user', userString, {
      path: '/'
    });
    setUser(user);
  };

  const completeUserProfile = user => {};

  return __jsx(UserContext.Provider, {
    value: _objectSpread({}, {
      user,
      signIn,
      signOut,
      updateUser
    })
  }, children);
}

/***/ }),

/***/ "ihRs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("gdJV");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2MRG");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





const withApi = WrappedComponent => {
  const WithApi = props => {
    const {
      signOut
    } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"]);
    const clientApi = Object(_services_api__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"])(null, signOut);
    return __jsx(WrappedComponent, _extends({
      api: clientApi
    }, props));
  };

  if (WrappedComponent.getInitialProps) {
    WithApi.getInitialProps = async ctx => {
      const serverApi = Object(_services_api__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"])(ctx);
      ctx.api = serverApi;
      const componentProps = await WrappedComponent.getInitialProps(ctx);
      return _objectSpread({}, componentProps);
    };
  }

  WithApi.displayName = `WithApi(${getDisplayName(WrappedComponent)})`;
  return WithApi;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/* harmony default export */ __webpack_exports__["a"] = (withApi);

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "knb4":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/Spinner");

/***/ }),

/***/ "oBQu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_withAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("gGgb");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rxnA");
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("gdJV");
/* harmony import */ var _pages_register_wizard_partials_address__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("p3Ei");
/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("a3/r");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("3YKB");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_NameProject_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("zlq/");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import sleep from 'sleep-promise'










const UserAddressForm = ({
  api,
  layoutProps,
  handleSubmit,
  handleFormState,
  formData,
  setFormData
}) => {
  const formDataHasProperties = formData.hasOwnProperty("country_id") && formData.hasOwnProperty("address_1st_level") && formData.hasOwnProperty("city") && formData.hasOwnProperty("address_3rd_level") && formData.hasOwnProperty("address");
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_7__["ThemeContext"]);
  const primaryColor = color__WEBPACK_IMPORTED_MODULE_8___default()(theme.colors.primary).hsl().string();
  const requireds = _constants_constants__WEBPACK_IMPORTED_MODULE_3__[/* IS_PRODUCTION */ "d"];
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const {
    0: values,
    1: setValues
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    country_id: "",
    address_1st_level: "",
    city: "",
    address_3rd_level: "",
    address: ""
  });
  const {
    user
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_4__[/* default */ "b"]);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])();
  /* fill user form */

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
    if (user) {
      console.log("Primeiro useEffect (componentDidMount)");
      console.log(`\n\n user --  ${JSON.stringify(user)} \n\n`);
      console.log(`\n\n formData before set ${JSON.stringify(formData)} \n\n`);

      if (!formDataHasProperties) {
        setFormData(_objectSpread(_objectSpread({}, formData), {}, {
          address: user.address ? user.address : "",
          city: user.city ? user.city : "",
          country_id: user.country_id ? user.country_id : "",
          address_1st_level: user.address_1st_level_id,
          address_3rd_level: user.address_3rd_level
        }));
      }

      console.log(`\n\n formData after set ${JSON.stringify(formData)} \n\n`);
    }
  }, [user]);

  const handleInputChange = e => {
    const {
      checked,
      name,
      value,
      type
    } = e.target; // setValues({
    //   ...values,
    //   [name]:
    //     type === "checkbox"
    //       ? checked
    //         ? value === "true"
    //           ? true
    //           : value
    //         : false
    //       : value
    // });

    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      [name]: type === "checkbox" ? checked ? value === "true" ? true : value : false : value
    }));
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      let userData = {
        country_id: formData.country_id,
        address_1st_level: formData.address_1st_level,
        city: formData.city,
        address_3rd_level: formData.address_3rd_level,
        address: formData.address,
        email: user.email
      }; // let userData;
      // if (formDataHasProperties) {
      //   userData = {
      //     country_id: formData.country_id,
      //     address_1st_level: formData.address_1st_level,
      //     city: formData.city,
      //     address_3rd_level: formData.address_3rd_level,
      //     address: formData.address,
      //     email: user.email
      //   };
      // } else {
      //   userData = {
      //     country_id: values.country_id,
      //     address_1st_level: values.address_1st_level,
      //     city: values.city,
      //     address_3rd_level: values.address_3rd_level,
      //     address: values.address,
      //     email: user.email
      //   };
      // }

      const res = await api.post(`register/complete-user-address`, userData); // setFormData({...values});
      // setFormData({...formData});
      // console.log(`\n\n formData ${JSON.stringify(formData)}`);

      handleSubmit(2, userData);
    } catch (error) {
      if (error.response) {
        const {
          data,
          status
        } = error.response;

        if (status === 422) {
          setError(data);
        }
      } else if (error.request) {
        setError(error);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return __jsx("form", {
    method: "post",
    onSubmit: submit,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]])
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "register-confirm container text-center responsive"
  }, __jsx("h2", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "card-title text-center"
  }, __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "text-primary"
  }, "\xA1"), "S\xE9 parte de ", __jsx(_components_NameProject_index__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null), __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "text-primary"
  }, "!")), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "card-subtitle d-inline-block"
  }, "Con\xE9ctate sin tener que salir de casa"), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "row"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "col-md-6 aling-items"
  }, __jsx(_pages_register_wizard_partials_address__WEBPACK_IMPORTED_MODULE_5__["default"], {
    api: api,
    error: error,
    handleInputChange: handleInputChange,
    loading: loading,
    requireds: requireds,
    setValues: setValues,
    values: values,
    formData: formData,
    setFormData: setFormData
  }))), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "row mt-3"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "col-md-12"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3417927360", [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]]]) + " " + "text-center"
  }, __jsx(_components_button__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    color: "primary",
    onClick: () => handleFormState(1)
  }, "Volver"), __jsx(_components_button__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    color: "secondary",
    type: "submit",
    disabled: loading,
    loading: loading,
    style: {
      marginLeft: "20px"
    }
  }, "Siguiente"))))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3417927360",
    dynamic: [primaryColor, primaryColor, primaryColor, primaryColor, primaryColor]
  }, [`.text-primary{color:${primaryColor} !important;}`, `strong.text-primary{color:${primaryColor} !important;}`, "h2.card-title{font-weight:normal;color:#000;margin-bottom:1em;font-size:1.7em;}", "div.card-subtitle{font-size:1.1em;font-weight:500;margin-bottom:2.5em;max-width:380px;}", `.text-primary{color:${primaryColor} !important;}`, ".register-confirm{color:#666666;}", "@media(min-width:765px){.aling-items{margin-left:25%;}}", `@media(max-width:765px){.responsive{padding:0px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.card-body{background-image:url()!important;}label{display:inline-block;margin-bottom:.5rem;text-align:center;}.justify-content-end{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center!important;-webkit-justify-content:center!important;-ms-flex-pack:center!important;justify-content:center!important;}form{padding:0px!important;}.row{display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;margin-right:0px;margin-left:0px;}.col-8{max-width:100%!important;}.text-primary{color:${primaryColor} !important;}}`, `.text-primary{color:${primaryColor} !important;}`]));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_components_withAuth__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(UserAddressForm, true));

/***/ }),

/***/ "p3Ei":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./components/layout/AuthModal/FormGroup.js
var FormGroup = __webpack_require__("DKqL");

// EXTERNAL MODULE: ./components/Form/Label.js
var Label = __webpack_require__("Y54+");

// EXTERNAL MODULE: ./components/layout/AuthModal/Input.js
var Input = __webpack_require__("1x2o");

// EXTERNAL MODULE: ./components/withAuth/index.js
var withAuth = __webpack_require__("gGgb");

// EXTERNAL MODULE: ./components/Select/Select.js
var Select = __webpack_require__("dSS1");

// EXTERNAL MODULE: ./components/Form/InvalidFeedback.js
var InvalidFeedback = __webpack_require__("fqU8");

// CONCATENATED MODULE: ./components/Form/SelectFormGroup.js

var __jsx = external_react_default.a.createElement;





const SelectFormGroup = ({
  error,
  label,
  list,
  listMapValue = null,
  loading,
  name,
  onChange,
  pluralLabel,
  requireds,
  value
}) => {
  return __jsx(FormGroup["a" /* default */], null, __jsx(Label["a" /* default */], {
    htmlFor: name
  }, label), __jsx(Select["a" /* default */], {
    id: name,
    name: name,
    onChange: onChange,
    required: requireds,
    value: value
  }, !list ? __jsx("option", {
    disabled: true,
    value: ""
  }, "Cargando...") : list.length ? __jsx(external_react_default.a.Fragment, null, __jsx("option", {
    disabled: true,
    value: ""
  }, "Selecciona tu ", label.toLowerCase()), list.map((item, key) => {
    const value = listMapValue ? item[listMapValue] : item;
    const optionName = listMapValue ? item.name : item;
    return __jsx("option", {
      key: key,
      value: value
    }, optionName);
  })) : __jsx("option", {
    disabled: true,
    value: ""
  }, "Incapaz de cargar ", pluralLabel)), __jsx(InvalidFeedback["a" /* default */], {
    error: error,
    loading: loading,
    name: name
  }));
};

/* harmony default export */ var Form_SelectFormGroup = (SelectFormGroup);
// CONCATENATED MODULE: ./pages/register/wizard/partials/address.js

var address_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const Address = ({
  api,
  error,
  handleInputChange,
  setValues,
  loading,
  requireds,
  values,
  formData,
  setFormData
}) => {
  // TODO: FIX hardcoded country configuration.
  const argCountryId = 11;
  const braCountryId = 32;
  const chlCountryId = 48; // Isso NÂO É uma boa prática. Deve ser mudado. Porém a estrutura de estado do app impede outra implementação.
  // let formDataHasProperties = formData.hasOwnProperty("country_id")
  //                             && formData.hasOwnProperty("address_1st_level")
  //                             && formData.hasOwnProperty("city")
  //                             && formData.hasOwnProperty("address_3rd_level")
  //                             && formData.hasOwnProperty("address");
  // const {
  //   country_id: countryId,
  //   address_1st_level,
  //   city,
  //   address_3rd_level,
  //   address
  // } = formData;
  // } = formDataHasProperties ? formData : values;

  const {
    0: countries,
    1: setCountries
  } = Object(external_react_["useState"])();
  const {
    0: selectedCountry,
    1: setSelectedCountry
  } = Object(external_react_["useState"])();
  Object(external_react_["useEffect"])(_ => {
    (async _ => {
      const {
        data
      } = await api.get("countries");
      setCountries(data);
    })();
  }, []);

  const handleCountryChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      [name]: value,
      address_1st_level: ""
    }));
  };

  const firstLevelLabel = formData.country_id == argCountryId ? "Provincia" : formData.country_id == braCountryId ? "Estado" : formData.country_id == chlCountryId ? "Región" : "State";
  const firstLevelPluralLabel = formData.country_id == argCountryId ? "Provincias" : formData.country_id == braCountryId ? "Estados" : formData.country_id == chlCountryId ? "Regiones" : "States";
  const {
    0: firstLevelList,
    1: setFirstLevelList
  } = Object(external_react_["useState"])();
  Object(external_react_["useEffect"])(_ => {
    const parsedCountryId = parseInt(formData.country_id); // debugger;

    if ([argCountryId, braCountryId, chlCountryId].includes(parsedCountryId)) {
      api.get("address-1st-levels", {
        params: {
          country_id: parsedCountryId
        }
      }).then(data => {
        setFirstLevelList(data.data);
      });
    } else {
      setFirstLevelList(null);
    }
  }, [formData.country_id]);
  const cityLabel = formData.country_id == braCountryId ? "Cidade" : formData.country_id == chlCountryId ? "Provincia" : "Ciudad";
  const thirdLevelLabel = formData.country_id == chlCountryId ? "Ciudad / Comuna" : "District";
  return address_jsx("div", {
    className: "address"
  }, address_jsx(Form_SelectFormGroup, {
    error: error,
    label: "Pa\xEDs",
    loading: loading,
    list: countries,
    listMapValue: "id",
    name: "country_id",
    onChange: handleCountryChange,
    pluralLabel: "Pa\xEDses",
    requireds: requireds,
    value: formData.country_id
  }), [argCountryId, braCountryId, chlCountryId].map(id => id + "").includes(formData.country_id) && address_jsx(Form_SelectFormGroup, {
    error: error,
    label: firstLevelLabel,
    loading: loading,
    list: firstLevelList,
    listMapValue: "id",
    name: "address_1st_level",
    onChange: handleInputChange,
    pluralLabel: firstLevelPluralLabel,
    requireds: requireds,
    value: formData.address_1st_level
  }), [braCountryId, chlCountryId].map(id => id + "").includes(formData.country_id) && address_jsx(FormGroup["a" /* default */], null, address_jsx(Label["a" /* default */], {
    htmlFor: "city"
  }, cityLabel), address_jsx(Input["a" /* default */], {
    id: "city",
    name: "city",
    onChange: handleInputChange,
    required: requireds,
    type: "text",
    value: formData.city
  }), address_jsx(InvalidFeedback["a" /* default */], {
    error: error,
    loading: loading,
    name: "city"
  })), [chlCountryId].map(id => id + "").includes(formData.country_id) && address_jsx(FormGroup["a" /* default */], null, address_jsx(Label["a" /* default */], {
    htmlFor: "address_3rd_level"
  }, thirdLevelLabel), address_jsx(Input["a" /* default */], {
    id: "address_3rd_level",
    name: "address_3rd_level",
    onChange: handleInputChange,
    required: requireds,
    type: "text",
    value: formData.address_3rd_level
  }), address_jsx(InvalidFeedback["a" /* default */], {
    error: error,
    loading: loading,
    name: "address_3rd_level"
  })), address_jsx(FormGroup["a" /* default */], null, address_jsx(Label["a" /* default */], {
    htmlFor: "address"
  }, "Direcci\xF3n"), address_jsx(Input["a" /* default */], {
    id: "address",
    name: "address",
    onChange: handleInputChange,
    required: requireds,
    type: "text",
    value: formData.address
  }), address_jsx(InvalidFeedback["a" /* default */], {
    error: error,
    loading: loading,
    name: "address"
  })));
};

/* harmony default export */ var address = __webpack_exports__["default"] = (Object(withAuth["a" /* default */])(Address, true));

/***/ }),

/***/ "rOcY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_URL; });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("rxnA");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vm/7");
var _config_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t("vm/7", 1);
// @ts-check
 // @ts-ignore


/**
 * @typedef AppsConfig
 * @type {object}
 * @property {string} appName - the Dale's app name.
 * @property {string} projectName - the Dale's app name.
 * @property {string} prefixAppName - the Dale's app name.
 * @property {string} suffixAppName - the Dale's app name.
 * @property {string} clubName - the club's name.
 * @property {string} fullClubName - the full club's name / registered etc.
 * @property {string} shortClubName - the club's nickname or short name.
 * @property {string} supportersAKA - how the supporters are called.
 * @property {string} color - the club's primary color.
 * @property {string} secondaryColor - the club's secondary color.
 * @property {string} site - the club's website.
 * @property {array} socialNetworks - club's social networks.
 * @property {string} googleAnalytics - analytics tracking code.
 * @property {string} apiUrl - project api URL.
 * @property {string} lang - project's main lang.
 * @property {string} loadingColor - the club's color that should for loading bar, "primary" or "secondary".
 * @property {string} backgroundColor - the project's background color.
 * @property {string} backgroundContrastColor - the project's lighter or contrastant color.
 * @property {string} backgroundContrastColor2 - used for secondary buttons and something like that.
 * @property {string} textColor - main text color.
 */

/** @type {AppsConfig} */

const CONFIG = _config_json__WEBPACK_IMPORTED_MODULE_1__[_constants_constants__WEBPACK_IMPORTED_MODULE_0__[/* TENANT */ "g"]]; //

const API_URL = _constants_constants__WEBPACK_IMPORTED_MODULE_0__[/* IS_PRODUCTION */ "d"] ? CONFIG.apiUrl : _constants_constants__WEBPACK_IMPORTED_MODULE_0__[/* LOCAL_API_URL */ "e"];

/***/ }),

/***/ "rxnA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IS_BROWSER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HAS_WINDOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return TENANT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return STATIC_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return IS_PRODUCTION; });
/* unused harmony export ONLINE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CLIENT_SECRET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLIENT_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LOCAL_API_URL; });
/* unused harmony export HTTP_PROTOCOL */
// @ts-check
if (false) {}
/**
 * @constant
 * @type {boolean}
 * @returns {boolean}
 */


const IS_BROWSER = false;
/**
 * @constant
 * @type {boolean}
 * @returns {boolean}
 */

const HAS_WINDOW = IS_BROWSER;
/**
 * @constant
 * @type {string}
 * @returns {string} "river", "dalecacique" etc.
 */

const TENANT = "lau";
const STATIC_PATH = `/static/${TENANT}`;
const IS_PRODUCTION = true;
const ONLINE = IS_PRODUCTION;
const CLIENT_SECRET = 'IxY0z1pn27XwHNeFD5mj34ok34uqbEa5cehhQza4';
const CLIENT_ID = 2;
const LOCAL_API_URL = process.env.API_URL || 'https://lau.dowhile.com.br';
/**
 * @constant
 * @type {string}
 * @returns {string} "https" or "http".
 */

const HTTP_PROTOCOL = IS_PRODUCTION ? 'https' : 'http';

/***/ }),

/***/ "vm/7":
/***/ (function(module) {

module.exports = JSON.parse("{\"colocolo\":{\"appName\":\"Colo-Colo\",\"clubName\":\"Colo-Colo\",\"fullClubName\":\"Club Social y Deportivo Colo-Colo\",\"shortClubName\":\"Colo-Colo\",\"supportersAKA\":\"Albos\",\"color\":\"#e12213\",\"secondaryColor\":\"#005d9c\",\"site\":\"//www.colocolo.cl/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/colocolo/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/colocolooficial/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/colocolo\"}],\"googleAnalytics\":null,\"apiUrl\":\"https://admin.rivermas.com\",\"lang\":\"es-CL\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#808080\",\"textColor\":\"#b2b2b2\"},\"dalecacique\":{\"appName\":\"Dale Cacique\",\"clubName\":\"Colo-Colo\",\"fullClubName\":\"Club Social y Deportivo Colo-Colo\",\"shortClubName\":\"Colo-Colo\",\"supportersAKA\":\"Albos\",\"color\":\"#e12213\",\"secondaryColor\":\"#005d9c\",\"site\":\"//www.colocolo.cl/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/colocolo/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/colocolooficial/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/colocolo\"}],\"googleAnalytics\":null,\"apiUrl\":\"https://admin.rivermas.com\",\"lang\":\"es-CL\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#808080\",\"textColor\":\"#b2b2b2\"},\"river\":{\"appName\":\"River Mas\",\"clubName\":\"River Plate\",\"fullClubName\":\"Club Atlético River Plate\",\"shortClubName\":\"River\",\"supportersAKA\":\"RiverPlatenses\",\"color\":\"#ff0000\",\"secondaryColor\":\"#fff\",\"site\":\"https://www.cariverplate.com.ar/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/riverplateoficial/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/riverplate/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/RiverPlate\"}],\"googleAnalytics\":\"UA-146274840-2\",\"apiUrl\":\"https://admin.rivermas.com\",\"lang\":\"es\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#808080\",\"textColor\":\"#b2b2b2\"},\"lau\":{\"appName\":\"La U Play\",\"projectName\":\"La U Play\",\"clubName\":\"Universidad de Chile\",\"fullClubName\":\"Club Universidad de Chile\",\"shortClubName\":\"La U\",\"prefixAppName\":\"La U\",\"suffixAppName\":\"Play\",\"supportersAKA\":\"Universitários\",\"color\":\"#D80000\",\"secondaryColor\":\"#000\",\"site\":\"https://www.udechile.cl/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/ClubUniversidadDeChileOficial\"},{\"name\":\"Instagram\",\"link\":\"https://instagram.com/udechileoficial\"},{\"name\":\"Twitter\",\"link\":\"https://www.twitter.com/udechile\"}],\"googleAnalytics\":\"UA-146274840-3\",\"apiUrl\":\"https://lau.dowhile.com.br\",\"lang\":\"es-CL\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000c33\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#293989\",\"textColor\":\"#bec3db\"},\"atlnacional\":{\"appName\":\"Nacional Play\",\"clubName\":\"Atlético Nacional\",\"fullClubName\":\"Atlético Nacional\",\"shortClubName\":\"Atl. Nacional\",\"supportersAKA\":\"Atl Nacional\",\"color\":\"#008C3E\",\"secondaryColor\":\"#000\",\"site\":\"https://www.atlnacional.com.co/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/nacionaloficial/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/nacionaloficial/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/nacionaloficial\"}],\"googleAnalytics\":\"\",\"apiUrl\":\"https://atlnacional.dowhile.com.br\",\"lang\":\"es-Co\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#000\",\"backgroundContrastColor2\":\"#005a26\",\"textColor\":\"#c5dbbe\"},\"independiente\":{\"appName\":\"Club Atlético Independiente\",\"clubName\":\"Club Atlético Independiente\",\"fullClubName\":\"Independiente\",\"shortClubName\":\"Independiente\",\"supportersAKA\":\"Independiente\",\"color\":\"#ec1c24\",\"secondaryColor\":\"#000\",\"site\":\"http://www.clubaindependiente.com/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/Independiente/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/caindependiente/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/independiente\"}],\"googleAnalytics\":\"\",\"apiUrl\":\"https://independiente.dowhile.com.br\",\"lang\":\"es-AR\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000000\",\"backgroundContrastColor\":\"#000000\",\"backgroundContrastColor2\":\"#99090D\",\"textColor\":\"#ffffff\"}}");

/***/ }),

/***/ "zlq/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rOcY");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
// import { useContext, useEffect, useState } from "react";
// import SearchContext from '~/contexts/SearchContext'
 // function LogoApp() {
//   const { search, setSearch } = useContext(SearchContext);
//   const [link, setLink] = useState('https://laumas.s3.sa-east-1.amazonaws.com');
//   const [images, setImage] = useState([{ id: '1' }]);
// }

function NameProject() {
  if (_config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].prefixAppName) {
    return __jsx("div", {
      style: {
        display: 'inline-block'
      }
    }, "La ", __jsx("strong", {
      className: "text-primary"
    }, "U"), " ", _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].suffixAppName);
  } else if (_config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].projectName) {
    return __jsx("div", {
      style: {
        display: 'inline-block'
      }
    }, __jsx("strong", {
      className: "text-primary"
    }, _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].projectName.split(' ')[0], " ", _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].projectName.split(' ')[1], " "), _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].projectName.split(' ')[2]);
  } else if (_config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].appName) {
    return __jsx("div", {
      style: {
        display: 'inline-block'
      }
    }, __jsx("strong", {
      className: "text-primary"
    }, _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].appName.split(' ')[0], " ", _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].appName.split(' ')[1], " "), _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].appName.split(' ')[2]);
  }

  return __jsx("div", {
    style: {
      display: 'inline-block'
    }
  }, __jsx("strong", {
    className: "text-primary"
  }, "Project"), "Name!");
}

/* harmony default export */ __webpack_exports__["a"] = (NameProject);

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });
//# sourceMappingURL=user-address.js.map