"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/login",{

/***/ "./utils/firebase.js":
/*!***************************!*\
  !*** ./utils/firebase.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"firebaseCloudMessaging\": function() { return /* binding */ firebaseCloudMessaging; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"../../node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var _swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_ts_generator.mjs */ \"../../node_modules/@swc/helpers/src/_ts_generator.mjs\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! localforage */ \"../../node_modules/localforage/dist/localforage.js\");\n/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/compat/app */ \"../../node_modules/firebase/compat/app/dist/index.esm.js\");\n/* harmony import */ var firebase_compat_messaging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/messaging */ \"../../node_modules/firebase/compat/messaging/dist/index.esm.js\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ \"../../node_modules/firebase/app/dist/index.esm.js\");\n\n\n\n\n\n\nvar firebaseCloudMessaging = {\n    init: /*#__PURE__*/ (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(function() {\n        var messaging, tokenInLocalForage, status, fcm_token, error;\n        return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, function(_state) {\n            switch(_state.label){\n                case 0:\n                    if (!((0,firebase_app__WEBPACK_IMPORTED_MODULE_3__.getApps)().length < 1)) return [\n                        3,\n                        7\n                    ];\n                    firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"] === null || firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"] === void 0 ? void 0 : firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"].initializeApp({\n                        apiKey: \"AIzaSyCHPWQlqvYhMx6DNKhtpr_-VKalMKQ_1MY\",\n                        authDomain: \"taxi-booking-nx.firebaseapp.com\",\n                        projectId: \"taxi-booking-nx\",\n                        storageBucket: \"taxi-booking-nx.appspot.com\",\n                        messagingSenderId: \"90443000925\",\n                        appId: \"1:90443000925:web:545b50d1e0c72ba53831b4\"\n                    });\n                    _state.label = 1;\n                case 1:\n                    _state.trys.push([\n                        1,\n                        6,\n                        ,\n                        7\n                    ]);\n                    messaging = firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__[\"default\"].messaging();\n                    return [\n                        4,\n                        localforage__WEBPACK_IMPORTED_MODULE_0___default().getItem(\"fcm_token\")\n                    ];\n                case 2:\n                    tokenInLocalForage = _state.sent();\n                    // Return the token if it is alredy in our local storage\n                    if (tokenInLocalForage !== null) {\n                        return [\n                            2,\n                            tokenInLocalForage\n                        ];\n                    }\n                    return [\n                        4,\n                        Notification.requestPermission()\n                    ];\n                case 3:\n                    status = _state.sent();\n                    if (!(status && status === \"granted\")) return [\n                        3,\n                        5\n                    ];\n                    return [\n                        4,\n                        messaging.getToken({\n                            vapidKey: \"BOuC2coiwhqrSJGV0Zd2YEyAr5m8ehmDHpxWPHJza9EqFClpK7XtHDKFBtqvJJ1tDZ-k8oVjdoiclrnwDOAROzc\"\n                        })\n                    ];\n                case 4:\n                    fcm_token = _state.sent();\n                    console.log(\"fcm_token\", fcm_token);\n                    // Set token in our local storage\n                    if (fcm_token) {\n                        localforage__WEBPACK_IMPORTED_MODULE_0___default().setItem(\"fcm_token\", fcm_token);\n                        return [\n                            2,\n                            fcm_token\n                        ];\n                    }\n                    _state.label = 5;\n                case 5:\n                    return [\n                        3,\n                        7\n                    ];\n                case 6:\n                    error = _state.sent();\n                    console.error(error);\n                    return [\n                        2,\n                        null\n                    ];\n                case 7:\n                    return [\n                        2\n                    ];\n            }\n        });\n    })\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9maXJlYmFzZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUFzQztBQUNLO0FBQ1I7QUFDSTtBQUVoQyxJQUFNRyxzQkFBc0IsR0FBRztJQUNwQ0MsSUFBSSxnQkFBRSwrRkFBWTtZQVlOQyxTQUFTLEVBQ1RDLGtCQUFrQixFQU9sQkMsTUFBTSxFQUdKQyxTQUFTLEVBWVZDLEtBQUs7Ozs7eUJBbENaUCxDQUFBQSxxREFBTyxFQUFFLENBQUNRLE1BQU0sR0FBRyxDQUFDLEdBQXBCUjs7O3NCQUFvQjtvQkFDdEJELDJEQUFRLGFBQVJBLDJEQUFRLFdBQWUsR0FBdkJBLEtBQUFBLENBQXVCLEdBQXZCQSx5RUFBdUIsQ0FBQzt3QkFDdEJXLE1BQU0sRUFBRSx5Q0FBeUM7d0JBQ2pEQyxVQUFVLEVBQUUsaUNBQWlDO3dCQUM3Q0MsU0FBUyxFQUFFLGlCQUFpQjt3QkFDNUJDLGFBQWEsRUFBRSw2QkFBNkI7d0JBQzVDQyxpQkFBaUIsRUFBRSxhQUFhO3dCQUNoQ0MsS0FBSyxFQUFFLDBDQUEwQztxQkFDbEQsQ0FBQyxDQUFDOzs7Ozs7Ozs7b0JBR0taLFNBQVMsR0FBR0oscUVBQWtCLEVBQUUsQ0FBQztvQkFDWjs7d0JBQU1ELDBEQUFtQixDQUFDLFdBQVcsQ0FBQztzQkFBQTs7b0JBQTNETSxrQkFBa0IsR0FBRyxhQUFzQztvQkFDakUsd0RBQXdEO29CQUN4RCxJQUFJQSxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7d0JBQy9COzs0QkFBT0Esa0JBQWtCOzBCQUFDO29CQUM1QixDQUFDO29CQUdjOzt3QkFBTWEsWUFBWSxDQUFDQyxpQkFBaUIsRUFBRTtzQkFBQTs7b0JBQS9DYixNQUFNLEdBQUcsYUFBc0M7eUJBQ2pEQSxDQUFBQSxNQUFNLElBQUlBLE1BQU0sS0FBSyxTQUFTLEdBQTlCQTs7O3NCQUE4QjtvQkFFZDs7d0JBQU1GLFNBQVMsQ0FBQ2dCLFFBQVEsQ0FBQzs0QkFDekNDLFFBQVEsRUFDTix5RkFBeUY7eUJBQzVGLENBQUM7c0JBQUE7O29CQUhJZCxTQUFTLEdBQUcsYUFHaEI7b0JBQ0ZlLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsRUFBRWhCLFNBQVMsQ0FBQztvQkFFbkMsaUNBQWlDO29CQUNqQyxJQUFJQSxTQUFTLEVBQUU7d0JBQ2JSLDBEQUFtQixDQUFDLFdBQVcsRUFBRVEsU0FBUyxDQUFDLENBQUM7d0JBQzVDOzs0QkFBT0EsU0FBUzswQkFBQztvQkFDbkIsQ0FBQzs7Ozs7Ozs7b0JBRUlDLEtBQUs7b0JBQ1pjLE9BQU8sQ0FBQ2QsS0FBSyxDQUFDQSxLQUFLLENBQUMsQ0FBQztvQkFDckI7O3dCQUFPLElBQUk7c0JBQUM7Ozs7Ozs7SUFHbEIsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvZmlyZWJhc2UuanM/NTI3YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9jYWxmb3JhZ2UgZnJvbSAnbG9jYWxmb3JhZ2UnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0ICdmaXJlYmFzZS9jb21wYXQvbWVzc2FnaW5nJztcbmltcG9ydCB7IGdldEFwcHMgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5leHBvcnQgY29uc3QgZmlyZWJhc2VDbG91ZE1lc3NhZ2luZyA9IHtcbiAgaW5pdDogYXN5bmMgKCkgPT4ge1xuICAgIGlmIChnZXRBcHBzKCkubGVuZ3RoIDwgMSkge1xuICAgICAgZmlyZWJhc2U/LmluaXRpYWxpemVBcHAoe1xuICAgICAgICBhcGlLZXk6ICdBSXphU3lDSFBXUWxxdlloTXg2RE5LaHRwcl8tVkthbE1LUV8xTVknLFxuICAgICAgICBhdXRoRG9tYWluOiAndGF4aS1ib29raW5nLW54LmZpcmViYXNlYXBwLmNvbScsXG4gICAgICAgIHByb2plY3RJZDogJ3RheGktYm9va2luZy1ueCcsXG4gICAgICAgIHN0b3JhZ2VCdWNrZXQ6ICd0YXhpLWJvb2tpbmctbnguYXBwc3BvdC5jb20nLFxuICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogJzkwNDQzMDAwOTI1JyxcbiAgICAgICAgYXBwSWQ6ICcxOjkwNDQzMDAwOTI1OndlYjo1NDViNTBkMWUwYzcyYmE1MzgzMWI0JyxcbiAgICAgIH0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtZXNzYWdpbmcgPSBmaXJlYmFzZS5tZXNzYWdpbmcoKTtcbiAgICAgICAgY29uc3QgdG9rZW5JbkxvY2FsRm9yYWdlID0gYXdhaXQgbG9jYWxmb3JhZ2UuZ2V0SXRlbSgnZmNtX3Rva2VuJyk7XG4gICAgICAgIC8vIFJldHVybiB0aGUgdG9rZW4gaWYgaXQgaXMgYWxyZWR5IGluIG91ciBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGlmICh0b2tlbkluTG9jYWxGb3JhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW5JbkxvY2FsRm9yYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVxdWVzdCB0aGUgcHVzaCBub3RpZmljYXRpb24gcGVybWlzc2lvbiBmcm9tIGJyb3dzZXJcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzID09PSAnZ3JhbnRlZCcpIHtcbiAgICAgICAgICAvLyBHZXQgbmV3IHRva2VuIGZyb20gRmlyZWJhc2VcbiAgICAgICAgICBjb25zdCBmY21fdG9rZW4gPSBhd2FpdCBtZXNzYWdpbmcuZ2V0VG9rZW4oe1xuICAgICAgICAgICAgdmFwaWRLZXk6XG4gICAgICAgICAgICAgICdCT3VDMmNvaXdocXJTSkdWMFpkMllFeUFyNW04ZWhtREhweFdQSEp6YTlFcUZDbHBLN1h0SERLRkJ0cXZKSjF0RFotazhvVmpkb2ljbHJud0RPQVJPemMnLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdmY21fdG9rZW4nLCBmY21fdG9rZW4pXG5cbiAgICAgICAgICAvLyBTZXQgdG9rZW4gaW4gb3VyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICBpZiAoZmNtX3Rva2VuKSB7XG4gICAgICAgICAgICBsb2NhbGZvcmFnZS5zZXRJdGVtKCdmY21fdG9rZW4nLCBmY21fdG9rZW4pO1xuICAgICAgICAgICAgcmV0dXJuIGZjbV90b2tlbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbImxvY2FsZm9yYWdlIiwiZmlyZWJhc2UiLCJnZXRBcHBzIiwiZmlyZWJhc2VDbG91ZE1lc3NhZ2luZyIsImluaXQiLCJtZXNzYWdpbmciLCJ0b2tlbkluTG9jYWxGb3JhZ2UiLCJzdGF0dXMiLCJmY21fdG9rZW4iLCJlcnJvciIsImxlbmd0aCIsImluaXRpYWxpemVBcHAiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJnZXRJdGVtIiwiTm90aWZpY2F0aW9uIiwicmVxdWVzdFBlcm1pc3Npb24iLCJnZXRUb2tlbiIsInZhcGlkS2V5IiwiY29uc29sZSIsImxvZyIsInNldEl0ZW0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/firebase.js\n"));

/***/ })

});