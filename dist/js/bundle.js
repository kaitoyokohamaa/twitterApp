/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_userlogin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/userlogin */ \"./src/js/models/userlogin.js\");\n\n\nconst sendHttpRequest = (method, url, data) => {\n  return fetch(url, {\n    method: method,\n    body: JSON.stringify(data),\n    headers: data ? {\n      'Content-Type': 'application/json'\n    } : {}\n  }).then(response => {\n    if (response.status >= 400) {\n      // !response.ok\n      return response.json().then(errResData => {\n        const error = new Error('Something went wrong!');\n        error.data = errResData;\n        throw error;\n      });\n    }\n    return response.json();\n  });\n};\nconst sendData = () => {\n  sendHttpRequest('POST', 'https://teachapi.herokuapp.com/sign_up', {\n      \"sign_up_user_params\": {\n        \"name\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_name\"].value,\n        \"bio\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_bio\"].value,\n        \"email\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_mail\"].value,\n        \"password\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_pass\"].value,\n        \"password_confirmation\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_confirmpass\"].value\n      }\n    })\n    .then(json => {\n      //ユーザ生成時に以下の情報をローカルストレージに入れる。\n      localStorage.token = json.token,\n        localStorage.id = json.id,\n        localStorage.name = json.name,\n        localStorage.bio = json.bio\n      window.location.href = 'timeline.html';\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n\n    .catch(err => {\n      console.log(err, err.data);\n    });\n};\n\nif (_models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postBtn\"]) {\n  _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postBtn\"].addEventListener('click', sendData);\n}\n\n\n// ユーザーログイン\nconst sendHttpRequestlg = (method, url, data) => {\n  return fetch(url, {\n    method: method,\n    body: JSON.stringify(data),\n    headers: data ? {\n      'Content-Type': 'application/json'\n    } : {}\n  }).then(response => {\n    if (response.status >= 400) {\n      // !response.ok\n      return response.json().then(errResData => {\n        const error = new Error('Something went wrong!');\n        error.data = errResData;\n        throw error;\n      });\n    }\n    return response.json();\n  });\n};\nconst sendlgData = () => {\n  sendHttpRequestlg('POST', 'https://teachapi.herokuapp.com/sign_in', {\n      \"sign_in_user_params\": {\n        \"email\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_maillg\"].value,\n        \"password\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_pass\"].value,\n        \"password_confirmation\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_confirmpass\"].value\n      }\n    })\n    .then(json => {\n      localStorage.token = json.token,\n        localStorage.id = json.id,\n        localStorage.name = json.name,\n        localStorage.bio = json.bio\n      window.location.href = 'timeline.html';\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n\n    .catch(err => {\n      console.log(err, err.data);\n    });\n};\nif (_models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postlgBtn\"]) {\n  _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postlgBtn\"].addEventListener('click', sendlgData);\n}\n\n// ユーザー一覧\nconst getinfo = document.getElementById('post-lgtbtn');\n\nif (!localStorage.token) {\n  window.location.href = 'login.html';\n}\n\nconst sendHttpRequestlgt = (method, url) => {\n  return fetch(url, {\n      method: method,\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      }\n    })\n    .then(response => {\n      if (response.status >= 400) {\n        // !response.ok\n        return response.json()\n          .then(errResData => {\n            const error = new Error('Something went wrong!');\n            error.data = errResData;\n            throw error;\n          });\n      }\n      return response.json();\n    });\n};\nconst sendlgdData = () => {\n  sendHttpRequestlgt('GET', 'https://teachapi.herokuapp.com/users')\n    .then(json => {\n      const markup = `<div class=\"col mb-4\"><div class=\"card h-100\"><img src=\"img/ryusei.jpg\" class=\"card-img-top\" alt=\"...\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">${localStorage.name}</h5>\n          <p class=\"acount\">＠${localStorage.token}</p>\n          <p class=\"card-text\">${localStorage.bio}</p>\n        </div>\n      </div>\n    </div>`;\n      const h=document.getElementById('userrs');\n      h.insertAdjacentHTML('beforeend', markup);\n      console.log(json.stringify);\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n};\n\nif (getinfo) {\n  getinfo.addEventListener('click', sendlgdData);\n}\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/models/userlogin.js":
/*!************************************!*\
  !*** ./src/js/models/userlogin.js ***!
  \************************************/
/*! exports provided: postBtn, user_name, user_bio, user_mail, user_maillg, user_pass, user_confirmpass, postlgBtn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postBtn\", function() { return postBtn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_name\", function() { return user_name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_bio\", function() { return user_bio; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_mail\", function() { return user_mail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_maillg\", function() { return user_maillg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_pass\", function() { return user_pass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_confirmpass\", function() { return user_confirmpass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postlgBtn\", function() { return postlgBtn; });\n// いらない変数ども\nconst postBtn = document.getElementById('post-btn');\nconst user_name=document.getElementById('UserName');\nconst user_bio=document.getElementById('User');\nconst user_mail=document.getElementById('Email');\nconst user_maillg=document.getElementById('email');\nconst user_pass=document.getElementById('Password');\nconst user_confirmpass=document.getElementById('ConfirmPassword');\nconst postlgBtn = document.getElementById('post-lgbtn');\n\n\n\n\n//# sourceURL=webpack:///./src/js/models/userlogin.js?");

/***/ })

/******/ });