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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const todo_model_1 = __importDefault(require("../models/todo.model"));
const validator_1 = require("../utils/validator");
const todoRouter = (0, express_1.Router)();
todoRouter.get('/', validator_1.authGuard, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = req.user;
        const todos = yield todo_model_1.default.find({ user: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id });
        res.json(todos);
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
}));
todoRouter.get('/:todoId', validator_1.authGuard, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params['todoId'];
        const todo = yield todo_model_1.default.findOne({ _id: id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.json(todo);
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
}));
todoRouter.post('/create', validator_1.authGuard, (0, validator_1.validate)([
    (0, express_validator_1.body)('title').isString(),
    (0, express_validator_1.body)('status').optional().isIn(['pending', 'done', 'archived'])
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { title, status } = req.body;
        const todo = new todo_model_1.default({
            title,
            status: status ? status : 'pending',
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
        });
        yield todo.save();
        res.json(todo);
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
}));
todoRouter.put('/:todoId', validator_1.authGuard, (0, validator_1.validate)([
    (0, express_validator_1.body)('title').optional().isString(),
    (0, express_validator_1.body)('status').optional().isIn(['pending', 'done', 'archived'])
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params['todoId'];
        const { title, status } = req.body;
        const todo = yield todo_model_1.default.findByIdAndUpdate(id, {
            title,
            status,
        });
        res.json(todo);
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
}));
todoRouter.delete('/:todoId', validator_1.authGuard, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params['todoId'];
        const todo = yield todo_model_1.default.findByIdAndDelete(id);
        res.json(todo);
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
}));
exports.default = todoRouter;
