"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_control_1 = require("../controllers/user.control");
const validator_1 = require("../utils/validator");
const userRouter = (0, express_1.Router)();
userRouter.get('/current-user', validator_1.authGuard, user_control_1.CurrentUser);
userRouter.post('/login', user_control_1.LoginUser);
userRouter.post('/register', (0, validator_1.validate)([
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 5 })
]), user_control_1.RegisterUser);
exports.default = userRouter;
