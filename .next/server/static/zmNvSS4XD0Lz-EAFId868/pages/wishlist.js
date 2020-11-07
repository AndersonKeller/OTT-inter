module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/a9y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _head = _interopRequireDefault(__webpack_require__("UlpK"));

const statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error'
};

function _getInitialProps({
  res,
  err
}) {
  const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
  return {
    statusCode
  };
}
/**
* `Error` component used for handling errors.
*/


class Error extends _react.default.Component {
  render() {
    const {
      statusCode
    } = this.props;
    const title = this.props.title || statusCodes[statusCode] || 'An unexpected error has occurred';
    return /*#__PURE__*/_react.default.createElement("div", {
      style: styles.error
    }, /*#__PURE__*/_react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("title", null, statusCode, ": ", title)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: 'body { margin: 0 }'
      }
    }), statusCode ? /*#__PURE__*/_react.default.createElement("h1", {
      style: styles.h1
    }, statusCode) : null, /*#__PURE__*/_react.default.createElement("div", {
      style: styles.desc
    }, /*#__PURE__*/_react.default.createElement("h2", {
      style: styles.h2
    }, title, "."))));
  }

}

exports.default = Error;
Error.displayName = 'ErrorPage';
Error.getInitialProps = _getInitialProps;
Error.origGetInitialProps = _getInitialProps;
const styles = {
  error: {
    color: '#000',
    background: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle'
  },
  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top'
  },
  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0
  }
};

/***/ }),

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

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

/***/ "2yjL":
/***/ (function(module, exports) {

module.exports = require("react-icons/io");

/***/ }),

/***/ "3YKB":
/***/ (function(module, exports) {

module.exports = require("color");

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("7d3W");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "4Qjr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


/* harmony default export */ __webpack_exports__["a"] = (({
  category,
  children,
  media,
  watch
}) => {
  const optionalWatch = watch ? `/watch` : '';
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_0___default.a, {
    as: `/media/${media.slug}` + optionalWatch,
    href: {
      pathname: '/media/[slug]' + optionalWatch,
      query: {
        category: category ? category.slug : null,
        slug: media.slug
      }
    },
    passHref: true
  }, children);
});

/***/ }),

/***/ "5mtF":
/***/ (function(module, exports) {

module.exports = require("react-icons/fa");

/***/ }),

/***/ "6ICi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3YKB");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SibU");
/* harmony import */ var react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_go__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("9yvl");
/* harmony import */ var react_icons_go__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_go__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("2yjL");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_icons_io__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Ib8v");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("FHnF");
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("gdJV");
/* harmony import */ var _contexts_AuthModalContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("d5Q9");
/* harmony import */ var _lib_gtag__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("M09o");
/* harmony import */ var _icons_chevron__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("SSxu");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("rxnA");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;














/* harmony default export */ __webpack_exports__["a"] = (() => {
  const {
    signOut,
    user
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_10__[/* default */ "b"]);
  const {
    closeAuthModal,
    openAuthModal
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_AuthModalContext__WEBPACK_IMPORTED_MODULE_11__[/* AuthModalContext */ "a"]);
  const loggedMenu = [{
    slug: 'add',
    label: 'Mi Lista',
    href: '/wishlist'
  }, {
    slug: 'user',
    label: 'Mi Cuenta',
    href: '/user/account'
  }, // { slug: 'settings', label: 'Configuración', href: '/settings' },
  {
    slug: 'help',
    label: 'Ayuda',
    href: '/help'
  }, // { slug: 'info', label: 'Soporte', href: '/soporte' },
  {
    slug: 'logout',
    label: 'Salir',
    href: '/logout',
    onClick: logout
  }];

  function getUserName() {
    const nameArray = user.name.split(' ');
    const userName = nameArray.length > 1 ? `${nameArray[0]} ${nameArray[nameArray.length - 1]}` : nameArray.join('');
    return userName;
  }

  function enter(e) {
    e.preventDefault(); // this is just a test, we should change it later:

    _lib_gtag__WEBPACK_IMPORTED_MODULE_12__[/* event */ "b"]({
      action: 'submit_form',
      category: 'Contact',
      label: 'Message here'
    });
    openAuthModal();
  }

  function logout(e) {
    e.preventDefault();
    signOut();
    closeAuthModal();
  }

  const theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_9__["ThemeContext"]);
  const backgroundColor1 = theme.colors.backgroundContrast2;
  const backgroundColor2 = theme.colors.backgroundContrast;
  const backgroundColor2Hover = color__WEBPACK_IMPORTED_MODULE_2___default()(backgroundColor2).darken(.2).hsl().string();
  const blackColor = color__WEBPACK_IMPORTED_MODULE_2___default()(theme.colors.black);
  const shadowColor = blackColor.fade(.7).hsl().string();
  const lightColor = theme.colors.texts;
  const whiteColor = theme.colors.white;
  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]]) + " " + `user-select ${user ? 'logged' : ''}`
  }, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a, {
    alignRight: true,
    drop: "down",
    flip: undefined
  }, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Toggle, {
    id: "dropdown-custom-user"
  }, __jsx(Avatar, {
    image: user && user.cropped_image_url ? user.cropped_image_url : null
  }), __jsx(_icons_chevron__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    alt: "",
    className: "chevron d-none d-md-inline",
    dir: "bottom",
    height: "9",
    inline: true,
    width: "16"
  })), user ? __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Menu, null, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Header, null, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]]) + " " + "user-name"
  }, getUserName()), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]]) + " " + "user-email"
  }, user.email)), loggedMenu.map(({
    href,
    label,
    onClick,
    slug
  }, key) => __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: href,
    key: key,
    passHref: true
  }, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Item, {
    className: "dropdown-item-style3",
    onClick: onClick
  }, __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]]) + " " + "icon"
  }, slug === 'add' ? __jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_6__["IoMdAddCircle"], {
    size: 24
  }) : slug === 'help' ? __jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_6__["IoIosHelpCircle"], {
    size: 24
  }) : slug === 'user' ? __jsx(react_icons_go__WEBPACK_IMPORTED_MODULE_5__["GoPerson"], {
    size: 24
  }) : slug === 'logout' ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_7__["RiLogoutBoxRLine"], {
    size: 24
  }) : __jsx("img", {
    src: `/static/icons/${slug}.svg`,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]]) + " " + `img-fluid ${slug}`
  })), __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]])
  }, label)))))) : __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Menu, null, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Item, {
    as: "button",
    className: "dropdown-item-style1",
    onClick: enter
  }, "Entrar"), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: _constants_constants__WEBPACK_IMPORTED_MODULE_14__[/* TENANT */ "g"] === 'lau' ? "/subscriptor" : "/signup"
  }, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Item, {
    className: "dropdown-item-style2",
    href: "/signup"
  }, "Suscripci\xF3n")), __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Divider, null), __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Item, {
    className: "dropdown-item-style3",
    href: "/help"
  }, __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]]) + " " + "icon"
  }, __jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_6__["IoIosHelpCircle"], {
    size: 24
  })), __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["3193758049", [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]]])
  }, "Ayuda")))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3193758049",
    dynamic: [lightColor, lightColor, whiteColor, whiteColor, shadowColor, backgroundColor1, whiteColor, backgroundColor2, lightColor, backgroundColor2Hover, whiteColor, backgroundColor2, shadowColor, whiteColor]
  }, [".user-select.__jsx-style-dynamic-selector{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;}", "@media (min-width:768px){.user-select.__jsx-style-dynamic-selector{margin-right:-15px;}}", ".user-select.__jsx-style-dynamic-selector .dropdown-toggle{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:transparent !important;border:0;box-shadow:none !important;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:5px;}", "@media (min-width:768px){.user-select.__jsx-style-dynamic-selector .dropdown-toggle{padding-right:15px;padding-left:15px;}}", ".user-select.__jsx-style-dynamic-selector .dropdown-toggle::after{display:none;}", `.user-select.__jsx-style-dynamic-selector .dropdown-toggle .avatar{background-color:${lightColor};}`, ".user-select.__jsx-style-dynamic-selector .dropdown-toggle .chevron{line-height:1;}", `.user-select.__jsx-style-dynamic-selector .dropdown-toggle .chevron path{fill:${lightColor};-webkit-transition:ease .2s;transition:ease .2s;}`, `.user-select.__jsx-style-dynamic-selector .dropdown-toggle:focus .avatar,.user-select.__jsx-style-dynamic-selector .dropdown-toggle:hover .avatar{background-color:${whiteColor};-webkit-transition:background-color .2s;transition:background-color .2s;}`, `.user-select.__jsx-style-dynamic-selector .dropdown-toggle:focus .chevron path,.user-select.__jsx-style-dynamic-selector .dropdown-toggle:hover .chevron path{fill:${whiteColor};}`, `.user-select.__jsx-style-dynamic-selector .dropdown-menu{background-color:#808080;box-shadow:0 2px 5px ${shadowColor};border:0;border-radius:5px;margin-top:5px;max-width:unset;padding-top:5px;padding-bottom:0;}`, `.user-select.__jsx-style-dynamic-selector .dropdown-menu::before{border:13px solid transparent;border-top:0;border-bottom:12px solid ${backgroundColor1};bottom:100%;content:'';display:block;position:absolute;right:10px;}`, `.user-select.__jsx-style-dynamic-selector .dropdown-item{color:${whiteColor};}`, ".user-select.__jsx-style-dynamic-selector .dropdown-item:focus,.user-select.__jsx-style-dynamic-selector .dropdown-item:hover{background-color:transparent;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style1{font-family:var(--sans-serif-condensed);font-size:20px;font-weight:bold;margin-top:10px;margin-bottom:10px;outline:0;text-align:center;-webkit-transition:background-color .2s;transition:background-color .2s;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style1:focus,.user-select.__jsx-style-dynamic-selector .dropdown-item-style1:hover{background-color:rgba(var(--black-rgb),.2);}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style2{background-color:var(--primary);border-radius:5px;font-family:var(--sans-serif-condensed);font-size:20px;font-weight:bold;line-height:1.25;margin:10px 15px 15px;padding-right:25px;padding-left:25px;text-align:center;-webkit-transition:background-color .2s;transition:background-color .2s;width:auto;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style2:focus,.user-select.__jsx-style-dynamic-selector .dropdown-item-style2:hover{background-color:var(--primary-hover);}", ".user-select.__jsx-style-dynamic-selector .dropdown-divider{border-top:0;margin-bottom:0;}", ".user-select.__jsx-style-dynamic-selector .dropdown-divider~.dropdown-item{background-color:#333333;}", `.user-select.__jsx-style-dynamic-selector .dropdown-item-style3{background-color:${backgroundColor2};color:${lightColor};padding:7.5px 25px;-webkit-transition:background-color .2s,color .2s;transition:background-color .2s,color .2s;vertical-align:middle;}`, ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3>span.__jsx-style-dynamic-selector{vertical-align:middle;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector{display:inline-block;margin-right:15px;width:30px;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector img.__jsx-style-dynamic-selector{margin-right:auto;margin-left:auto;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector .add.__jsx-style-dynamic-selector{height:20px;width:20px;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector .user.__jsx-style-dynamic-selector{height:20px;width:15px;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector .settings.__jsx-style-dynamic-selector{height:26px;width:26px;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector .help.__jsx-style-dynamic-selector{height:24px;width:24px;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector .info.__jsx-style-dynamic-selector{height:27px;width:27px;}", ".user-select.__jsx-style-dynamic-selector .dropdown-item-style3 .icon.__jsx-style-dynamic-selector .logout.__jsx-style-dynamic-selector{height:19px;width:19px;}", `.user-select.__jsx-style-dynamic-selector .dropdown-item-style3:focus,.user-select.__jsx-style-dynamic-selector .dropdown-item-style3:hover{background-color:${backgroundColor2Hover};color:${whiteColor};}`, `.user-select.logged.__jsx-style-dynamic-selector .dropdown-menu{background-color:${backgroundColor2};box-shadow:0 2px 5px ${shadowColor};padding-top:0;padding-bottom:5px;}`, ".user-select.logged.__jsx-style-dynamic-selector .dropdown-menu::before{border-bottom-color:var(--primary);}", `.user-select.logged.__jsx-style-dynamic-selector .dropdown-header{background-color:var(--primary);border-radius:5px;color:${whiteColor};line-height:1;padding:15px 30px 20px;text-align:center;}`, ".user-select.logged.__jsx-style-dynamic-selector .dropdown-header .user-name.__jsx-style-dynamic-selector{font-family:var(--sans-serif-condensed);font-size:20px;font-weight:bold;line-height:1;margin-bottom:5px;}", ".user-select.logged.__jsx-style-dynamic-selector .dropdown-header .user-email.__jsx-style-dynamic-selector{font-size:12px;}"]));
});

const Avatar = ({
  image
}) => {
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_9__["ThemeContext"]);
  const avatarColor = theme.colors.background;
  const lightColor = theme.colors.texts;
  return __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["33661235", [lightColor, avatarColor]]]) + " " + ('avatar' + (!image ? ' avatar--empty' : '') || false)
  }, !image ? __jsx(react_svg__WEBPACK_IMPORTED_MODULE_8___default.a, {
    fallback: "Avatar",
    src: "/static/icons/user.svg",
    wrapper: "span"
  }) : __jsx("img", {
    alt: "Avatar",
    height: "30",
    src: image,
    width: "30",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["33661235", [lightColor, avatarColor]]]) + " " + "img-fluid"
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "33661235",
    dynamic: [lightColor, avatarColor]
  }, [`.avatar.__jsx-style-dynamic-selector{background-clip:padding-box;background-color:${lightColor};border-radius:50%;height:30px;margin:2.5px;overflow:hidden;-webkit-transition:background-color .2s;transition:background-color .2s;width:30px;}`, ".avatar--empty.__jsx-style-dynamic-selector>span{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:100%;padding:25%;width:100%;}", ".avatar--empty.__jsx-style-dynamic-selector svg{display:block;height:100%;width:100%;}", `.avatar--empty.__jsx-style-dynamic-selector path{fill:${avatarColor};}`, "@media (min-width:768px){.avatar.__jsx-style-dynamic-selector{height:38px;margin-right:10px;width:38px;}}"]));
};

/***/ }),

/***/ "6tnH":
/***/ (function(module, exports) {

module.exports = require("react-spinners/ClipLoader");

/***/ }),

/***/ "7KCV":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("C+bE");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "7NIq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("K2gz");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





/* harmony default export */ __webpack_exports__["a"] = ((_ref) => {
  let {
    as,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["as", "children"]);

  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const child = react__WEBPACK_IMPORTED_MODULE_3__["Children"].only(children);
  const active = !as ? router.pathname === props.href : router.asPath === as;
  const classes = classnames__WEBPACK_IMPORTED_MODULE_0___default()(child.props.className, {
    active: active
  });
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, _extends({
    as: as
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.cloneElement(child, {
    active: `${active}`,
    className: classes
  }));
});

/***/ }),

/***/ "7d3W":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("80PL");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rOcY");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2MRG");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("jlXy");
/* harmony import */ var _components_MediaList_MediaList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("tNAg");
/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("a3/r");
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("gdJV");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_10__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;
// next imports
 // react imports

 // app imports








 // wishlist page

const WishlistPage = ({
  layoutProps
}) => {
  const {
    0: medias,
    1: setMedias
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])();
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])();
  const {
    user
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_9__[/* default */ "b"]);
  /* temporarily handle user presence */

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
    const timeout = setTimeout(_ => {
      if (!user) {
        next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/login');
      }
    }, 1000);
    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [user]);

  const fetchData = async _ => {
    setLoading(true);

    try {
      const {
        data: medias
      } = await Object(_services_api__WEBPACK_IMPORTED_MODULE_5__[/* default */ "b"])().get('/wishlist');
      setMedias(medias);
    } catch (e) {
      setError(500);
    }

    setLoading(false);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
    fetchData();
  }, []);
  return __jsx(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], layoutProps, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx("title", {
    className: "jsx-373446342"
  }, "Mi lista < ", _config__WEBPACK_IMPORTED_MODULE_4__[/* CONFIG */ "b"].appName)), __jsx("div", {
    className: "jsx-373446342" + " " + "container-fluid"
  }, __jsx("div", {
    className: "jsx-373446342" + " " + "row"
  }, __jsx("div", {
    className: "jsx-373446342" + " " + "col-md-10 offset-md-1"
  }, __jsx("header", {
    className: "jsx-373446342"
  }, __jsx("h1", {
    className: "jsx-373446342" + " " + "h2"
  }, "Mi lista")), __jsx(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    loadingState: loading
  }), !loading && medias && medias.length === 0 && __jsx("div", {
    className: "jsx-373446342"
  }, __jsx("div", {
    className: "jsx-373446342" + " " + "info"
  }, __jsx("p", {
    className: "jsx-373446342"
  }, "A\xFAn no hay videos en tu lista.")), __jsx(_components_button__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    href: "/movies"
  }, "Agregar videos")), !loading && error && !medias && __jsx("p", {
    className: "jsx-373446342"
  }, error), !loading && !error && medias && medias.length >= 1 && __jsx(_components_MediaList_MediaList__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    medias,
    wishlist: true
  })))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "373446342"
  }, ["header.jsx-373446342{padding-top:15px;}", ".h2.jsx-373446342{margin-bottom:30px;}", ".info.jsx-373446342{margin-bottom:30px;}", "@media (min-width:768px){header.jsx-373446342{padding-top:30px;}}"]));
};

/* harmony default export */ __webpack_exports__["default"] = (WishlistPage);

/***/ }),

/***/ "80PL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__("HJQg");
var style_default = /*#__PURE__*/__webpack_require__.n(style_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "nookies"
var external_nookies_ = __webpack_require__("kG9d");
var external_nookies_default = /*#__PURE__*/__webpack_require__.n(external_nookies_);

// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__("oAEb");

// EXTERNAL MODULE: external "color"
var external_color_ = __webpack_require__("3YKB");
var external_color_default = /*#__PURE__*/__webpack_require__.n(external_color_);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./components/MediaLink/MediaLink.js
var MediaLink = __webpack_require__("4Qjr");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: external "react-icons/go"
var go_ = __webpack_require__("9yvl");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: ./config/index.js
var config = __webpack_require__("rOcY");

// EXTERNAL MODULE: ./constants/constants.js
var constants = __webpack_require__("rxnA");

// EXTERNAL MODULE: ./contexts/SearchContext.js
var SearchContext = __webpack_require__("d36P");

// EXTERNAL MODULE: ./components/ActiveLink.js
var ActiveLink = __webpack_require__("7NIq");

// EXTERNAL MODULE: ./components/LogoClub/index.js
var LogoClub = __webpack_require__("RmiK");

// EXTERNAL MODULE: ./components/layout/DesktopMenu.js
var DesktopMenu = __webpack_require__("pLwp");

// EXTERNAL MODULE: ./components/layout/UserMenu.js
var UserMenu = __webpack_require__("6ICi");

// EXTERNAL MODULE: ./components/LogoApp/index.js
var LogoApp = __webpack_require__("USah");

// CONCATENATED MODULE: ./components/layout/Header.js

var __jsx = external_react_default.a.createElement;






 // import AppLogo from '~/components/AppLogo'









const StyledHeader = external_styled_components_default.a.header.withConfig({
  displayName: "Header__StyledHeader",
  componentId: "sc-1klswi8-0"
})(["background-color:", ";box-shadow:0 0 5px rgba(var(--black-rgb),", ");color:", ";font-family:var(--sans-serif);font-size:16px;font-weight:bold;min-width:100%;padding:10px;position:", ";transition:", ";width:90%;z-index:10;@media (min-width:768px){padding:10px 30px;}"], props => props.closed ? 'var(--background)' : props.scrolled ? external_color_default()(props.theme.colors.background).fade(.1).string() : props.layoutColor === 'white' ? props.theme.colors.background : 'transparent', props => props.layoutColor !== 'white' && props.scrolled ? '.9' : '0', props => props.theme.colors.texts, props => props.closed ? 'static' : 'fixed', props => props.closed ? 'background-color .3s, box-shadow .3s' : 'background-color .6s, box-shadow .6s');

const Header = ({
  closed,
  layoutColor,
  menus,
  media
}) => {
  const hasWindow = false; // scrolled state

  const hasScrolled = _ => {
    return hasWindow ? window.pageYOffset > 1 : false;
  };

  const {
    0: scrolled,
    1: setScrolled
  } = Object(external_react_["useState"])(hasScrolled());
  Object(external_react_["useEffect"])(_ => {
    const handleScroll = _ => {
      setScrolled(hasScrolled());
    };

    window.addEventListener('scroll', handleScroll);
    return _ => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const router = Object(router_["useRouter"])();
  const searchField = Object(external_react_["useRef"])(null);
  const {
    setSearch
  } = Object(external_react_["useContext"])(SearchContext["b" /* default */]);
  const {
    0: searchFieldValue,
    1: setSearchFieldValue
  } = Object(external_react_["useState"])('');

  function handleSearchBtnFocus(e) {
    e.preventDefault();
    searchField.current.focus();
  }

  function handleSearchBtnClick(e) {
    if (!searchFieldValue) {
      e.preventDefault();
    }
  }

  function handleSearchFieldChange(e) {
    setSearchFieldValue(e.target.value);
    /* optional: */
    // setSearch(e.target.value)
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearch(searchFieldValue);
    setSearchFieldValue('');

    if (router.pathname !== '/movies') {
      router.push('/movies');
    }
  }

  const theme = Object(external_react_["useContext"])(external_styled_components_["ThemeContext"]);
  const whiteColor = theme.colors.white;
  const lightColor = theme.colors.texts;
  return __jsx(StyledHeader, {
    closed: closed,
    layoutColor: layoutColor,
    scrolled: scrolled,
    media: media
  }, __jsx("nav", {
    className: style_default.a.dynamic([["126304526", [closed ? 'center' : 'space-between', whiteColor, lightColor, lightColor]]]) + " " + "nav"
  }, !closed && constants["g" /* TENANT */] !== 'lau' && __jsx(HeaderClubLogo, null), __jsx(HeaderAppLogo, {
    closed: closed,
    media: media
  }), !closed && __jsx(external_react_default.a.Fragment, null, __jsx(DesktopMenu["a" /* default */], {
    data: menus
  }), __jsx("form", {
    action: "/movies",
    method: "get",
    onSubmit: handleSearchSubmit,
    className: style_default.a.dynamic([["126304526", [closed ? 'center' : 'space-between', whiteColor, lightColor, lightColor]]]) + " " + "d-none d-lg-block search-form"
  }, __jsx("button", {
    id: "search-btn",
    onClick: handleSearchBtnClick,
    onFocus: handleSearchBtnFocus,
    type: "submit",
    className: style_default.a.dynamic([["126304526", [closed ? 'center' : 'space-between', whiteColor, lightColor, lightColor]]]) + " " + "search-btn"
  }, __jsx(go_["GoSearch"], {
    color: "inherit",
    size: 28,
    title: "Buscar"
  })), __jsx("input", {
    id: "search",
    name: "search",
    onChange: handleSearchFieldChange,
    placeholder: "Buscar",
    ref: searchField,
    type: "search",
    value: searchFieldValue,
    className: style_default.a.dynamic([["126304526", [closed ? 'center' : 'space-between', whiteColor, lightColor, lightColor]]]) + " " + "form-control"
  })), __jsx(UserMenu["a" /* default */], null))), __jsx(style_default.a, {
    id: "126304526",
    dynamic: [closed ? 'center' : 'space-between', whiteColor, lightColor, lightColor]
  }, [`.nav.__jsx-style-dynamic-selector{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:${closed ? 'center' : 'space-between'};-webkit-justify-content:${closed ? 'center' : 'space-between'};-ms-flex-pack:${closed ? 'center' : 'space-between'};justify-content:${closed ? 'center' : 'space-between'};}`, `.form-control.__jsx-style-dynamic-selector{background-color:transparent;border:0;display:inline-block;color:${whiteColor};font-family:inherit;font-size:inherit;font-weight:inherit;outline:0;padding:0;-webkit-transition:ease .6s;transition:ease .6s;vertical-align:middle;width:0;}`, ".form-control.__jsx-style-dynamic-selector:focus{box-shadow:0 0 0 .1rem var(--primary);margin-right:10px;padding:0 10px;width:15vw;}", `.form-control.__jsx-style-dynamic-selector::-webkit-input-placeholder{color:${lightColor};}`, `.form-control.__jsx-style-dynamic-selector::-moz-placeholder{color:${lightColor};}`, `.form-control.__jsx-style-dynamic-selector:-ms-input-placeholder{color:${lightColor};}`, `.form-control.__jsx-style-dynamic-selector::placeholder{color:${lightColor};}`, ".search-form.__jsx-style-dynamic-selector{margin-left:auto;}", `.search-btn.__jsx-style-dynamic-selector{background-color:transparent;border:0;color:${lightColor};cursor:pointer;margin-right:10px;outline:0;padding:5px;vertical-align:middle;}`, ".search-btn.__jsx-style-dynamic-selector svg{-webkit-transition:color .2s;transition:color .2s;}", ".search-btn.__jsx-style-dynamic-selector:focus,.search-btn.__jsx-style-dynamic-selector:hover{color:var(--white);}", ".notifications-btn.__jsx-style-dynamic-selector{background-color:transparent;border:0;cursor:pointer;outline:0;margin-right:10px;padding:5px;vertical-align:middle;}"]));
};

const HeaderClubLogo = _ => {
  return __jsx("div", {
    className: "jsx-3499172547" + " " + "club-logo"
  }, __jsx(link_default.a, {
    href: "/"
  }, __jsx(LogoClub["a" /* default */], null)), __jsx(style_default.a, {
    id: "3499172547"
  }, [".club-logo.jsx-3499172547{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:45px;padding:5px;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:45px;}", ".club-logo.jsx-3499172547 a.jsx-3499172547{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}", "@media (min-width:768px){.club-logo.jsx-3499172547{height:55px;margin-right:5px;width:55px;}}"]));
};

const HeaderAppLogo = ({
  closed,
  media
}) => {
  return __jsx("h1", {
    className: style_default.a.dynamic([["574476306", [closed ? 0 : '20px']]]) + " " + "logo"
  }, __jsx(link_default.a, {
    href: media && media.video_file ? `/media/${media.slug}/watch` : '/'
  }, __jsx("a", {
    className: style_default.a.dynamic([["574476306", [closed ? 0 : '20px']]])
  }, __jsx(LogoApp["a" /* default */], {
    height: constants["g" /* TENANT */] === 'lau' ? 30 : constants["g" /* TENANT */] === 'river' ? 22 : 25
  }))), __jsx(style_default.a, {
    id: "574476306",
    dynamic: [closed ? 0 : '20px']
  }, [".logo.__jsx-style-dynamic-selector{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:-5px;margin-bottom:-5px;}", ".logo.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;padding:5px;}", `@media (min-width:768px){.logo.__jsx-style-dynamic-selector{margin-right:${closed ? 0 : '20px'};}}`]));
};

/* harmony default export */ var layout_Header = (Header);
// EXTERNAL MODULE: ./components/layout/Footer.js
var Footer = __webpack_require__("cFkv");

// EXTERNAL MODULE: ./services/api.js
var services_api = __webpack_require__("2MRG");

// CONCATENATED MODULE: ./lib/load-menus.js

async function loadMenus(ctx) {
  const response = await Object(services_api["b" /* default */])(ctx).get('/menus');
  const data = response.data;
  return data;
}
// EXTERNAL MODULE: external "react-bootstrap/Modal"
var Modal_ = __webpack_require__("qqGZ");
var Modal_default = /*#__PURE__*/__webpack_require__.n(Modal_);

// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__("IZS3");

// EXTERNAL MODULE: ./contexts/AuthModalContext.js
var AuthModalContext = __webpack_require__("d5Q9");

// EXTERNAL MODULE: ./contexts/UserContext.js
var UserContext = __webpack_require__("gdJV");

// EXTERNAL MODULE: ./services/auth.js
var auth = __webpack_require__("I83c");

// EXTERNAL MODULE: ./components/layout/AuthModal/FormGroup.js
var FormGroup = __webpack_require__("DKqL");

// EXTERNAL MODULE: ./components/layout/AuthModal/Input.js
var Input = __webpack_require__("1x2o");

// CONCATENATED MODULE: ./components/layout/AuthModal/FormText.js


var FormText_jsx = external_react_default.a.createElement;

const FormText = ({
  children
}) => {
  return FormText_jsx("div", {
    className: "jsx-3369782727" + " " + "form-text text-center"
  }, children, FormText_jsx(style_default.a, {
    id: "3369782727"
  }, [".form-text.jsx-3369782727{font-size:14px;}", ".form-text.jsx-3369782727 a{color:inherit;}"]));
};

/* harmony default export */ var AuthModal_FormText = (FormText);
// EXTERNAL MODULE: ./components/button.js
var components_button = __webpack_require__("a3/r");

// EXTERNAL MODULE: ./components/layout/AuthModal/SocialButtons.js
var SocialButtons = __webpack_require__("b5fN");

// EXTERNAL MODULE: ./components/layout/AuthModal/OrEnterWith.js
var OrEnterWith = __webpack_require__("sbNV");

// CONCATENATED MODULE: ./components/layout/AuthModal/LoginTab.js

var LoginTab_jsx = external_react_default.a.createElement;














 // import Router from "next/router";

const LoginTab = ({
  changeTab,
  setLoading,
  socialLogin
}) => {
  const router = Object(router_["useRouter"])();
  const {
    0: email,
    1: setEmail
  } = Object(external_react_["useState"])('');
  const {
    0: password,
    1: setPassword
  } = Object(external_react_["useState"])('');
  const {
    0: error,
    1: setError
  } = Object(external_react_["useState"])('');
  const {
    signIn
  } = Object(external_react_["useContext"])(UserContext["b" /* default */]);
  const {
    closeAuthModal,
    code,
    socialProvider
  } = Object(external_react_["useContext"])(AuthModalContext["a" /* AuthModalContext */]);

  const providerLogin = async _ => {
    try {
      setLoading(true);
      const {
        pkg_int_id: package_id_intention
      } = external_nookies_default.a.get({}, 'pkg_int_id');
      const tokenResponse = await Object(services_api["b" /* default */])().post(`auth/${socialProvider}/callback`, {
        code,
        client_id: constants["a" /* CLIENT_ID */],
        client_secret: constants["b" /* CLIENT_SECRET */],
        package_id_intention
      });
      const {
        access_token
      } = tokenResponse.data;
      Object(auth["e" /* setAccessToken */])(access_token);
      const userResponse = await Object(services_api["b" /* default */])().get('/user');
      setLoading(false);
      signIn(userResponse.data, tokenResponse.data);
      closeAuthModal();
    } catch (error) {
      console.table(error);
      setError('An error has occurred!');
      setLoading(false);
    }
  };

  Object(external_react_["useEffect"])(() => {
    if (code && socialProvider) providerLogin();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    document.activeElement.blur();

    try {
      const tokenResponse = await Object(services_api["b" /* default */])().post(`${services_api["a" /* baseURL */]}/oauth/token`, {
        grant_type: 'password',
        client_id: constants["a" /* CLIENT_ID */],
        client_secret: constants["b" /* CLIENT_SECRET */],
        username: email,
        password,
        scope: ''
      });
      const {
        access_token
      } = tokenResponse.data;
      Object(auth["e" /* setAccessToken */])(access_token);
      const userResponse = await Object(services_api["b" /* default */])().get('/user');
      signIn(userResponse.data, tokenResponse.data);
      closeAuthModal();
    } catch (error) {
      if (error.response) {
        const {
          data,
          status
        } = error.response;
        const message = status === 400 ? 'Correo electrónico o contraseña incorrectos. Inténtalo de nuevo' : status === 403 ? 'Tu dirección de correo electrónico no está verificada' : status === 500 ? 'Servidor, base de datos o conexión no disponible' : data.message;
        setError(message);
      } else {
        setError('An error has occurred!');
        console.log('error', error);
      }
    }

    setLoading(false);
  }

  function goToPasswordRecovery(e) {
    e.preventDefault();
    changeTab('password');
  }

  function goToRegister(e) {
    e.preventDefault();
    router.push({
      pathname: '/signup'
    }, '/signup');
  }

  const notRegistered = config["b" /* CONFIG */].lang === 'es-CL' ? '¿No estás suscrito?' : '¿No es suscriptor?';
  return LoginTab_jsx("div", null, LoginTab_jsx("div", {
    className: "intro-text"
  }, LoginTab_jsx("p", null, "\xA1Bienvenidos!")), LoginTab_jsx("form", {
    method: "post",
    onSubmit: handleSubmit
  }, error && LoginTab_jsx("div", {
    className: "invalid-feedback"
  }, error), LoginTab_jsx(FormGroup["a" /* default */], null, LoginTab_jsx(Input["a" /* default */], {
    id: "email",
    autoComplete: "username",
    placeholder: "E-mail",
    onChange: e => setEmail(e.target.value),
    required: true,
    type: "email",
    value: email
  })), LoginTab_jsx(FormGroup["a" /* default */], null, LoginTab_jsx(Input["a" /* default */], {
    id: "clave",
    autoComplete: "current-password",
    placeholder: "Clave",
    onChange: e => setPassword(e.target.value),
    required: true,
    type: "password",
    value: password
  }), LoginTab_jsx(AuthModal_FormText, null, LoginTab_jsx("a", {
    href: "#",
    onClick: goToPasswordRecovery
  }, "\xBFOlvidaste tu clave?"))), LoginTab_jsx(components_button["a" /* default */], {
    block: true,
    className: "enter-btn",
    size: "sm",
    type: "submit"
  }, "Entrar"), LoginTab_jsx("div", {
    className: "already-subscriptor"
  }, LoginTab_jsx("span", null, notRegistered), ' ', LoginTab_jsx("a", {
    className: "bold text-uppercase",
    href: "/signup"
  }, "Reg\xEDstrate!")), LoginTab_jsx(OrEnterWith["a" /* default */], null), LoginTab_jsx(SocialButtons["a" /* default */], {
    socialLogin: socialLogin
  })));
};

/* harmony default export */ var AuthModal_LoginTab = (LoginTab);
// EXTERNAL MODULE: ./constants/colors.js
var colors = __webpack_require__("rqZI");

// EXTERNAL MODULE: ./components/Loading/Loading.js
var Loading = __webpack_require__("jlXy");

// CONCATENATED MODULE: ./components/layout/AuthModal/ModalLoading.js


var ModalLoading_jsx = external_react_default.a.createElement;




const ModalLoading = _ => ModalLoading_jsx(external_react_default.a.Fragment, null, ModalLoading_jsx("div", {
  className: style_default.a.dynamic([["792870376", [external_color_default()(colors["c" /* WHITE */]).fade(.2)]]]) + " " + "modal-loading"
}, ModalLoading_jsx(Loading["a" /* default */], null)), ModalLoading_jsx(style_default.a, {
  id: "792870376",
  dynamic: [external_color_default()(colors["c" /* WHITE */]).fade(.2)]
}, [`.modal-loading.__jsx-style-dynamic-selector{background-color:${external_color_default()(colors["c" /* WHITE */]).fade(.2)};-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100%;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;left:0;padding-bottom:10%;position:absolute;top:0;width:100%;}`]));

/* harmony default export */ var AuthModal_ModalLoading = (ModalLoading);
// CONCATENATED MODULE: ./components/layout/AuthModal/PasswordTab.js

var PasswordTab_jsx = external_react_default.a.createElement;






const PasswordTab = ({
  setLoading
}) => {
  const {
    0: email,
    1: setEmail
  } = Object(external_react_["useState"])('');
  const {
    0: emailSent,
    1: setEmailSent
  } = Object(external_react_["useState"])(false);
  const {
    0: message,
    1: setMessage
  } = Object(external_react_["useState"])('');
  const {
    0: error,
    1: setError
  } = Object(external_react_["useState"])(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      let {
        data
      } = await Object(services_api["b" /* default */])().post('/forgot', {
        email
      });
      console.table(data);
      setEmailSent(true);
      setMessage(data.message);
    } catch (error) {
      console.table(error);

      if (error.response) {
        const {
          data,
          status
        } = error.response;
        if (data) setError(data);
      } else {
        setError({
          message: 'An error has occurred!'
        });
        console.log('error', error);
      }
    }

    setLoading(false);
  };

  return PasswordTab_jsx(external_react_default.a.Fragment, null, emailSent ? PasswordTab_jsx("p", null, message) : PasswordTab_jsx("div", null, PasswordTab_jsx("div", {
    className: "intro-text",
    style: {
      marginBottom: 15
    }
  }, PasswordTab_jsx("p", null, "\xBFOlvidaste tu clave?")), PasswordTab_jsx("form", {
    method: "post",
    onSubmit: handleSubmit
  }, PasswordTab_jsx(FormGroup["a" /* default */], null, PasswordTab_jsx(Input["a" /* default */], {
    autoFocus: true,
    id: "email_recover",
    onChange: e => setEmail(e.target.value),
    placeholder: "E-mail",
    required: true,
    type: "email",
    value: email
  }), error && PasswordTab_jsx("div", {
    className: "invalid-feedback"
  }, error.message)), PasswordTab_jsx(components_button["a" /* default */], {
    block: true,
    className: "enter-btn",
    size: "sm",
    type: "submit"
  }, "Enviar Recuperaci\xF3n"))));
};

/* harmony default export */ var AuthModal_PasswordTab = (PasswordTab);
// CONCATENATED MODULE: ./components/layout/AuthModal/RegisterTab.js

var RegisterTab_jsx = external_react_default.a.createElement;














const RegisterTab = ({
  changeTab,
  setLoading,
  socialLogin
}) => {
  const {
    0: name,
    1: setName
  } = Object(external_react_["useState"])('');
  const {
    0: email,
    1: setEmail
  } = Object(external_react_["useState"])('');
  const {
    0: password,
    1: setPassword
  } = Object(external_react_["useState"])('');
  const {
    0: error,
    1: setError
  } = Object(external_react_["useState"])('');
  const {
    signIn
  } = Object(external_react_["useContext"])(UserContext["b" /* default */]);
  const {
    closeAuthModal,
    packageId
  } = Object(external_react_["useContext"])(AuthModalContext["a" /* AuthModalContext */]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    document.activeElement.blur();

    try {
      const tokenResponse = await Object(services_api["b" /* default */])().post('register', {
        client_id: constants["a" /* CLIENT_ID */],
        client_secret: constants["b" /* CLIENT_SECRET */],
        email,
        name,
        package_id_intention: packageId,
        password
      });
      const {
        access_token
      } = tokenResponse.data;
      Object(auth["e" /* setAccessToken */])(access_token);
      const userResponse = await Object(services_api["b" /* default */])().get('user');
      signIn(userResponse.data, tokenResponse.data);
      closeAuthModal();
      router_default.a.push({
        pathname: '/subscribe'
      }, '/register/wizard/complete-test');
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError('An error has occurred!');
        console.log('error', error);
      }
    }

    setLoading(false);
  };

  function goToLogin(e) {
    e.preventDefault();
    changeTab('login');
  }

  const alreadyRegistered = config["b" /* CONFIG */].lang === 'es-CL' ? '¿Ya estás suscrito?' : '¿Ya eres suscriptor?';
  const login = config["b" /* CONFIG */].lang === 'es-CL' ? 'Inicia sesión' : 'Ház login';
  return RegisterTab_jsx(external_react_default.a.Fragment, null, RegisterTab_jsx("div", {
    className: "intro-text"
  }, RegisterTab_jsx("p", null, "\xA1Bienvenidos!")), RegisterTab_jsx("form", {
    method: "post",
    onSubmit: handleSubmit
  }, error && RegisterTab_jsx("div", {
    className: "invalid-feedback"
  }, error.message), RegisterTab_jsx(FormGroup["a" /* default */], null, RegisterTab_jsx(Input["a" /* default */], {
    id: "name",
    onChange: e => setName(e.target.value),
    placeholder: "Nombre",
    required: true,
    value: name
  }), error && error.errors && RegisterTab_jsx("div", {
    className: "invalid-feedback"
  }, error.errors.name)), RegisterTab_jsx(FormGroup["a" /* default */], null, RegisterTab_jsx(Input["a" /* default */], {
    id: "reg_email",
    onChange: e => setEmail(e.target.value),
    placeholder: "E-mail",
    required: true,
    type: "email",
    value: email
  }), error && error.errors && RegisterTab_jsx("div", {
    className: "invalid-feedback"
  }, error.errors.email)), RegisterTab_jsx(FormGroup["a" /* default */], null, RegisterTab_jsx(Input["a" /* default */], {
    id: "reg_password",
    onChange: e => setPassword(e.target.value),
    placeholder: "Clave",
    required: true,
    type: "password",
    value: password
  }), error && error.errors && RegisterTab_jsx("div", {
    className: "invalid-feedback"
  }, error.errors.password)), RegisterTab_jsx(components_button["a" /* default */], {
    block: true,
    className: "enter-btn",
    size: "sm",
    type: "submit"
  }, "Registrar"), RegisterTab_jsx("div", {
    className: "already-subscriptor"
  }, RegisterTab_jsx("span", null, alreadyRegistered), ' ', RegisterTab_jsx("a", {
    className: "bold text-uppercase",
    href: "/login",
    onClick: goToLogin
  }, login)), RegisterTab_jsx(OrEnterWith["a" /* default */], null), RegisterTab_jsx(SocialButtons["a" /* default */], {
    socialLogin: socialLogin
  })));
};

/* harmony default export */ var AuthModal_RegisterTab = (RegisterTab);
// CONCATENATED MODULE: ./components/layout/AuthModal/AuthModal.js


var AuthModal_jsx = external_react_default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }















function AuthModal() {
  const {
    backTab,
    changeTab,
    closeAuthModal,
    show,
    tab,
    tabsHistory,
    packageId
  } = Object(external_react_["useContext"])(AuthModalContext["a" /* AuthModalContext */]);
  const facebookColor = '#3B5990';
  const googleColor = '#D44639';
  const {
    0: loading,
    1: setLoading
  } = Object(external_react_["useState"])();

  function back(e) {
    e.preventDefault();
    backTab();
  }

  function close(e) {
    e.preventDefault();
    closeAuthModal();
  }

  function onHide() {
    closeAuthModal();
  }

  function onSelect(e) {
    return changeTab(e);
  }

  const socialLogin = async e => {
    let provider = e.currentTarget.innerText;

    try {
      external_nookies_default.a.set({}, 'pkg_int_id', JSON.stringify(packageId), {
        path: '/'
      });
      const res = await Object(services_api["b" /* default */])().get(`auth/${provider}`);
      window.location = res.data.url;
    } catch (error) {
      console.table(error); // setError('An error has occurred!')
    } // console.table(e.currentTarget.innerText);

  };

  const theme = Object(external_react_["useContext"])(external_styled_components_["ThemeContext"]);
  const headerColor = theme.colors.backgroundContrast;
  return AuthModal_jsx(Modal_default.a, _extends({
    backdrop: loading ? 'static' : true,
    className: "login-modal"
  }, {
    onHide,
    show
  }), AuthModal_jsx(Modal_default.a.Header, null, AuthModal_jsx(Modal_default.a.Title, null, tabsHistory.length > 1 ? AuthModal_jsx("button", {
    disabled: loading,
    onClick: back,
    type: "button",
    className: style_default.a.dynamic([["1862754880", [headerColor, external_color_default()(googleColor)]]]) + " " + "back"
  }, AuthModal_jsx("img", {
    alt: "Volver",
    height: "23",
    src: "/static/icons/back.svg",
    width: "23",
    className: style_default.a.dynamic([["1862754880", [headerColor, external_color_default()(googleColor)]]])
  })) : AuthModal_jsx("button", {
    disabled: loading,
    onClick: close,
    type: "button",
    className: style_default.a.dynamic([["1862754880", [headerColor, external_color_default()(googleColor)]]]) + " " + "close"
  }, AuthModal_jsx("img", {
    alt: "Cerrar",
    height: "23",
    src: "/static/icons/close.svg",
    width: "23",
    className: style_default.a.dynamic([["1862754880", [headerColor, external_color_default()(googleColor)]]])
  })), AuthModal_jsx(LogoApp["a" /* default */], {
    height: constants["g" /* TENANT */] === 'lau' ? 45 : 30,
    verticalAlign: "middle"
  }))), AuthModal_jsx(Modal_default.a.Body, null, loading && AuthModal_jsx(AuthModal_ModalLoading, null), AuthModal_jsx(external_react_bootstrap_["Tab"].Container, _extends({
    activeKey: tab,
    id: "user-modal-tabs"
  }, {
    onSelect
  }), AuthModal_jsx(external_react_bootstrap_["Tab"].Content, null, AuthModal_jsx(external_react_bootstrap_["Tab"].Pane, {
    eventKey: "login"
  }, AuthModal_jsx(AuthModal_LoginTab, {
    changeTab,
    setLoading,
    socialLogin
  })), AuthModal_jsx(external_react_bootstrap_["Tab"].Pane, {
    eventKey: "password"
  }, AuthModal_jsx(AuthModal_PasswordTab, {
    setLoading
  })), AuthModal_jsx(external_react_bootstrap_["Tab"].Pane, {
    eventKey: "register"
  }, AuthModal_jsx(AuthModal_RegisterTab, {
    changeTab,
    setLoading,
    socialLogin
  }))))), AuthModal_jsx(style_default.a, {
    id: "1862754880",
    dynamic: [headerColor, external_color_default()(googleColor)]
  }, [".modal-backdrop.show{opacity:.68;}", ".login-modal{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:var(--gray4);-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding-top:.5rem;padding-bottom:.5rem;text-align:center;}", "@media (min-width:768px){.login-modal{padding-top:1.75rem;padding-bottom:1.75rem;}}", ".modal-open .login-modal{display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;}", ".login-modal .modal-dialog{box-shadow:0 2px 6px var(--black);margin-top:auto;margin-bottom:auto;max-width:325px;}", "@media (min-width:768px){.login-modal .modal-dialog{min-width:325px;}}", ".login-modal .modal-content{border:0;border-radius:0;}", `.login-modal .modal-header{background-color:${headerColor};border-radius:0;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:10px;position:relative;}`, ".login-modal .back,.login-modal .close{background-color:transparent;border:0;margin:0;opacity:1;outline:0;padding:15px;position:absolute;right:0;top:50%;-webkit-transition:opacity 150ms;transition:opacity 150ms;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);will-change:opacity;}", ".login-modal .back[disabled],.login-modal .close[disabled]{cursor:not-allowed;}", ".login-modal .back img,.login-modal .close img{display:block;}", ".login-modal .back:focus,.login-modal .back:hover,.login-modal .close:focus,.login-modal .close:hover{opacity:.33;}", ".login-modal .modal-body{padding:15px 25px 20px;}", ".login-modal .intro-text{font-size:18px;line-height:1.2;margin-bottom:15px;padding:0 15%;}", ".login-modal .intro-text *:last-child{margin-bottom:0;}", ".login-modal .enter-btn{margin-top:30px;margin-bottom:10px;}", ".login-modal .already-subscriptor{font-size:16px;margin-bottom:20px;}", ".login-modal .already-subscriptor a{color:inherit;}", ".login-modal .or-enter-with{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:18px;margin-bottom:20px;}", ".login-modal .or-enter-with::before,.login-modal .or-enter-with::after{border-top:2px solid rgba(var(--gray2-rgb),.55);content:'';display:block;margin-right:-5px;margin-left:-5px;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;}", ".login-modal .or-enter-with::before{margin-right:15px;}", ".login-modal .or-enter-with::after{margin-left:15px;}", ".login-modal .social{font-family:sans-serif;font-size:16px;line-height:22px;-webkit-transition:background-color 150ms;transition:background-color 150ms;}", ".login-modal .social .icon{display:inline-block;height:22px;margin-top:4px;margin-right:5px;margin-left:-10px;vertical-align:middle;width:22px;}", ".login-modal .social{padding:10px 20px !important;width:130px;text-align:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;vertical-align:middle;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:1.5;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}", ".login-modal .social .icon{margin:0 10px 0 -10px !important;height:auto;width:auto;}", ".login-modal .social svg{display:block;}", ".login-modal .social rect,.login-modal .social path{-webkit-transition:fill 150ms;transition:fill 150ms;}", `.login-modal .google .cls-3{fill:${external_color_default()(googleColor)};}`, "@media (max-width:768px){.login-modal .facebook,.login-modal .google{padding:8px 15px;}}"]));
}
// EXTERNAL MODULE: ./pages/_error.js
var _error = __webpack_require__("Y0NT");

// EXTERNAL MODULE: ./components/withApi/index.js
var withApi = __webpack_require__("ihRs");

// CONCATENATED MODULE: ./components/layout/Layout.js


var Layout_jsx = external_react_default.a.createElement;












const Layout = ({
  media,
  apiVersion,
  children,
  color: layoutColor = 'black',
  errorCode,
  header,
  menus,
  menusError,
  paddingTop = true,
  footer = '',
  customClass = ''
}) => {
  const theme = Object(external_react_["useContext"])(external_styled_components_["ThemeContext"]);
  const primaryColor = external_color_default()(theme.colors.primary).hsl().string();

  if (errorCode) {
    return Layout_jsx(_error["default"], {
      statusCode: errorCode
    });
  }

  if (header === 'closed') {
    paddingTop = false;
  }

  const {
    flash_message
  } = external_nookies_default.a.get({}, 'flash_message');
  Object(external_react_["useEffect"])(_ => {
    if (flash_message) {
      let messages = JSON.parse(flash_message);
      console.log(messages);
      if (messages.error) external_react_toastify_["toast"].error(messages.error, {
        delay: 500,
        autoClose: 5000
      });
      if (messages.success) external_react_toastify_["toast"].success(messages.success, {
        delay: 500,
        autoClose: 4000
      });
      if (messages.info) external_react_toastify_["toast"].info(messages.info, {
        delay: 500,
        autoClose: 4000
      });
      external_nookies_default.a.destroy({}, 'flash_message', {
        path: '/'
      });
    }
  }, [flash_message]);

  function renderHeader(media) {
    if (header !== 'hidden') {
      return Layout_jsx(layout_Header, {
        closed: header === 'closed',
        layoutColor,
        menus: menusError ? null : menus,
        media
      });
    }

    paddingTop = false;
    return null;
  }

  function renderFooter() {
    if (footer !== 'hidden') {
      return Layout_jsx(Footer["a" /* default */], {
        apiVersion: apiVersion,
        layoutColor: layoutColor
      });
    }

    return null;
  }

  return Layout_jsx("div", {
    className: style_default.a.dynamic([["2705163232", [layoutColor === 'white' ? 'black' : 'white', layoutColor === 'white' ? 'background-color: var(--white) !important;' : '']]]) + " " + (customClass || "")
  }, Layout_jsx(external_react_toastify_["ToastContainer"], {
    newestOnTop: true
  }), renderHeader(media), Layout_jsx("main", {
    className: style_default.a.dynamic([["2705163232", [layoutColor === 'white' ? 'black' : 'white', layoutColor === 'white' ? 'background-color: var(--white) !important;' : '']]]) + " " + ((!paddingTop ? 'no-padding' : '') || "")
  }, children), renderFooter(), Layout_jsx(AuthModal, null), Layout_jsx(style_default.a, {
    id: "2705163232",
    dynamic: [layoutColor === 'white' ? 'black' : 'white', layoutColor === 'white' ? 'background-color: var(--white) !important;' : '']
  }, [`:root{--color:var(--${layoutColor === 'white' ? 'black' : 'white'});}`, `body{${layoutColor === 'white' ? 'background-color: var(--white) !important;' : ''});;}`, "main{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-top:var(--padding-top);}", "main.no-padding{padding-top:0;}"]));
};

Layout.getInitialProps = async ctx => {
  const {
    api
  } = ctx;

  try {
    const menus = await loadMenus(ctx);
    const {
      data
    } = await api.get('version');
    const {
      version: apiVersion
    } = data;
    const media = ctx.query;
    return {
      apiVersion,
      menus,
      media
    };
  } catch (error) {
    if (error.response) {
      console.log(`The request was made and the server responded with a status code
      that falls out of the range of 2xx`, error.response.status); // console.log(error.response.headers)
      // console.log(error.response.data)
    } else if (error.request) {
      console.log('The request was made but no response was received'); // console.log(error.request)
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    return {
      errorCode: 503
    };
  }
};

/* harmony default export */ var layout_Layout = __webpack_exports__["a"] = (Object(withApi["a" /* default */])(Layout));

/***/ }),

/***/ "9yvl":
/***/ (function(module, exports) {

module.exports = require("react-icons/go");

/***/ }),

/***/ "AroE":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "C+bE":
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

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

/***/ "FHnF":
/***/ (function(module, exports) {

module.exports = require("react-svg");

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

/***/ "IZS3":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "Ib8v":
/***/ (function(module, exports) {

module.exports = require("react-icons/ri");

/***/ }),

/***/ "K2gz":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "KKbo":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "M09o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GA_TRACKING_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pageview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return event; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("rOcY");

/* File based at:
https://github.com/zeit/next.js/tree/canary/examples/with-google-analytics */

const GA_TRACKING_ID = _config__WEBPACK_IMPORTED_MODULE_0__[/* CONFIG */ "b"].googleAnalytics; // https://developers.google.com/analytics/devguides/collection/gtagjs/pages

const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  });
}; // https://developers.google.com/analytics/devguides/collection/gtagjs/events

const event = ({
  action,
  category,
  label,
  value
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

/***/ }),

/***/ "MmX0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaLink_MediaLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Qjr");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_wishlist_btn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("N39C");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("KKbo");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("uhWA");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("No/t");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;








const MediaCard = ({
  category = null,
  className,
  media,
  wishlist
}) => {
  if (!media.thumbnail_url) {// media.thumbnail_url = '//placehold.jp/180x256.png'
  }

  const theme = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_4__["ThemeContext"]);
  const lightColor = theme.colors.texts;
  const whiteColor = theme.colors.white;
  const {
    is_paid: isPaid
  } = media;

  function statusChip() {
    if (isPaid) {
      return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Chip"], {
        label: "Premium",
        color: "primary"
      });
    } else {
      return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Chip"], {
        label: "Gratis"
      });
    }
  }

  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4159586844", [lightColor, whiteColor]]]) + " " + (className || "")
  }, __jsx(_MediaLink_MediaLink__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    category,
    media
  }, __jsx("a", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4159586844", [lightColor, whiteColor]]]) + " " + "media-card text-center"
  }, wishlist && __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4159586844", [lightColor, whiteColor]]]) + " " + "wish"
  }, __jsx(_components_wishlist_btn__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    movieId: media.id,
    inside: true
  })), __jsx("img", {
    src: category ? category.is_horizontal ? media.thumbnail2_url : media.thumbnail_url : media.thumbnail_url,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4159586844", [lightColor, whiteColor]]]) + " " + "img-fluid"
  }), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4159586844", [lightColor, whiteColor]]]) + " " + "media-card-label"
  }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeIcon"], {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__["faPlayCircle"]
  }), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4159586844", [lightColor, whiteColor]]]) + " " + "text"
  }, media.title)), __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["4159586844", [lightColor, whiteColor]]]) + " " + "media-chip"
  }, statusChip()))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "4159586844",
    dynamic: [lightColor, whiteColor]
  }, [`.media-card.__jsx-style-dynamic-selector{color:${lightColor};}`, `.media-card.__jsx-style-dynamic-selector:focus,.media-card.__jsx-style-dynamic-selector:hover{color:${whiteColor};}`]));
};

MediaCard.defaultProps = {
  category: null,
  className: null,
  media: null
};
/* harmony default export */ __webpack_exports__["a"] = (MediaCard);

/***/ }),

/***/ "N39C":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a3/r");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2MRG");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




const WishlistBtn = ({
  block,
  color,
  inside,
  movieId,
  home
}) => {
  const InsideBtn = ({
    icon,
    size,
    onClick
  }) => {
    return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("button", {
      onClick: onClick,
      className: "jsx-1743738566" + " " + `btn inside-btn`
    }, __jsx("img", {
      height: size,
      src: icon,
      width: size,
      className: "jsx-1743738566"
    }), __jsx("span", {
      className: "jsx-1743738566"
    }, "Mi Lista")), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
      id: "1743738566"
    }, [".inside-btn.jsx-1743738566{z-index:3;width:65px;padding:2px 5px;margin:0px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:5px;color:black;background-color:white;}", "span.jsx-1743738566{margin-left:6px;font-size:8px;font-weight:bold;}", ".inside-btn.jsx-1743738566:hover{background-color:lightgray;}"]));
  };

  const {
    0: wishlisted,
    1: setWishlisted
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);

  const handleToggle = async e => {
    e.preventDefault();

    try {
      const response = await Object(_services_api__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])().post('/wishlist', {
        id: movieId
      });
      const {
        attached,
        detached
      } = response.data;
      const inList = attached.includes(movieId) && !detached.includes(movieId);
      setWishlisted(inList);
    } catch (error) {
      console.log(error);
    }
  };

  const wishlist = async _ => {
    try {
      const res = await Object(_services_api__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"])().get(`/wishlist/${movieId}`);
      setWishlisted(Object.keys(res.data).length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
    wishlist();
  }, []);
  return wishlisted ? inside ? __jsx(InsideBtn, {
    icon: "/static/icons/remove.svg",
    size: "10",
    onClick: handleToggle
  }) : __jsx(_components_button__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    block: block,
    home: home,
    onClick: handleToggle
  }, __jsx("img", {
    height: "13",
    src: "/static/icons/remove.svg",
    width: "13"
  }), __jsx("span", null, "Mi Lista")) : inside ? __jsx(InsideBtn, {
    icon: "/static/icons/add.svg",
    size: "10",
    onClick: handleToggle
  }) : __jsx(_components_button__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    block: block,
    home: home,
    color: "secondary",
    outline: true,
    textColor: color,
    onClick: handleToggle
  }, __jsx("img", {
    height: "13",
    src: "/static/icons/add.svg",
    width: "13"
  }), __jsx("span", null, "Mi Lista"));
};

/* harmony default export */ __webpack_exports__["a"] = (WishlistBtn);

/***/ }),

/***/ "No/t":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "Osoz":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "RmiK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2MRG");
/* harmony import */ var _contexts_SearchContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d36P");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




function LogoApp() {
  const {
    search,
    setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_SearchContext__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"]);
  const {
    0: link,
    1: setLink
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('https://laumas.s3.sa-east-1.amazonaws.com');
  const {
    0: images,
    1: setImage
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([{
    id: '1'
  }]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
    (async _ => {
      const res = await Object(_services_api__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"])().get(search ? `/search/${search}` : '/club/images');
      setImage(res.data);
    })();
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("img", {
    src: ` ${link}/images/club${images.image_logo}`,
    className: "jsx-636565060" + " " + "img-fluid"
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "636565060"
  }, ["img.jsx-636565060{display:inline - block;}", ".logo.jsx-636565060{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:-5px;margin-bottom:-5px;}", ".logo.jsx-636565060 a.jsx-636565060{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;padding:5px;}"]));
}

/* harmony default export */ __webpack_exports__["a"] = (LogoApp);

/***/ }),

/***/ "SSxu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chevron; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("FHnF");
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var glamor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("mpFN");
/* harmony import */ var glamor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(glamor__WEBPACK_IMPORTED_MODULE_2__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function Chevron(props) {
  let transformDirection;

  switch (props.dir) {
    case 'left':
      transformDirection = '90deg';
      break;

    case 'bottom':
      transformDirection = '0deg';
      break;

    default:
      transformDirection = '-90deg';
      break;
  }

  const styles = Object(glamor__WEBPACK_IMPORTED_MODULE_2__["css"])({
    ' svg': {
      height: props.height,
      pointerEvents: 'none',
      transform: `rotate(${transformDirection})`,
      width: props.width
    },
    ' path': {
      fill: '#fff'
    }
  });
  return props.inline ? __jsx(react_svg__WEBPACK_IMPORTED_MODULE_1___default.a, _extends({
    className: props.className,
    fallback: props.alt,
    src: "/static/chevron-icon.svg"
  }, styles, {
    wrapper: "span"
  })) : __jsx("img", {
    alt: props.alt,
    height: props.height,
    src: "/static/chevron-icon.svg",
    width: props.width
  });
}

/***/ }),

/***/ "SibU":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/Dropdown");

/***/ }),

/***/ "SjLB":
/***/ (function(module, exports) {

module.exports = require("json-parse-safe");

/***/ }),

/***/ "UAhG":
/***/ (function(module, exports) {

module.exports = require("@sentry/node");

/***/ }),

/***/ "USah":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2MRG");
/* harmony import */ var _contexts_SearchContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d36P");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




function LogoApp() {
  const {
    search,
    setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_SearchContext__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"]);
  const {
    0: link,
    1: setLink
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('https://laumas.s3.sa-east-1.amazonaws.com');
  const {
    0: images,
    1: setImage
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([{
    id: '1'
  }]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(_ => {
    (async _ => {
      const res = await Object(_services_api__WEBPACK_IMPORTED_MODULE_2__[/* default */ "b"])().get(search ? `/search/${search}` : '/club/images');
      setImage(res.data);
    })();
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("img", {
    src: ` ${link}/images/club${images.image_projeto}`,
    className: "jsx-112517394" + " " + "img-fluid"
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "112517394"
  }, ["img.jsx-112517394{display:inline-block;}"]));
}

/* harmony default export */ __webpack_exports__["a"] = (LogoApp);

/***/ }),

/***/ "UlpK":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/head.js");

/***/ }),

/***/ "W4n6":
/***/ (function(module, exports) {

module.exports = require("react-icons");

/***/ }),

/***/ "Y0NT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("eomm");
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rxnA");
/* harmony import */ var _sentry_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("UAhG");
/* harmony import */ var _sentry_node__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_sentry_node__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("3YKB");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;







function CustomError({
  statusCode
}) {
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_6__["ThemeContext"]);
  const backgroundColor = color__WEBPACK_IMPORTED_MODULE_5___default()(theme.colors.background).hsl().string();
  const title = statusCode === 503 ? 'Servidor no disponible' : null;
  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2207119790", [backgroundColor, _constants_constants__WEBPACK_IMPORTED_MODULE_3__[/* STATIC_PATH */ "f"]]]]) + " " + "error"
  }, __jsx(next_error__WEBPACK_IMPORTED_MODULE_2___default.a, {
    statusCode: statusCode,
    title: title
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2207119790",
    dynamic: [backgroundColor, _constants_constants__WEBPACK_IMPORTED_MODULE_3__[/* STATIC_PATH */ "f"]]
  }, [`.error>div{background:${backgroundColor} !important;color:#fff !important;}`, `.error>div>div::after{content:url(${_constants_constants__WEBPACK_IMPORTED_MODULE_3__[/* STATIC_PATH */ "f"]}/logos/logo_project@2x.png);display:block;height:auto;margin-right:auto;margin-top:15px;margin-left:auto;max-width:100%;width:150px;}`, ".error>div h1{border-right-color:rgba(255,255,255,.3) !important;}"]));
}

CustomError.getInitialProps = async ({
  res,
  err,
  asPath
}) => {
  const errorInitialProps = await next_error__WEBPACK_IMPORTED_MODULE_2___default.a.getInitialProps({
    res,
    err
  }); // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected
    _sentry_node__WEBPACK_IMPORTED_MODULE_4__["captureException"](err);
    return errorInitialProps; // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
  } // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry


  _sentry_node__WEBPACK_IMPORTED_MODULE_4__["captureException"](new next_error__WEBPACK_IMPORTED_MODULE_2___default.a(`_error.js getInitialProps missing data at path: ${asPath}`));
  return errorInitialProps;
};

/* harmony default export */ __webpack_exports__["default"] = (CustomError);

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = escapeRegex(normalizedRoute.replace(/\/$/, '') || '/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isOptional = /^\\\[.*\\\]$/.test($1);

    if (isOptional) {
      $1 = $1.slice(2, -2);
    }

    const isCatchAll = /^(\\\.){3}/.test($1);

    if (isCatchAll) {
      $1 = $1.slice(6);
    }

    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? isOptional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
  });
  let namedParameterizedRoute; // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    namedParameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
      const isCatchAll = /^(\\\.){3}/.test($1);
      const key = $1 // Un-escape key
      .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '');
      return isCatchAll ? `/(?<${escapeRegex(key)}>.+?)` : `/(?<${escapeRegex(key)}>[^/]+?)`;
    });
  }

  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups,
    namedRegex: namedParameterizedRoute ? `^${namedParameterizedRoute}(?:/)?$` : undefined
  };
}

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

/***/ "b5fN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a3/r");
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("FHnF");
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_svg__WEBPACK_IMPORTED_MODULE_3__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



const SocialButtons = ({
  socialLogin
}) => {
  return __jsx("div", {
    className: "jsx-4126239479" + " " + "social-btns"
  }, __jsx(_button__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    className: "social facebook",
    type: "button",
    onClick: socialLogin
  }, __jsx(react_svg__WEBPACK_IMPORTED_MODULE_3___default.a, {
    className: "icon",
    src: "/static/icons/facebook-icon.svg"
  }), "Facebook"), __jsx(_button__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    className: "social google",
    type: "button",
    onClick: socialLogin
  }, __jsx(react_svg__WEBPACK_IMPORTED_MODULE_3___default.a, {
    className: "icon",
    src: "/static/icons/google-icon.svg "
  }), "Google"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "4126239479"
  }, [".social-btns{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:space-around;-webkit-justify-content:space-around;-ms-flex-pack:space-around;justify-content:space-around;}", ".btn.social{background-color:#FFF !important;color:#666 !important;font-weight:normal !important;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-family:\"Roboto\",\"Helvetica\",\"Arial\",sans-serif;font-size:0.8em;box-shadow:0 0 3px #909090;border-radius:0;padding:10px 45px;}", ".btn>.icon{margin-right:0.2em;}", ".btn.social:hover{background-color:#FFF !important;}", ".btn.social:active,.btn.social:visited,.btn.social:focus{background-color:#d4d4d4 !important;border:none !important;box-shadow:none;}"]));
};

/* harmony default export */ __webpack_exports__["a"] = (SocialButtons);

/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cFkv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Footer; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3YKB");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("K2gz");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("W4n6");
/* harmony import */ var react_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("5mtF");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("2yjL");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_icons_io__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("FHnF");
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("rOcY");
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("gdJV");
/* harmony import */ var _ActiveLink__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("7NIq");
/* harmony import */ var _constants_colors__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("rqZI");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("kiQV");
var _package_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t("kiQV", 1);

var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }















function Footer({
  apiVersion,
  layoutColor
}) {
  return __jsx("footer", {
    className: "jsx-881476451" + " " + "footer"
  }, __jsx(NavFooter, {
    className: "d-lg-none"
  }), __jsx(TermsAndPoliciesBar, {
    apiVersion: apiVersion,
    layoutColor: layoutColor
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "881476451"
  }, [".footer.jsx-881476451{padding-bottom:65px;}", "@media (min-width:768px){.footer.jsx-881476451{padding-bottom:0;}}"]));
}

const NavFooter = ({
  className
}) => {
  const {
    user
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_10__[/* default */ "b"]);
  const menu = [{
    icon: 'home',
    label: 'Inicio',
    href: '/'
  }, // { icon: 'live', label: 'Ahora', },
  {
    icon: 'categories',
    label: 'Categorías',
    href: '/categories'
  }, // { icon: 'downloads', label: 'Descargas', href: '/downloads', },
  {
    icon: 'add',
    label: 'Mi Lista',
    href: user ? '/wishlist' : '/login'
  }, {
    icon: 'search',
    label: 'Buscar',
    href: '/movies'
  } // { icon: 'scan', label: 'Escanear', },
  ];
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('nav-footer', className);
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_13__["ThemeContext"]);
  const backgroundColor = color__WEBPACK_IMPORTED_MODULE_1___default()(theme.colors.background).hsl().string();
  const textAndFillColor = color__WEBPACK_IMPORTED_MODULE_1___default()(theme.colors.texts).hsl().string();
  return __jsx("nav", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["164880001", [backgroundColor, textAndFillColor, textAndFillColor]]]) + " " + (classes || "")
  }, menu.map((item, key) => __jsx(_ActiveLink__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], _extends({
    href: item.href
  }, {
    key
  }), __jsx("a", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["164880001", [backgroundColor, textAndFillColor, textAndFillColor]]])
  }, __jsx("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["164880001", [backgroundColor, textAndFillColor, textAndFillColor]]]) + " " + "icon"
  }, __jsx(react_svg__WEBPACK_IMPORTED_MODULE_8___default.a, {
    src: `/static/icons/${item.icon}.svg`
  })), item.label))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "164880001",
    dynamic: [backgroundColor, textAndFillColor, textAndFillColor]
  }, [`.nav-footer.__jsx-style-dynamic-selector{-webkit-align-items:flex-end;-webkit-box-align:flex-end;-ms-flex-align:flex-end;align-items:flex-end;background-color:${backgroundColor};bottom:0;box-shadow:0 0 5px rgba(var(--black-rgb),.9);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:13px;-webkit-box-pack:space-evenly;-webkit-justify-content:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;left:0;line-height:20px;padding:10px;position:fixed;z-index:10;width:100%;}`, `.nav-footer.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:${textAndFillColor};display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;fill:${textAndFillColor};-webkit-text-decoration:none;text-decoration:none;}`, ".nav-footer.__jsx-style-dynamic-selector a.active.__jsx-style-dynamic-selector{color:var(--white);fill:var(--white);}", ".nav-footer.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector .icon.__jsx-style-dynamic-selector{margin-bottom:5px;width:20px;}", ".nav-footer.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector .icon.__jsx-style-dynamic-selector path,.nav-footer.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector .icon.__jsx-style-dynamic-selector polygon,.nav-footer.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector .icon.__jsx-style-dynamic-selector rect{fill:inherit;}"]));
};

const SocialNetworks = ({
  className
}) => {
  if (!_config__WEBPACK_IMPORTED_MODULE_9__[/* CONFIG */ "b"].socialNetworks && Array.isArray(_config__WEBPACK_IMPORTED_MODULE_9__[/* CONFIG */ "b"].socialNetworks)) {
    return;
  }

  const theme = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_13__["ThemeContext"]);
  const color = color__WEBPACK_IMPORTED_MODULE_1___default()(theme.colors.backgroundContrast2).hsl().string();
  const colorHover = color__WEBPACK_IMPORTED_MODULE_1___default()(theme.colors.white).hsl().string();
  return __jsx(react_icons__WEBPACK_IMPORTED_MODULE_5__["IconContext"].Provider, {
    value: {
      size: '24px'
    }
  }, __jsx("ul", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2457901536", [color, colorHover]]]) + " " + `list-inline ${className} `
  }, _config__WEBPACK_IMPORTED_MODULE_9__[/* CONFIG */ "b"].socialNetworks.map((item, key) => {
    const slug = item.name.toLowerCase();
    if (!['facebook', 'instagram', 'twitter'].includes(slug)) return;
    return __jsx("li", {
      key: key,
      className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2457901536", [color, colorHover]]])
    }, __jsx("a", {
      href: item.link,
      target: "_blank",
      title: `${_config__WEBPACK_IMPORTED_MODULE_9__[/* CONFIG */ "b"].clubName} ${item.name}`,
      className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2457901536", [color, colorHover]]])
    }, slug === 'facebook' ? __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaFacebookSquare"], null) : slug === 'instagram' ? __jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_7__["IoLogoInstagram"], null) : slug === 'twitter' && __jsx(react_icons_io__WEBPACK_IMPORTED_MODULE_7__["IoLogoTwitter"], null)));
  })), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["2457901536", [color, colorHover]]]) + " " + "logo-gad"
  }, __jsx(GADLogo, null)), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2457901536",
    dynamic: [color, colorHover]
  }, ["@media (max-width:768px){.logo-gad.__jsx-style-dynamic-selector{padding-left:38px;}}", ".logo-gad.__jsx-style-dynamic-selector{display:none;}", "ul.__jsx-style-dynamic-selector{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin:5px 0;}", `a.__jsx-style-dynamic-selector{color:${color};display:block;padding:2.5px;-webkit-transition:color .3s;transition:color .3s;}`, "a.__jsx-style-dynamic-selector{margin-right:1px;margin-left:1px;padding:5px;}", `a.__jsx-style-dynamic-selector:focus,a.__jsx-style-dynamic-selector:hover{color:${colorHover};-webkit-transition:color .125s;transition:color .125s;}`]));
};

const TermsAndPoliciesBar = ({
  apiVersion,
  layoutColor
}) => {
  const {
    appName
  } = _config__WEBPACK_IMPORTED_MODULE_9__[/* CONFIG */ "b"];
  const {
    version: appVersion
  } = _package_json__WEBPACK_IMPORTED_MODULE_14__;
  const showVersions = true;
  const versionsLine = showVersions ? `v${appVersion}` + (apiVersion ? ` (api ${apiVersion})` : '') : '';
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_13__["ThemeContext"]);
  const color = color__WEBPACK_IMPORTED_MODULE_1___default()(theme.colors.texts).hsl().string();
  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "terms-and-policies-bar"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "desktop container-fluid"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "row align-items-center w-100"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "col-12 col-sm-4 text-md-left"
  }, __jsx("p", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]])
  }, `${appName} @ 2020 - Todos los derechos reservados`)), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "col-4 col-md-4 text-md-center terms-and-policies-bar__social-networks-col"
  }, __jsx(SocialNetworks, {
    className: "social-networks"
  })), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "col-8 col-sm-4 text-md-right aling"
  }, __jsx("ul", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]])
  }, __jsx("li", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "logo-gad"
  }, __jsx(GADLogo, null)))))), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "container-fluid mobile"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "row align-items-center"
  }, __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "copyright col-12 text-center"
  }, __jsx("p", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]])
  }, `${appName} @ 2020`), __jsx("p", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]])
  }, "Todos los derechos reservados")), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "links col-12"
  }, __jsx("ul", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]])
  }, __jsx("li", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]])
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: "/privacy",
    passHref: true
  }, __jsx(FooterLink, null, "Pol\xEDtica de Privacidad"))), __jsx("li", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]])
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
    href: "/terminos-y-politicas",
    passHref: true
  }, __jsx(FooterLink, null, "T\xE9rminos y condiciones"))))), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "col-12 text-center terms-and-policies-bar__social-networks-col"
  }, __jsx(SocialNetworks, {
    className: "social-networks"
  })), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["606369113", [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]]]) + " " + "gad-logo col-12 text-center"
  }, __jsx(GADLogo, null)))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "606369113",
    dynamic: [layoutColor === 'white' ? 'var(--background)' : 'transparent', color]
  }, [`.terms-and-policies-bar.__jsx-style-dynamic-selector{background-color:${layoutColor === 'white' ? 'var(--background)' : 'transparent'};color:${color};font-size:11px;line-height:1;padding-top:10px;padding-bottom:5px;}`, ".terms-and-policies-bar.__jsx-style-dynamic-selector .mobile.__jsx-style-dynamic-selector{display:none;}", ".terms-and-policies-bar.__jsx-style-dynamic-selector .desktop.__jsx-style-dynamic-selector{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}", "@media (max-width:767px){.terms-and-policies-bar.__jsx-style-dynamic-selector .mobile.__jsx-style-dynamic-selector{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.terms-and-policies-bar.__jsx-style-dynamic-selector .desktop.__jsx-style-dynamic-selector{display:none;}.gad-logo.__jsx-style-dynamic-selector{margin:15px 0;}.copyright.__jsx-style-dynamic-selector{margin-top:15px;}.links.__jsx-style-dynamic-selector{margin:10px 0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.aling.__jsx-style-dynamic-selector{margin-top:-10px;}.logo-gad.__jsx-style-dynamic-selector{display:none!important;}.terms-and-policies-bar__social-networks-col.__jsx-style-dynamic-selector{padding-right:0;}.terms-and-policies-bar__social-networks-col.__jsx-style-dynamic-selector .social-networks{margin-left:-2.5px;}}", ".terms-and-policies-bar.__jsx-style-dynamic-selector p.__jsx-style-dynamic-selector{margin-bottom:5px;}", ".terms-and-policies-bar.__jsx-style-dynamic-selector ul.__jsx-style-dynamic-selector{-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;list-style-type:none;margin-right:-5px;margin-bottom:0;margin-left:-5px;padding-left:0;}", ".terms-and-policies-bar.__jsx-style-dynamic-selector ul.__jsx-style-dynamic-selector li.__jsx-style-dynamic-selector{display:inline;padding-right:5px;padding-left:5px;}", ".terms-and-policies-bar.__jsx-style-dynamic-selector ul.__jsx-style-dynamic-selector li.__jsx-style-dynamic-selector:last-child{margin-left:auto;}", "@media (min-width:768px){.terms-and-policies-bar.__jsx-style-dynamic-selector{font-size:12px;line-height:1.25;padding:15px 5px;}.terms-and-policies-bar.__jsx-style-dynamic-selector p.__jsx-style-dynamic-selector{margin-bottom:0;}.terms-and-policies-bar.__jsx-style-dynamic-selector ul.__jsx-style-dynamic-selector{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;margin-right:-10px;}.terms-and-policies-bar.__jsx-style-dynamic-selector ul.__jsx-style-dynamic-selector li.__jsx-style-dynamic-selector{padding-right:10px;padding-left:10px;}.terms-and-policies-bar.__jsx-style-dynamic-selector ul.__jsx-style-dynamic-selector li.__jsx-style-dynamic-selector:last-child{margin-left:0;}}"]));
};

const FooterLink = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(({
  children,
  onClick,
  href,
  target
}, ref) => {
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_13__["ThemeContext"]);
  const color = color__WEBPACK_IMPORTED_MODULE_1___default()(theme.colors.texts).hsl().string();
  const colorHover = color__WEBPACK_IMPORTED_MODULE_1___default()(theme.colors.white).hsl().string();
  return __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx("a", _extends({
    href,
    onClick,
    ref,
    target
  }, {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["1053952221", [color, colorHover, colorHover]]])
  }), children), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1053952221",
    dynamic: [color, colorHover, colorHover]
  }, [`a.__jsx-style-dynamic-selector{color:${color};display:inline-block;-webkit-text-decoration:none;text-decoration:none;-webkit-transition:color .2s;transition:color .2s;}`, `a.__jsx-style-dynamic-selector::after{border-bottom:1px solid ${colorHover};content:'';display:block;opacity:0;-webkit-transition:opacity .2s,-webkit-transform .2s;-webkit-transition:opacity .2s,transform .2s;transition:opacity .2s,transform .2s;-webkit-transform:translateY(-2px);-ms-transform:translateY(-2px);transform:translateY(-2px);}`, `a.__jsx-style-dynamic-selector:focus,a.__jsx-style-dynamic-selector:hover{color:${colorHover};}`, "a.__jsx-style-dynamic-selector:focus.__jsx-style-dynamic-selector::after,a.__jsx-style-dynamic-selector:hover.__jsx-style-dynamic-selector::after{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}"]));
});

const GADLogo = _ => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx("a", {
    href: "//somosgad.com",
    target: "_blank",
    className: "jsx-270065734" + " " + "signature d-inline-block"
  }, __jsx("img", {
    alt: "GAD_",
    height: "19",
    src: "/static/logos/gad.svg",
    width: "35",
    className: "jsx-270065734"
  })), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "270065734"
  }, ["img.jsx-270065734{height:17px;min-width:30px;}", "@media (min-width:768px){img.jsx-270065734{height:19px;min-width:35px;}}"]));
}; // display: grid;
// flex - wrap: nowrap;
// grid - template - columns: 35px 27px;

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

var _interopRequireWildcard = __webpack_require__("7KCV");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _url = __webpack_require__("bzos");

var _utils = __webpack_require__("kYf9");

var _router = _interopRequireDefault(__webpack_require__("nOHt"));

var _router2 = __webpack_require__("elyg");

function isLocal(href) {
  const url = (0, _url.parse)(href, false, true);
  const origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  let lastHref = null;
  let lastAs = null;
  let lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    const result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

let observer;
const listeners = new Map();
const IntersectionObserver = false ? undefined : null;
const prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      const cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

const listenToIntersections = (el, cb) => {
  const observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: (0, _router2.addBasePath)(formatUrl(href)),
        as: asHref ? (0, _router2.addBasePath)(formatUrl(asHref)) : asHref
      };
    });

    this.linkClicked = e => {
      const {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      let {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      const {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      let {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (false) {}

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    const {
      pathname
    } = window.location;
    const {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    const resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      const isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    const paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (false) {}
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    let {
      children
    } = this.props;
    const {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = /*#__PURE__*/_react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    const child = _react.Children.only(children);

    const props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) {}

    return _react.default.cloneElement(child, props);
  }

}

if (false) {}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "d36P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const SearchContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])();
/* harmony default export */ __webpack_exports__["b"] = (SearchContext);
function SearchProvider({
  children
}) {
  const {
    0: search,
    1: setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  return __jsx(SearchContext.Provider, {
    value: _objectSpread({}, {
      search,
      setSearch
    })
  }, children);
}

/***/ }),

/***/ "d5Q9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModalContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AuthModalProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const AuthModalContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])();
function AuthModalProvider({
  children
}) {
  const allowedTabs = ['login', 'password', 'register'];
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  const {
    modal,
    code,
    socialProvider
  } = router.query;
  const shouldAutoOpen = allowedTabs.includes(modal);
  const {
    0: show,
    1: setShow
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(shouldAutoOpen ? true : false);
  const {
    0: tab,
    1: setTab
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(shouldAutoOpen ? modal : 'login');
  const {
    0: tabsHistory,
    1: setTabHistory
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const {
    0: packageId,
    1: setPackageId
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();

  function backTab() {
    if (tabsHistory.length <= 1) {
      throw "can't back tab 'cause there are no more tabs on history";
    }

    const newTab = tabsHistory[tabsHistory.length - 2];
    setTab(newTab);
    const newTabHistory = tabsHistory.slice(0, -1);
    setTabHistory(newTabHistory);
    return true;
  }

  function changeTab(tabName) {
    validateTab(tabName);
    setTab(tabName);
    const newTabHistory = [...tabsHistory, tabName];
    setTabHistory(newTabHistory);
    return true;
  }

  function closeAuthModal() {
    setShow(false);
    return true;
  }

  function openAuthModal(wishedTab = 'login', packageId = null) {
    validateTab(wishedTab);

    if (tab !== wishedTab) {
      setTab(wishedTab);
    }

    const newTabHistory = [wishedTab];
    setTabHistory(newTabHistory);
    setPackageId(packageId);
    setShow(true);
    return true;
  }

  function validateTab(tabName) {
    if (!allowedTabs.includes(tabName)) {
      throw 'unknown tab';
    }

    return true;
  }

  return __jsx(AuthModalContext.Provider, {
    value: _objectSpread({}, {
      backTab,
      changeTab,
      closeAuthModal,
      openAuthModal,
      packageId,
      show,
      tab,
      tabsHistory,
      code,
      socialProvider
    })
  }, children);
}

/***/ }),

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.default = void 0;

var _url2 = __webpack_require__("bzos");

var _mitt = _interopRequireDefault(__webpack_require__("dZ6Y"));

var _utils = __webpack_require__("g/15");

var _isDynamic = __webpack_require__("/jkW");

var _routeMatcher = __webpack_require__("gguc");

var _routeRegex = __webpack_require__("YTqd");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* global __NEXT_DATA__ */
// tslint:disable:no-console


const basePath =  false || '';

function addBasePath(path) {
  return path.indexOf(basePath) !== 0 ? basePath + path : path;
}

function delBasePath(path) {
  return path.indexOf(basePath) === 0 ? path.substr(basePath.length) || '/' : path;
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch((0, _utils.formatWithValidation)({
      pathname: addBasePath( // @ts-ignore __NEXT_DATA__
      `/_next/data/${__NEXT_DATA__.buildId}${delBasePath(pathname)}.json`),
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  constructor(_pathname, _query, _as2, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname,
          query
        }), (0, _utils.getURL)());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && (0, _url2.parse)(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (false) {}

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute((0, _url2.parse)(asPath).pathname);
      return  true && this.sdc[pathname] ? Promise.resolve(this.sdc[pathname]) : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = (0, _url2.parse)(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    (0, _isDynamic.isDynamicRoute)(_pathname) && __NEXT_DATA__.autoExport ? _pathname : _as2;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign({}, data, {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (_utils.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      let url = typeof _url === 'object' ? (0, _utils.formatWithValidation)(_url) : _url;
      let as = typeof _as === 'object' ? (0, _utils.formatWithValidation)(_as) : _as;
      url = addBasePath(url);
      as = addBasePath(as); // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, as, options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = (0, _url2.parse)(url, true);

      if (!pathname || protocol) {
        if (false) {}

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if ((0, _isDynamic.isDynamicRoute)(route)) {
        const {
          pathname: asPathname
        } = (0, _url2.parse)(as);
        const routeRegex = (0, _routeRegex.getRouteRegex)(route);
        const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (false) {}

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/vercel/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, as, options);

        if (false) {}

        this.set(route, pathname, query, as, routeInfo).then(() => {
          if (error) {
            Router.events.emit('routeChangeError', error, as);
            throw error;
          }

          Router.events.emit('routeChangeComplete', as);
          return resolve(true);
        });
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }).catch(err => handleError(err, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = (0, _url2.parse)(url);

      if (!pathname || protocol) {
        if (false) {}

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (false) {}

      const route = delBasePath(toRoute(pathname));
      Promise.all([this.pageLoader.prefetchData(url, delBasePath(asPath)), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    route = delBasePath(route);
    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    return this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "eomm":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("/a9y")


/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _url = __webpack_require__("bzos");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url, options) {
  if (false) {}

  return (0, _url.format)(url, options);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

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

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
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

/***/ "jlXy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_spinners_ClipLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6tnH");
/* harmony import */ var react_spinners_ClipLoader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_spinners_ClipLoader__WEBPACK_IMPORTED_MODULE_1__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const Loading = ({
  color = 'var(--loading)',
  loadingState,
  size = 80,
  style
}) => {
  return __jsx(react_spinners_ClipLoader__WEBPACK_IMPORTED_MODULE_1___default.a, {
    color: color,
    loading: loadingState,
    size: size,
    sizeUnit: "px",
    style: style
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Loading);

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "kYf9":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "kiQV":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"@somosgad/dale\",\"private\":true,\"version\":\"1.0.0\",\"engines\":{\"node\":\"12.18.0\"},\"scripts\":{\"build\":\"next build\",\"dev\":\"nodemon server.js\",\"dev:river\":\"cross-env TENANT=river yarn dev\",\"dev:dalecacique\":\"cross-env TENANT=dalecacique yarn dev\",\"docz:dev\":\"docz dev\",\"docz:build\":\"docz build\",\"docz:serve\":\"docz build && docz serve\",\"start\":\"next start -p $PORT\"},\"dependencies\":{\"@babel/plugin-transform-modules-commonjs\":\"^7.10.4\",\"@charlietango/use-script\":\"^2.1.0\",\"@fortawesome/fontawesome-svg-core\":\"^1.2.30\",\"@fortawesome/free-solid-svg-icons\":\"^5.14.0\",\"@fortawesome/react-fontawesome\":\"^0.1.11\",\"@material-ui/core\":\"^4.11.0\",\"@sentry/browser\":\"^5.15.5\",\"@sentry/node\":\"^5.15.5\",\"@zeit/next-css\":\"^1.0.1\",\"@zeit/next-sass\":\"^1.0.1\",\"axios\":\"^0.19.0\",\"bootstrap\":\"^4.5.0\",\"classnames\":\"^2.2.6\",\"color\":\"^3.1.2\",\"cross-env\":\"^6.0.3\",\"dotenv\":\"^8.2.0\",\"dotenv-load\":\"^2.0.0\",\"express\":\"^4.17.1\",\"formik\":\"^2.1.4\",\"glamor\":\"^2.20.40\",\"hls.js\":\"^0.14.8\",\"isomorphic-unfetch\":\"^3.0.0\",\"json-parse-safe\":\"^2.0.0\",\"netslider\":\"^1.3.4\",\"next\":\"^9.4.1\",\"next-compose-plugins\":\"^2.2.0\",\"next-images\":\"^1.4.0\",\"next-redirect\":\"^1.0.1\",\"node-sass\":\"^4.14.1\",\"nookies\":\"^2.3.0\",\"now\":\"^19.0.1\",\"nprogress\":\"^0.2.0\",\"prop-types\":\"^15.7.2\",\"react\":\"^16.12.0\",\"react-addons-css-transition-group\":\"^15.6.2\",\"react-bootstrap\":\"1.0.0-beta.14\",\"react-dom\":\"^16.12.0\",\"react-elastic-carousel\":\"^0.7.2\",\"react-extensions\":\"^1.0.10\",\"react-flatpickr\":\"^3.10.1\",\"react-icons\":\"^3.10.0\",\"react-number-format\":\"^4.4.1\",\"react-slick\":\"^0.25.2\",\"react-spinners\":\"^0.6.1\",\"react-svg\":\"^10.0.18\",\"react-text-mask\":\"^5.4.3\",\"react-toastify\":\"^5.5.0\",\"shaka-player\":\"^2.5.11\",\"shaka-player-react\":\"^1.0.1\",\"shuffle-array\":\"^1.0.1\",\"slick-carousel\":\"^1.8.1\",\"styled-components\":\"^5.1.0\",\"video-react\":\"^0.14.1\",\"webpack\":\"^4.43.0\",\"yup\":\"^0.28.5\"},\"devDependencies\":{\"@zeit/next-source-maps\":\"0.0.4-canary.1\",\"babel-plugin-styled-components\":\"^1.10.7\",\"docz\":\"^2.3.1\",\"nodemon\":\"^2.0.4\",\"sleep-promise\":\"^8.0.1\"}}");

/***/ }),

/***/ "knb4":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/Spinner");

/***/ }),

/***/ "mpFN":
/***/ (function(module, exports) {

module.exports = require("glamor");

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("7KCV");

var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("Osoz");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error(`Error when running the Router event: ${eventField}`); // tslint:disable-next-line:no-console

          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "oAEb":
/***/ (function(module, exports) {

module.exports = require("react-toastify");

/***/ }),

/***/ "pLwp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3YKB");
/* harmony import */ var color__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("SibU");
/* harmony import */ var react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_ActiveLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("7NIq");
/* harmony import */ var _components_icons_chevron__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("SSxu");
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("gdJV");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_8__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const DesktopMenu = ({
  data: menus
}) => {
  function createMenuItem(menuItem) {
    let as_href, href;

    if (menuItem.link_type_id === 1) {
      href = menuItem.link;
    } else if (menuItem.link_type_id === 2) {
      href = '/category/[slug]';
      as_href = `/category/${menuItem.category && menuItem.category.slug}`;
    }

    return {
      as: as_href,
      href: href,
      label: menuItem.name,
      visibility: menuItem.private ? 'private' : 'public'
    };
  }

  function isExternalLink(str) {
    return str && (str.startsWith('//') || str.startsWith('http://') || str.startsWith('https://') || str.startsWith('www.'));
  }

  let menu = null;

  if (menus) {
    menu = [];
    menus.map(menuItem => {
      let dropdown;

      if (menuItem.children && menuItem.link_type_id === 3) {
        dropdown = [];
        menuItem.children.map(item => {
          const submenuItem = createMenuItem(item);
          dropdown.push(submenuItem);
        });
      }

      let myItem = createMenuItem(menuItem);
      myItem = _objectSpread({
        dropdown: dropdown
      }, myItem);
      menu.push(myItem);
    });
  }

  const {
    user
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_7__[/* default */ "b"]);
  const theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(styled_components__WEBPACK_IMPORTED_MODULE_8__["ThemeContext"]);
  const backgroundColor = color__WEBPACK_IMPORTED_MODULE_2___default()(theme.colors.background);
  const submenuColor = color__WEBPACK_IMPORTED_MODULE_2___default()(theme.colors.backgroundContrast).fade(.1).hsl().string();
  const submenuHoverColor = color__WEBPACK_IMPORTED_MODULE_2___default()(theme.colors.backgroundContrast).darken(.3).fade(.1).hsl().string();
  const textsColor = theme.colors.texts;
  return __jsx("ul", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["1187490472", [textsColor, backgroundColor, submenuHoverColor]]]) + " " + "menu d-none d-md-flex"
  }, menu ? __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, menu.map(({
    as,
    dropdown,
    href,
    label,
    visibility
  }, i) => {
    return (!visibility || visibility === 'public' || visibility === 'publicOnly' && !user || visibility === 'private' && user) && __jsx("li", {
      key: i,
      className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["1187490472", [textsColor, backgroundColor, submenuHoverColor]]])
    }, dropdown && dropdown.length ? __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a, null, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Toggle, {
      id: `dropdown-custom-${i}`
    }, label, __jsx(_components_icons_chevron__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
      alt: "",
      className: "chevron",
      dir: "bottom",
      height: "9",
      inline: true,
      width: "16"
    })), __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Menu, null, dropdown.map(({
      as: sub_as,
      href: sub_href,
      label: sub_label
    }, key) => isExternalLink(sub_href) ? __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Item, {
      href: sub_href,
      key: key,
      target: "_blank"
    }, sub_label) : __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      as: sub_as,
      href: sub_href,
      key: key,
      passHref: true
    }, __jsx(react_bootstrap_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.Item, {
      href: sub_as
    }, sub_label))))) : isExternalLink(href) ? __jsx("a", {
      href: href,
      target: "_blank",
      className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["1187490472", [textsColor, backgroundColor, submenuHoverColor]]])
    }, label) : __jsx(_components_ActiveLink__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      as: as,
      href: href != null && href != "" ? href : "/"
    }, __jsx("a", {
      className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["1187490472", [textsColor, backgroundColor, submenuHoverColor]]])
    }, label)));
  })) : __jsx("li", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["1187490472", [textsColor, backgroundColor, submenuHoverColor]]])
  }, "No se pueden cargar los men\xFAs"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1187490472",
    dynamic: [textsColor, backgroundColor, submenuHoverColor]
  }, [".menu.__jsx-style-dynamic-selector{display:none;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin:0 auto 0 0;padding-left:0;}", ".menu.__jsx-style-dynamic-selector li.__jsx-style-dynamic-selector{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}", ".menu.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector,.menu.__jsx-style-dynamic-selector .dropdown-toggle{background-color:transparent;border:0;color:#FFF;display:block;font-size:inherit;font-weight:inherit;padding:5px 10px;-webkit-text-decoration:none;text-decoration:none;-webkit-transition:color .2s;transition:color .2s;}", ".menu.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector:focus,.menu.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector:hover,.menu.__jsx-style-dynamic-selector a.active.__jsx-style-dynamic-selector,.menu.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector,.menu.__jsx-style-dynamic-selector .dropdown-toggle:focus,.menu.__jsx-style-dynamic-selector .dropdown-toggle:hover{background-color:transparent;box-shadow:none !important;color:#fff;cursor:pointer;}", ".menu.__jsx-style-dynamic-selector .dropdown-toggle::after{display:none;}", ".menu.__jsx-style-dynamic-selector .dropdown-toggle .chevron{display:inline-block;line-height:1;margin-left:10px;}", ".menu.__jsx-style-dynamic-selector .dropdown-toggle .chevron path{-webkit-transition:fill .2s;transition:fill .2s;}", ".menu.__jsx-style-dynamic-selector .dropdown-toggle:focus .chevron path,.menu.__jsx-style-dynamic-selector .dropdown-toggle:hover .chevron path{fill:var(--white);}", ".menu.__jsx-style-dynamic-selector .dropdown-menu{background-color:transparent;border:0;border-radius:0;color:#FFF;font-size:inherit;left:50% !important;margin-top:22px;padding-top:0;padding-bottom:0;text-align:center;-webkit-transform:translate3d(-50%,32px,0) !important;-ms-transform:translate3d(-50%,32px,0) !important;transform:translate3d(-50%,32px,0) !important;}", `.menu.__jsx-style-dynamic-selector .dropdown-item{background-color:${backgroundColor};border:.1px solid transparent;box-shadow:0 0 1px var(--black);color:#FFF;font-weight:inherit;padding:.33rem 1rem;-webkit-transition:background-color .2s,color .2s;transition:background-color .2s,color .2s;}`, `.menu.__jsx-style-dynamic-selector .dropdown-item:focus,.menu.__jsx-style-dynamic-selector .dropdown-item:hover{background-color:${submenuHoverColor};}`, ".menu.__jsx-style-dynamic-selector .dropdown-item:focus,.menu.__jsx-style-dynamic-selector .dropdown-item:hover,.menu.__jsx-style-dynamic-selector .dropdown-item.active{color:var(--white);}"]));
};

/* harmony default export */ __webpack_exports__["a"] = (DesktopMenu);

/***/ }),

/***/ "qqGZ":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap/Modal");

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

/***/ "rqZI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BLACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GRAY3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return WHITE; });
const BLACK = '#000';
const GRAY3 = '#333';
const WHITE = '#fff';

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
if (!process.env.TENANT) {
  throw new Error("Tenant undefined");
}
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

const TENANT = process.env.TENANT;
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

/***/ "sbNV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrEnterWith; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rOcY");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function OrEnterWith() {
  const orEnterWith = _config__WEBPACK_IMPORTED_MODULE_1__[/* CONFIG */ "b"].lang === 'es-CL' ? 'o bien, entra con' : 'o registrate con';
  return __jsx("div", {
    className: "or-enter-with"
  }, orEnterWith);
}

/***/ }),

/***/ "tNAg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MediaCard_MediaCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("MmX0");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


/* harmony default export */ __webpack_exports__["a"] = (({
  wishlist,
  category = null,
  medias
}) => {
  return __jsx("div", {
    className: "jsx-2014383929" + " " + "media-list row gutter-15"
  }, medias.map((media, key) => __jsx("div", _extends({
    key
  }, {
    className: "jsx-2014383929" + " " + "col-4 col-md-2"
  }), __jsx(_MediaCard_MediaCard__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    category,
    className: 'media-list__card',
    media,
    wishlist
  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "2014383929"
  }, [".media-list.jsx-2014383929 .media-list__card{margin-bottom:15px;}", "@media (min-width:768px){.media-list.jsx-2014383929{margin-bottom:45px;}.media-list.jsx-2014383929 .media-list__card{margin-bottom:30px;}}"]));
});

/***/ }),

/***/ "uhWA":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "vm/7":
/***/ (function(module) {

module.exports = JSON.parse("{\"colocolo\":{\"appName\":\"Colo-Colo\",\"clubName\":\"Colo-Colo\",\"fullClubName\":\"Club Social y Deportivo Colo-Colo\",\"shortClubName\":\"Colo-Colo\",\"supportersAKA\":\"Albos\",\"color\":\"#e12213\",\"secondaryColor\":\"#005d9c\",\"site\":\"//www.colocolo.cl/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/colocolo/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/colocolooficial/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/colocolo\"}],\"googleAnalytics\":null,\"apiUrl\":\"https://admin.rivermas.com\",\"lang\":\"es-CL\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#808080\",\"textColor\":\"#b2b2b2\"},\"dalecacique\":{\"appName\":\"Dale Cacique\",\"clubName\":\"Colo-Colo\",\"fullClubName\":\"Club Social y Deportivo Colo-Colo\",\"shortClubName\":\"Colo-Colo\",\"supportersAKA\":\"Albos\",\"color\":\"#e12213\",\"secondaryColor\":\"#005d9c\",\"site\":\"//www.colocolo.cl/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/colocolo/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/colocolooficial/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/colocolo\"}],\"googleAnalytics\":null,\"apiUrl\":\"https://admin.rivermas.com\",\"lang\":\"es-CL\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#808080\",\"textColor\":\"#b2b2b2\"},\"river\":{\"appName\":\"River Mas\",\"clubName\":\"River Plate\",\"fullClubName\":\"Club Atlético River Plate\",\"shortClubName\":\"River\",\"supportersAKA\":\"RiverPlatenses\",\"color\":\"#ff0000\",\"secondaryColor\":\"#fff\",\"site\":\"https://www.cariverplate.com.ar/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/riverplateoficial/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/riverplate/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/RiverPlate\"}],\"googleAnalytics\":\"UA-146274840-2\",\"apiUrl\":\"https://admin.rivermas.com\",\"lang\":\"es\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#808080\",\"textColor\":\"#b2b2b2\"},\"lau\":{\"appName\":\"La U Play\",\"projectName\":\"La U Play\",\"clubName\":\"Universidad de Chile\",\"fullClubName\":\"Club Universidad de Chile\",\"shortClubName\":\"La U\",\"prefixAppName\":\"La U\",\"suffixAppName\":\"Play\",\"supportersAKA\":\"Universitários\",\"color\":\"#D80000\",\"secondaryColor\":\"#000\",\"site\":\"https://www.udechile.cl/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/ClubUniversidadDeChileOficial\"},{\"name\":\"Instagram\",\"link\":\"https://instagram.com/udechileoficial\"},{\"name\":\"Twitter\",\"link\":\"https://www.twitter.com/udechile\"}],\"googleAnalytics\":\"UA-146274840-3\",\"apiUrl\":\"https://lau.dowhile.com.br\",\"lang\":\"es-CL\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000c33\",\"backgroundContrastColor\":\"#1a1a1a\",\"backgroundContrastColor2\":\"#293989\",\"textColor\":\"#bec3db\"},\"atlnacional\":{\"appName\":\"Nacional Play\",\"clubName\":\"Atlético Nacional\",\"fullClubName\":\"Atlético Nacional\",\"shortClubName\":\"Atl. Nacional\",\"supportersAKA\":\"Atl Nacional\",\"color\":\"#008C3E\",\"secondaryColor\":\"#000\",\"site\":\"https://www.atlnacional.com.co/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/nacionaloficial/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/nacionaloficial/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/nacionaloficial\"}],\"googleAnalytics\":\"\",\"apiUrl\":\"https://atlnacional.dowhile.com.br\",\"lang\":\"es-Co\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000\",\"backgroundContrastColor\":\"#000\",\"backgroundContrastColor2\":\"#005a26\",\"textColor\":\"#c5dbbe\"},\"independiente\":{\"appName\":\"Club Atlético Independiente\",\"clubName\":\"Club Atlético Independiente\",\"fullClubName\":\"Independiente\",\"shortClubName\":\"Independiente\",\"supportersAKA\":\"Independiente\",\"color\":\"#ec1c24\",\"secondaryColor\":\"#000\",\"site\":\"http://www.clubaindependiente.com/\",\"socialNetworks\":[{\"name\":\"Facebook\",\"link\":\"https://www.facebook.com/Independiente/\"},{\"name\":\"Instagram\",\"link\":\"https://www.instagram.com/caindependiente/\"},{\"name\":\"Twitter\",\"link\":\"https://twitter.com/independiente\"}],\"googleAnalytics\":\"\",\"apiUrl\":\"https://independiente.dowhile.com.br\",\"lang\":\"es-AR\",\"loadingColor\":\"primary\",\"backgroundColor\":\"#000000\",\"backgroundContrastColor\":\"#000000\",\"backgroundContrastColor2\":\"#99090D\",\"textColor\":\"#ffffff\"}}");

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });
//# sourceMappingURL=wishlist.js.map