/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/WebsocketContext.tsx":
/*!***************************************!*\
  !*** ./contexts/WebsocketContext.tsx ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WebsocketContext\": () => (/* binding */ WebsocketContext),\n/* harmony export */   \"WebsocketProvider\": () => (/* binding */ WebsocketProvider),\n/* harmony export */   \"socket\": () => (/* binding */ socket)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ \"socket.io-client\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io_client__WEBPACK_IMPORTED_MODULE_1__]);\nsocket_io_client__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__.io)(\"http://localhost:3000\");\nconst WebsocketContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(socket);\nconst WebsocketProvider = WebsocketContext.Provider;\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9XZWJzb2NrZXRDb250ZXh0LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBc0M7QUFDUTtBQUV2QyxNQUFNRSxNQUFNLEdBQUdELG9EQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUMzQyxNQUFNRSxnQkFBZ0IsaUJBQUdILG9EQUFhLENBQVNFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELE1BQU1FLGlCQUFpQixHQUFHRCxnQkFBZ0IsQ0FBQ0UsUUFBUSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29udGV4dHMvV2Vic29ja2V0Q29udGV4dC50c3g/NDliOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBpbywgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XHJcblxyXG5leHBvcnQgY29uc3Qgc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpO1xyXG5leHBvcnQgY29uc3QgV2Vic29ja2V0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8U29ja2V0Pihzb2NrZXQpO1xyXG5leHBvcnQgY29uc3QgV2Vic29ja2V0UHJvdmlkZXIgPSBXZWJzb2NrZXRDb250ZXh0LlByb3ZpZGVyO1xyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsImlvIiwic29ja2V0IiwiV2Vic29ja2V0Q29udGV4dCIsIldlYnNvY2tldFByb3ZpZGVyIiwiUHJvdmlkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./contexts/WebsocketContext.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ \"./pages/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_WebsocketContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @@contexts/WebsocketContext */ \"./contexts/WebsocketContext.tsx\");\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @@store/store */ \"./store/store.ts\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-persist/integration/react */ \"redux-persist/integration/react\");\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contexts_WebsocketContext__WEBPACK_IMPORTED_MODULE_3__]);\n_contexts_WebsocketContext__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\nfunction CustomApp({ Component , pageProps  }) {\n    const { persistor , store  } = (0,_store_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_5__.Provider, {\n        store: store,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Driver App\"\n                }, void 0, false, {\n                    fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                    lineNumber: 15,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_6__.PersistGate, {\n                loading: null,\n                persistor: persistor,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_WebsocketContext__WEBPACK_IMPORTED_MODULE_3__.WebsocketProvider, {\n                    value: _contexts_WebsocketContext__WEBPACK_IMPORTED_MODULE_3__.socket,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"wrapper_img\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                            className: \"app\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"wrapper\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                                    ...pageProps\n                                }, void 0, false, {\n                                    fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                                    lineNumber: 22,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                                lineNumber: 21,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                            lineNumber: 20,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                        lineNumber: 19,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                    lineNumber: 18,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"H:\\\\taxi-booking-project-nx\\\\apps\\\\driver-app\\\\pages\\\\_app.tsx\",\n        lineNumber: 13,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDNkI7QUFDUDtBQUNrRDtBQUNqQztBQUNBO0FBQ3VCO0FBRTlELFNBQVNNLFNBQVMsQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBWSxFQUFFO0lBQ3JELE1BQU0sRUFBRUMsU0FBUyxHQUFFQyxLQUFLLEdBQUUsR0FBR1Asd0RBQVUsRUFBRTtJQUV6QyxxQkFDRSw4REFBQ0MsaURBQVE7UUFBQ00sS0FBSyxFQUFFQSxLQUFLOzswQkFDcEIsOERBQUNWLGtEQUFJOzBCQUNILDRFQUFDVyxPQUFLOzhCQUFDLFlBQVU7Ozs7O3dCQUFROzs7OztvQkFDcEI7MEJBQ1AsOERBQUNOLHdFQUFXO2dCQUFDTyxPQUFPLEVBQUUsSUFBSTtnQkFBRUgsU0FBUyxFQUFFQSxTQUFTOzBCQUM5Qyw0RUFBQ1AseUVBQWlCO29CQUFDVyxLQUFLLEVBQUVaLDhEQUFNOzhCQUM5Qiw0RUFBQ2EsS0FBRzt3QkFBQ0MsU0FBUyxFQUFDLGFBQWE7a0NBQzFCLDRFQUFDQyxNQUFJOzRCQUFDRCxTQUFTLEVBQUMsS0FBSztzQ0FDbkIsNEVBQUNELEtBQUc7Z0NBQUNDLFNBQVMsRUFBQyxTQUFTOzBDQUN0Qiw0RUFBQ1IsU0FBUztvQ0FBRSxHQUFHQyxTQUFTOzs7Ozt3Q0FBSTs7Ozs7b0NBQ3hCOzs7OztnQ0FDRDs7Ozs7NEJBQ0g7Ozs7O3dCQUNZOzs7OztvQkFDUjs7Ozs7O1lBQ0wsQ0FDWDtBQUNKLENBQUM7QUFFRCxpRUFBZUYsU0FBUyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xyXG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XHJcbmltcG9ydCBcIi4vc3R5bGVzLmNzc1wiO1xyXG5pbXBvcnQgeyBzb2NrZXQsIFdlYnNvY2tldFByb3ZpZGVyIH0gZnJvbSBcIkBAY29udGV4dHMvV2Vic29ja2V0Q29udGV4dFwiO1xyXG5pbXBvcnQgcmVkdXhTdG9yZSBmcm9tIFwiQEBzdG9yZS9zdG9yZVwiO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0R2F0ZSB9IGZyb20gXCJyZWR1eC1wZXJzaXN0L2ludGVncmF0aW9uL3JlYWN0XCI7XHJcblxyXG5mdW5jdGlvbiBDdXN0b21BcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xyXG4gIGNvbnN0IHsgcGVyc2lzdG9yLCBzdG9yZSB9ID0gcmVkdXhTdG9yZSgpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIDx0aXRsZT5Ecml2ZXIgQXBwPC90aXRsZT5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8UGVyc2lzdEdhdGUgbG9hZGluZz17bnVsbH0gcGVyc2lzdG9yPXtwZXJzaXN0b3J9PlxyXG4gICAgICAgIDxXZWJzb2NrZXRQcm92aWRlciB2YWx1ZT17c29ja2V0fT5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid3JhcHBlcl9pbWdcIj5cclxuICAgICAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiYXBwXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbWFpbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvV2Vic29ja2V0UHJvdmlkZXI+XHJcbiAgICAgIDwvUGVyc2lzdEdhdGU+XHJcbiAgICA8L1Byb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1c3RvbUFwcDtcclxuIl0sIm5hbWVzIjpbIkhlYWQiLCJzb2NrZXQiLCJXZWJzb2NrZXRQcm92aWRlciIsInJlZHV4U3RvcmUiLCJQcm92aWRlciIsIlBlcnNpc3RHYXRlIiwiQ3VzdG9tQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicGVyc2lzdG9yIiwic3RvcmUiLCJ0aXRsZSIsImxvYWRpbmciLCJ2YWx1ZSIsImRpdiIsImNsYXNzTmFtZSIsIm1haW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./store/api.ts":
/*!**********************!*\
  !*** ./store/api.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useSignInMutation\": () => (/* binding */ useSignInMutation),\n/* harmony export */   \"userApi\": () => (/* binding */ userApi)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit/query/react */ \"@reduxjs/toolkit/query/react\");\n/* harmony import */ var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__);\n// Need to use the React-specific entry point to import createApi\n\nconst userApi = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({\n    reducerPath: \"userApi\",\n    baseQuery: (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({\n        baseUrl: \"http://localhost:3000/api\"\n    }),\n    endpoints: (builder)=>({\n            signIn: builder.mutation({\n                query: (body)=>({\n                        url: \"/driver/sign-in\",\n                        method: \"POST\",\n                        body\n                    })\n            })\n        })\n});\nconst { useSignInMutation  } = userApi;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9hcGkudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLGlFQUFpRTtBQUNRO0FBT2xFLE1BQU1FLE9BQU8sR0FBR0YsdUVBQVMsQ0FBQztJQUMvQkcsV0FBVyxFQUFFLFNBQVM7SUFDdEJDLFNBQVMsRUFBRUgsNEVBQWMsQ0FBQztRQUN4QkksT0FBTyxFQUFFLDJCQUEyQjtLQUNyQyxDQUFDO0lBRUZDLFNBQVMsRUFBRSxDQUFDQyxPQUFPLEdBQU07WUFDdkJDLE1BQU0sRUFBRUQsT0FBTyxDQUFDRSxRQUFRLENBQUM7Z0JBQ3ZCQyxLQUFLLEVBQUUsQ0FBQ0MsSUFBZ0IsR0FBTTt3QkFDNUJDLEdBQUcsRUFBRSxpQkFBaUI7d0JBQ3RCQyxNQUFNLEVBQUUsTUFBTTt3QkFDZEYsSUFBSTtxQkFDTDthQUNGLENBQUM7U0FDSDtDQUNGLENBQUMsQ0FBQztBQUVJLE1BQU0sRUFBRUcsaUJBQWlCLEdBQUUsR0FBR1osT0FBTyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3RvcmUvYXBpLnRzPzcxY2EiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTmVlZCB0byB1c2UgdGhlIFJlYWN0LXNwZWNpZmljIGVudHJ5IHBvaW50IHRvIGltcG9ydCBjcmVhdGVBcGlcclxuaW1wb3J0IHsgY3JlYXRlQXBpLCBmZXRjaEJhc2VRdWVyeSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0L3F1ZXJ5L3JlYWN0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25JbkJvZHkge1xyXG4gIHBob25lOiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJBcGkgPSBjcmVhdGVBcGkoe1xyXG4gIHJlZHVjZXJQYXRoOiBcInVzZXJBcGlcIixcclxuICBiYXNlUXVlcnk6IGZldGNoQmFzZVF1ZXJ5KHtcclxuICAgIGJhc2VVcmw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaVwiLFxyXG4gIH0pLFxyXG5cclxuICBlbmRwb2ludHM6IChidWlsZGVyKSA9PiAoe1xyXG4gICAgc2lnbkluOiBidWlsZGVyLm11dGF0aW9uKHtcclxuICAgICAgcXVlcnk6IChib2R5OiBTaWduSW5Cb2R5KSA9PiAoe1xyXG4gICAgICAgIHVybDogXCIvZHJpdmVyL3NpZ24taW5cIixcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHksXHJcbiAgICAgIH0pLFxyXG4gICAgfSksXHJcbiAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHsgdXNlU2lnbkluTXV0YXRpb24gfSA9IHVzZXJBcGk7XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVBcGkiLCJmZXRjaEJhc2VRdWVyeSIsInVzZXJBcGkiLCJyZWR1Y2VyUGF0aCIsImJhc2VRdWVyeSIsImJhc2VVcmwiLCJlbmRwb2ludHMiLCJidWlsZGVyIiwic2lnbkluIiwibXV0YXRpb24iLCJxdWVyeSIsImJvZHkiLCJ1cmwiLCJtZXRob2QiLCJ1c2VTaWduSW5NdXRhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/api.ts\n");

/***/ }),

/***/ "./store/appSlice.ts":
/*!***************************!*\
  !*** ./store/appSlice.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"appSlice\": () => (/* binding */ appSlice),\n/* harmony export */   \"clearStore\": () => (/* binding */ clearStore),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"setAuthorized\": () => (/* binding */ setAuthorized),\n/* harmony export */   \"setDriver\": () => (/* binding */ setDriver)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-redux-wrapper */ \"next-redux-wrapper\");\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst initialState = {\n    driver: {\n        id: null,\n        name: null,\n        phone: null,\n        status: null,\n        carName: null,\n        carType: null,\n        carLicense: null,\n        currentAddress: null\n    },\n    authorized: false\n};\nconst appSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"app\",\n    initialState,\n    reducers: {\n        clearStore: ()=>initialState,\n        setDriver: (state, action)=>{\n            state.driver = action.payload;\n        },\n        setAuthorized: (state, action)=>{\n            state.authorized = action.payload;\n        }\n    },\n    // Special reducer for hydrating the state. Special case for next-redux-wrapper\n    extraReducers: {\n        [next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__.HYDRATE]: (state, action)=>{\n            return {\n                ...state,\n                ...action.payload.app\n            };\n        }\n    }\n});\nconst { clearStore , setDriver , setAuthorized  } = appSlice.actions;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appSlice.reducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9hcHBTbGljZS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBOEQ7QUFDakI7QUFFN0MsTUFBTUUsWUFBWSxHQUFHO0lBQ25CQyxNQUFNLEVBQUU7UUFDTkMsRUFBRSxFQUFFLElBQUk7UUFDUkMsSUFBSSxFQUFFLElBQUk7UUFDVkMsS0FBSyxFQUFFLElBQUk7UUFDWEMsTUFBTSxFQUFFLElBQUk7UUFDWkMsT0FBTyxFQUFFLElBQUk7UUFDYkMsT0FBTyxFQUFFLElBQUk7UUFDYkMsVUFBVSxFQUFFLElBQUk7UUFDaEJDLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0RDLFVBQVUsRUFBRSxLQUFLO0NBQ2xCO0FBRU0sTUFBTUMsUUFBUSxHQUFHYiw2REFBVyxDQUFDO0lBQ2xDSyxJQUFJLEVBQUUsS0FBSztJQUNYSCxZQUFZO0lBQ1pZLFFBQVEsRUFBRTtRQUNSQyxVQUFVLEVBQUUsSUFBTWIsWUFBWTtRQUM5QmMsU0FBUyxFQUFFLENBQUNDLEtBQUssRUFBRUMsTUFBTSxHQUFLO1lBQzVCRCxLQUFLLENBQUNkLE1BQU0sR0FBR2UsTUFBTSxDQUFDQyxPQUFPLENBQUM7UUFDaEMsQ0FBQztRQUNEQyxhQUFhLEVBQUUsQ0FBQ0gsS0FBSyxFQUFFQyxNQUE4QixHQUFLO1lBQ3hERCxLQUFLLENBQUNMLFVBQVUsR0FBR00sTUFBTSxDQUFDQyxPQUFPLENBQUM7UUFDcEMsQ0FBQztLQUNGO0lBQ0QsK0VBQStFO0lBQy9FRSxhQUFhLEVBQUU7UUFDYixDQUFDcEIsdURBQU8sQ0FBQyxFQUFFLENBQUNnQixLQUFLLEVBQUVDLE1BQU0sR0FBSztZQUM1QixPQUFPO2dCQUNMLEdBQUdELEtBQUs7Z0JBQ1IsR0FBR0MsTUFBTSxDQUFDQyxPQUFPLENBQUNHLEdBQUc7YUFDdEIsQ0FBQztRQUNKLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQztBQUVJLE1BQU0sRUFBRVAsVUFBVSxHQUFFQyxTQUFTLEdBQUVJLGFBQWEsR0FBRSxHQUFHUCxRQUFRLENBQUNVLE9BQU8sQ0FBQztBQUN6RSxpRUFBZVYsUUFBUSxDQUFDVyxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9hcHBTbGljZS50cz84ZDhjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlLCBQYXlsb2FkQWN0aW9uIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcclxuaW1wb3J0IHsgSFlEUkFURSB9IGZyb20gXCJuZXh0LXJlZHV4LXdyYXBwZXJcIjtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICBkcml2ZXI6IHtcclxuICAgIGlkOiBudWxsLFxyXG4gICAgbmFtZTogbnVsbCxcclxuICAgIHBob25lOiBudWxsLFxyXG4gICAgc3RhdHVzOiBudWxsLFxyXG4gICAgY2FyTmFtZTogbnVsbCxcclxuICAgIGNhclR5cGU6IG51bGwsXHJcbiAgICBjYXJMaWNlbnNlOiBudWxsLFxyXG4gICAgY3VycmVudEFkZHJlc3M6IG51bGwsXHJcbiAgfSxcclxuICBhdXRob3JpemVkOiBmYWxzZSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhcHBTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICBuYW1lOiBcImFwcFwiLFxyXG4gIGluaXRpYWxTdGF0ZSxcclxuICByZWR1Y2Vyczoge1xyXG4gICAgY2xlYXJTdG9yZTogKCkgPT4gaW5pdGlhbFN0YXRlLFxyXG4gICAgc2V0RHJpdmVyOiAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICBzdGF0ZS5kcml2ZXIgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0sXHJcbiAgICBzZXRBdXRob3JpemVkOiAoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxib29sZWFuPikgPT4ge1xyXG4gICAgICBzdGF0ZS5hdXRob3JpemVkID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gU3BlY2lhbCByZWR1Y2VyIGZvciBoeWRyYXRpbmcgdGhlIHN0YXRlLiBTcGVjaWFsIGNhc2UgZm9yIG5leHQtcmVkdXgtd3JhcHBlclxyXG4gIGV4dHJhUmVkdWNlcnM6IHtcclxuICAgIFtIWURSQVRFXTogKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZC5hcHAsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHsgY2xlYXJTdG9yZSwgc2V0RHJpdmVyLCBzZXRBdXRob3JpemVkIH0gPSBhcHBTbGljZS5hY3Rpb25zO1xyXG5leHBvcnQgZGVmYXVsdCBhcHBTbGljZS5yZWR1Y2VyO1xyXG4iXSwibmFtZXMiOlsiY3JlYXRlU2xpY2UiLCJIWURSQVRFIiwiaW5pdGlhbFN0YXRlIiwiZHJpdmVyIiwiaWQiLCJuYW1lIiwicGhvbmUiLCJzdGF0dXMiLCJjYXJOYW1lIiwiY2FyVHlwZSIsImNhckxpY2Vuc2UiLCJjdXJyZW50QWRkcmVzcyIsImF1dGhvcml6ZWQiLCJhcHBTbGljZSIsInJlZHVjZXJzIiwiY2xlYXJTdG9yZSIsInNldERyaXZlciIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsInNldEF1dGhvcml6ZWQiLCJleHRyYVJlZHVjZXJzIiwiYXBwIiwiYWN0aW9ucyIsInJlZHVjZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./store/appSlice.ts\n");

/***/ }),

/***/ "./store/store.ts":
/*!************************!*\
  !*** ./store/store.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-persist */ \"redux-persist\");\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-persist/lib/storage */ \"redux-persist/lib/storage\");\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ \"./store/api.ts\");\n/* harmony import */ var _appSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./appSlice */ \"./store/appSlice.ts\");\n\n\n\n\n\nconst persistConfig = {\n    key: \"root\",\n    storage: (redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2___default()),\n    blacklist: [\n        _api__WEBPACK_IMPORTED_MODULE_3__.userApi.reducerPath\n    ]\n};\nconst reducer = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({\n    [_appSlice__WEBPACK_IMPORTED_MODULE_4__.appSlice.name]: _appSlice__WEBPACK_IMPORTED_MODULE_4__.appSlice.reducer,\n    [_api__WEBPACK_IMPORTED_MODULE_3__.userApi.reducerPath]: _api__WEBPACK_IMPORTED_MODULE_3__.userApi.reducer\n});\n// this ensures your redux state is saved to persisted storage whenever it changes\n// we pass this to the store\nconst persistedReducer = (0,redux_persist__WEBPACK_IMPORTED_MODULE_1__.persistReducer)(persistConfig, reducer);\nconst makeStore = ()=>(0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({\n        reducer: persistedReducer,\n        middleware: (getDefaultMiddleware)=>getDefaultMiddleware({\n                serializableCheck: false\n            }).concat(_api__WEBPACK_IMPORTED_MODULE_3__.userApi.middleware)\n    });\nconst reduxStore = ()=>{\n    const store = makeStore();\n    const persistor = (0,redux_persist__WEBPACK_IMPORTED_MODULE_1__.persistStore)(store);\n    return {\n        persistor,\n        store\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reduxStore);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9zdG9yZS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLMEI7QUFDbUM7QUFDYjtBQUNoQjtBQUNNO0FBRXRDLE1BQU1PLGFBQWEsR0FBRztJQUNwQkMsR0FBRyxFQUFFLE1BQU07SUFDWEosT0FBTztJQUNQSyxTQUFTLEVBQUU7UUFBQ0oscURBQW1CO0tBQUM7Q0FDakM7QUFFRCxNQUFNTSxPQUFPLEdBQUdYLGlFQUFlLENBQUM7SUFDOUIsQ0FBQ00sb0RBQWEsQ0FBQyxFQUFFQSx1REFBZ0I7SUFDakMsQ0FBQ0QscURBQW1CLENBQUMsRUFBRUEsaURBQWU7Q0FDdkMsQ0FBQztBQUVGLGtGQUFrRjtBQUNsRiw0QkFBNEI7QUFDNUIsTUFBTVEsZ0JBQWdCLEdBQUdYLDZEQUFjLENBQUNLLGFBQWEsRUFBRUksT0FBTyxDQUFDO0FBQy9ELE1BQU1HLFNBQVMsR0FBRyxJQUNoQmIsZ0VBQWMsQ0FBQztRQUNiVSxPQUFPLEVBQUVFLGdCQUFnQjtRQUN6QkUsVUFBVSxFQUFFLENBQUNDLG9CQUFvQixHQUMvQkEsb0JBQW9CLENBQUM7Z0JBQ25CQyxpQkFBaUIsRUFBRSxLQUFLO2FBQ3pCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDYixvREFBa0IsQ0FBQztLQUNoQyxDQUFDO0FBRUosTUFBTWMsVUFBVSxHQUFHLElBQU07SUFDdkIsTUFBTUMsS0FBSyxHQUFHTixTQUFTLEVBQUU7SUFFekIsTUFBTU8sU0FBUyxHQUFHbEIsMkRBQVksQ0FBQ2lCLEtBQUssQ0FBQztJQUNyQyxPQUFPO1FBQUVDLFNBQVM7UUFBRUQsS0FBSztLQUFFLENBQUM7QUFDOUIsQ0FBQztBQVdELGlFQUFlRCxVQUFVLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9zdG9yZS50cz8xMmU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWN0aW9uLFxyXG4gIGNvbWJpbmVSZWR1Y2VycyxcclxuICBjb25maWd1cmVTdG9yZSxcclxuICBUaHVua0FjdGlvbixcclxufSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xyXG5pbXBvcnQgeyBwZXJzaXN0UmVkdWNlciwgcGVyc2lzdFN0b3JlIH0gZnJvbSBcInJlZHV4LXBlcnNpc3RcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcInJlZHV4LXBlcnNpc3QvbGliL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgdXNlckFwaSB9IGZyb20gXCIuL2FwaVwiO1xyXG5pbXBvcnQgeyBhcHBTbGljZSB9IGZyb20gXCIuL2FwcFNsaWNlXCI7XHJcblxyXG5jb25zdCBwZXJzaXN0Q29uZmlnID0ge1xyXG4gIGtleTogXCJyb290XCIsXHJcbiAgc3RvcmFnZSxcclxuICBibGFja2xpc3Q6IFt1c2VyQXBpLnJlZHVjZXJQYXRoXSxcclxufTtcclxuXHJcbmNvbnN0IHJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gIFthcHBTbGljZS5uYW1lXTogYXBwU2xpY2UucmVkdWNlcixcclxuICBbdXNlckFwaS5yZWR1Y2VyUGF0aF06IHVzZXJBcGkucmVkdWNlcixcclxufSk7XHJcblxyXG4vLyB0aGlzIGVuc3VyZXMgeW91ciByZWR1eCBzdGF0ZSBpcyBzYXZlZCB0byBwZXJzaXN0ZWQgc3RvcmFnZSB3aGVuZXZlciBpdCBjaGFuZ2VzXHJcbi8vIHdlIHBhc3MgdGhpcyB0byB0aGUgc3RvcmVcclxuY29uc3QgcGVyc2lzdGVkUmVkdWNlciA9IHBlcnNpc3RSZWR1Y2VyKHBlcnNpc3RDb25maWcsIHJlZHVjZXIpO1xyXG5jb25zdCBtYWtlU3RvcmUgPSAoKSA9PlxyXG4gIGNvbmZpZ3VyZVN0b3JlKHtcclxuICAgIHJlZHVjZXI6IHBlcnNpc3RlZFJlZHVjZXIsXHJcbiAgICBtaWRkbGV3YXJlOiAoZ2V0RGVmYXVsdE1pZGRsZXdhcmUpID0+XHJcbiAgICAgIGdldERlZmF1bHRNaWRkbGV3YXJlKHtcclxuICAgICAgICBzZXJpYWxpemFibGVDaGVjazogZmFsc2UsXHJcbiAgICAgIH0pLmNvbmNhdCh1c2VyQXBpLm1pZGRsZXdhcmUpLFxyXG4gIH0pO1xyXG5cclxuY29uc3QgcmVkdXhTdG9yZSA9ICgpID0+IHtcclxuICBjb25zdCBzdG9yZSA9IG1ha2VTdG9yZSgpO1xyXG5cclxuICBjb25zdCBwZXJzaXN0b3IgPSBwZXJzaXN0U3RvcmUoc3RvcmUpO1xyXG4gIHJldHVybiB7IHBlcnNpc3Rvciwgc3RvcmUgfTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEFwcFN0b3JlID0gUmV0dXJuVHlwZTx0eXBlb2YgbWFrZVN0b3JlPjtcclxuZXhwb3J0IHR5cGUgQXBwU3RhdGUgPSBSZXR1cm5UeXBlPEFwcFN0b3JlW1wiZ2V0U3RhdGVcIl0+O1xyXG5leHBvcnQgdHlwZSBBcHBUaHVuazxSZXR1cm5UeXBlID0gdm9pZD4gPSBUaHVua0FjdGlvbjxcclxuICBSZXR1cm5UeXBlLFxyXG4gIEFwcFN0YXRlLFxyXG4gIHVua25vd24sXHJcbiAgQWN0aW9uXHJcbj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWR1eFN0b3JlO1xyXG4iXSwibmFtZXMiOlsiY29tYmluZVJlZHVjZXJzIiwiY29uZmlndXJlU3RvcmUiLCJwZXJzaXN0UmVkdWNlciIsInBlcnNpc3RTdG9yZSIsInN0b3JhZ2UiLCJ1c2VyQXBpIiwiYXBwU2xpY2UiLCJwZXJzaXN0Q29uZmlnIiwia2V5IiwiYmxhY2tsaXN0IiwicmVkdWNlclBhdGgiLCJyZWR1Y2VyIiwibmFtZSIsInBlcnNpc3RlZFJlZHVjZXIiLCJtYWtlU3RvcmUiLCJtaWRkbGV3YXJlIiwiZ2V0RGVmYXVsdE1pZGRsZXdhcmUiLCJzZXJpYWxpemFibGVDaGVjayIsImNvbmNhdCIsInJlZHV4U3RvcmUiLCJzdG9yZSIsInBlcnNpc3RvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/store.ts\n");

/***/ }),

/***/ "./pages/styles.css":
/*!**************************!*\
  !*** ./pages/styles.css ***!
  \**************************/
/***/ (() => {



/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "@reduxjs/toolkit/query/react":
/*!***********************************************!*\
  !*** external "@reduxjs/toolkit/query/react" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit/query/react");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "redux-persist":
/*!********************************!*\
  !*** external "redux-persist" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist");

/***/ }),

/***/ "redux-persist/integration/react":
/*!**************************************************!*\
  !*** external "redux-persist/integration/react" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "redux-persist/lib/storage":
/*!********************************************!*\
  !*** external "redux-persist/lib/storage" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/lib/storage");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("socket.io-client");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();