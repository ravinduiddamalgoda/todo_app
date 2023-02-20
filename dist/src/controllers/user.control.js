"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = exports.LoginUser = exports.CurrentUser = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const CurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.user;
    try {
        if (!currentUser) {
            return res.status(400).send({ err: 'User not logged in' });
        }
        const userDoc = yield user_service_1.default.findUserByEmail(currentUser.email);
        const user = userDoc === null || userDoc === void 0 ? void 0 : userDoc.toJSON();
        user === null || user === void 0 ? true : delete user.password;
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
});
exports.CurrentUser = CurrentUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const payload = yield user_service_1.default.login(email, password);
        res.status(200).send(payload);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
});
exports.LoginUser = LoginUser;
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname, password, email } = req.body;
        const existingUser = yield user_service_1.default.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).send({
                err: 'User Alreadey Exits',
            });
        }
        const user = yield user_service_1.default.register(email, fname, lname, password, 'user');
        res.status(201).send(user);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
});
exports.RegisterUser = RegisterUser;
