/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SharePlace.js":
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Modal */ \"./src/UI/Modal.js\");\n\r\n\r\nclass PlaceFinder {\r\n  constructor() {\r\n    const addressForm = document.querySelector(\"form\");\r\n    const locateUserBtn = document.querySelector(\"#locate-btn\");\r\n\r\n    locateUserBtn.addEventListener(\"click\", this.locateUserHandler);\r\n    addressForm.addEventListener(\"click\", this.findAddressHandler);\r\n  }\r\n\r\n  locateUserHandler() {\r\n    if (!navigator.geolocation) {\r\n      alert(\r\n        \"Your current browser version doesn't support location feature, please use a mordern version of the browser\"\r\n      );\r\n      return;\r\n    }\r\n\r\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__.Modal('loading-modal-content', 'Please update the brpwser version - your current browser version doesn\\'t the feature');\r\n    modal.show();\r\n    navigator.geolocation.getCurrentPosition(\r\n      (success) => {\r\n        modal.hide();\r\n        const coordinates = {\r\n          latitude: success.coords.latitude,\r\n          longitude: success.coords.longitude,\r\n        };\r\n        console.log(coordinates);\r\n      },\r\n      (error) => {\r\n        modal.hide();\r\n        alert(\"Please enter user location coordinates!\");\r\n      }\r\n    );\r\n  }\r\n}\r\n\r\nnew PlaceFinder();\n\n//# sourceURL=webpack://my-place/./src/SharePlace.js?");

/***/ }),

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Modal\": function() { return /* binding */ Modal; }\n/* harmony export */ });\nclass Modal {\r\n    constructor (contentId, fallbackText) {\r\n        this.fallbackText = fallbackText;\r\n        this.contentTemplateEl = document.getElementById(contentId);\r\n        this.modalTemplateEl = document.getElementById('modal-template');\r\n    }\r\n\r\n    show() {\r\n        if('content' in document.createElement('template')) {\r\n            const modalElements = document.importNode(this.modalTemplateEl.content, true);\r\n            this.modalElement = modalElements.querySelector('.modal');\r\n            this.backdropElement = modalElements.querySelector('.backdrop');\r\n            const contentElement = document.importNode(this.contentTemplateEl.content, true);\r\n\r\n            this.modalElement.appendChild(contentElement);\r\n            document.body.insertAdjacentElement('afterbegin', this.modalElement);\r\n            document.body.insertAdjacentElement('afterbegin', this.backdropElement);\r\n        } else {\r\n            alert(this.fallbackText);\r\n        }\r\n    }\r\n\r\n    hide() {\r\n        document.body.removeChild(this.modalElement);\r\n        document.body.removeChild(this.backdropElement);\r\n        this.modalElement = null;\r\n        this.backdropElement = null;\r\n    }\r\n}\n\n//# sourceURL=webpack://my-place/./src/UI/Modal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/SharePlace.js");
/******/ 	
/******/ })()
;