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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
const fakedb_1 = require("./src/utils/fakedb");
const todo_route_1 = __importDefault(require("./src/routes/todo.route"));
const user_service_1 = __importDefault(require("./src/services/user.service"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(user_route_1.default);
app.use('/todo', todo_route_1.default);
// database connection starting
(0, fakedb_1.connect)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database Connected');
    //await User.findOneAndDelete({ email: 'abcd@gmail.com' });
    // locally register the user using hard code because tempory storage will lose the past registration 
    yield user_service_1.default.register('abc@gmail.com', 'Adheesha', 'b', '12345678', 'user');
    app.listen(5000, () => console.log('Server Started'));
})).catch((err) => {
    console.error('Connection ERROR', err);
});
