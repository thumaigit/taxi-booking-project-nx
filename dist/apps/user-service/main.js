/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/user-service/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const client_1 = __webpack_require__("@prisma/client");
const app_service_1 = __webpack_require__("./apps/user-service/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
    getLoginUserByPhoneNumber(phone_number) {
        const res = this.appService.findLoginUser(phone_number);
        return res;
    }
    createUser(dto) {
        return this.appService.createUser(dto);
    }
    getRideByPhoneNumber(phone_number) {
        const res = this.appService.getUser(phone_number);
        return res;
    }
    getUserByPhoneNumber(phone_number) {
        const res = this.appService.findUser(phone_number);
        return res;
    }
    createAccountWriteValidation(dto) {
        return this.appService.createRides(dto);
    }
    updateDriverSucessLogin(phone_number, current_address, status, firebase_token) {
        const res = this.appService.updateOnlineDriverInfo(phone_number, current_address, status, firebase_token);
        return res;
    }
    getAssignDriver(customer_address) {
        const drivers = this.appService.getAvailableDriver(customer_address);
        return drivers;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
tslib_1.__decorate([
    (0, common_1.Get)(':phone_number/login'),
    tslib_1.__param(0, (0, common_1.Param)('phone_number')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getLoginUserByPhoneNumber", null);
tslib_1.__decorate([
    (0, common_1.Post)('user'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(':phone_number/ride'),
    tslib_1.__param(0, (0, common_1.Param)('phone_number')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getRideByPhoneNumber", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(':phone_number/user'),
    tslib_1.__param(0, (0, common_1.Param)('phone_number')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getUserByPhoneNumber", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('ride'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof client_1.Ride !== "undefined" && client_1.Ride) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "createAccountWriteValidation", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)(':phone_number/:current_address/:status/:firebase_token/driver'),
    tslib_1.__param(0, (0, common_1.Param)('phone_number')),
    tslib_1.__param(1, (0, common_1.Param)('current_address')),
    tslib_1.__param(2, (0, common_1.Param)('status')),
    tslib_1.__param(3, (0, common_1.Param)('firebase_token')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "updateDriverSucessLogin", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(':customer_address/assign'),
    tslib_1.__param(0, (0, common_1.Param)('customer_address')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AppController.prototype, "getAssignDriver", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/user-service/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const constants_1 = __webpack_require__("./libs/auth-guard/constants.ts");
const app_controller_1 = __webpack_require__("./apps/user-service/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/user-service/src/app/app.service.ts");
const jwt_strategy_1 = __webpack_require__("./apps/user-service/src/app/jwt.strategy.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3000s' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_strategy_1.UserJwtStrategy],
        exports: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/user-service/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const client_1 = __webpack_require__("@prisma/client");
const bcrypt = __webpack_require__("bcrypt");
const axios_1 = __webpack_require__("axios");
const prisma = new client_1.PrismaClient();
const goongKey = '0zKkBcMbQKAkWsB23qQAeFiGPQN4uQ1tsMeN0ZdG';
const goong = 'https://rsapi.goong.io';
var Status;
(function (Status) {
    Status["ONLINE"] = "ONLINE";
    Status["OFFLINE"] = "OFFLINE";
})(Status || (Status = {}));
var UserType;
(function (UserType) {
    UserType["CUSTOMER"] = "customer";
    UserType["DRIVER"] = "driver";
    UserType["ADMIN"] = "admin";
})(UserType || (UserType = {}));
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to user-service!' };
    }
    getUser(phoneNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    phone_number: phoneNumber,
                },
                include: {
                    ride_history: {
                        orderBy: {
                            created_at: 'desc',
                        },
                        take: 5,
                    },
                },
            });
            const userFrequentlyAddress = yield prisma.ride.groupBy({
                where: {
                    user: {
                        phone_number: phoneNumber,
                    },
                },
                by: ['arrive_address'],
                orderBy: {
                    _count: {
                        arrive_address: 'desc',
                    },
                },
                take: 5,
            });
            return {
                basic_info: {
                    user_id: user.id,
                    full_name: user.full_name,
                    phone_number: user.phone_number,
                },
                ride_history: user.ride_history,
                frequently_address: userFrequentlyAddress,
            };
        });
    }
    createRides(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ride = yield prisma.ride.create({
                    data: dto,
                });
                return ride;
            }
            catch (e) {
                if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    // The .code property can be accessed in a type-safe manner
                    if (e.code === 'P2002') {
                        console.log('There is a unique constraint violation, a new ride cannot be created with this user');
                    }
                }
                throw e;
            }
        });
    }
    findUser(phoneNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    phone_number: phoneNumber,
                },
            });
            return user;
        });
    }
    findLoginUser(phoneNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    phone_number: phoneNumber,
                },
            });
            const loginUser = {
                phone_number: user.phone_number,
                user_password: user.user_password,
            };
            return loginUser;
        });
    }
    createUser(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const saltOrRounds = 10;
            const password = dto.user_password;
            const hash = yield bcrypt.hash(password, saltOrRounds);
            const user = yield prisma.user.create({
                data: Object.assign(Object.assign({}, dto), { user_password: hash }),
            });
            return user;
        });
    }
    updateOnlineDriverInfo(username, currentAddress, status, firebaseToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (status == Status.ONLINE) {
                const driver = yield prisma.user.update({
                    where: {
                        phone_number: username,
                    },
                    data: {
                        status: Status.ONLINE,
                        current_address: currentAddress,
                        firebase_token: firebaseToken,
                    },
                });
                return {
                    status: driver.status,
                    address: driver.current_address,
                };
            }
            else if (status == Status.OFFLINE) {
                const driver = yield prisma.user.update({
                    where: {
                        phone_number: username,
                    },
                    data: {
                        status: Status.OFFLINE,
                    },
                });
                return { status: driver.status };
            }
            return null;
        });
    }
    getLocation(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = `${goong}/geocode?address=${address}&api_key=${goongKey}`;
            try {
                const geoCoding = yield axios_1.default.get(url);
                const location = geoCoding.data.results[0].geometry.location;
                return location;
            }
            catch (e) {
                console.error('getLocation error');
            }
        });
    }
    getDistance(firstLocation, secondLocation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = `${goong}/Direction?origin=${firstLocation.lat},${firstLocation.lng}&destination=${secondLocation.lat},${secondLocation.lng}&vehicle=car&api_key=${goongKey}`;
            try {
                const direction = yield axios_1.default.get(url);
                const distance = direction.data.routes[0].legs[0].distance.value;
                return distance;
            }
            catch (error) {
                console.error('getDistance error');
            }
        });
    }
    getAvailableDriver(customer_address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const customerLocation = yield this.getLocation(customer_address);
                const onlineDriver = yield prisma.user.findMany({
                    where: {
                        status: Status.ONLINE,
                        user_type: UserType.DRIVER,
                    },
                });
                const drivers = onlineDriver.map((driver) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const driverLocation = yield this.getLocation(driver.current_address);
                    const distance = yield this.getDistance(customerLocation, driverLocation);
                    if ((yield distance) < 2000) {
                        return {
                            id: driver.id,
                            driver_firebase_token: driver.firebase_token,
                            phone_number: driver.phone_number,
                            full_name: driver.full_name,
                            distance: distance,
                        };
                    }
                }));
                return Promise.all(drivers).then((results) => {
                    return results.filter((drivers) => drivers != null);
                });
            }
            catch (error) {
                console.error('getAvailableDriver error');
            }
        });
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/user-service/src/app/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserJwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const constants_1 = __webpack_require__("./libs/auth-guard/constants.ts");
let UserJwtStrategy = class UserJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret,
        });
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { username: payload.username };
        });
    }
};
UserJwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], UserJwtStrategy);
exports.UserJwtStrategy = UserJwtStrategy;


/***/ }),

/***/ "./libs/auth-guard/constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey',
};


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@prisma/client":
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/user-service/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.enableCors();
        const port = process.env.PORT || 3000;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map