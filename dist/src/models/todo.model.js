"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoScheme = new mongoose_1.default.Schema({
    title: {
        required: true,
        type: String,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'done', 'archived'],
        default: 'pending',
        required: true,
    }
}, {
    timestamps: true,
});
const Todo = mongoose_1.default.model('Todo', todoScheme);
exports.default = Todo;
