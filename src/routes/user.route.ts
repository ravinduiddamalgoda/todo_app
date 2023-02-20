import { Router } from "express";
import { body } from "express-validator";
import { CurrentUser, LoginUser, RegisterUser } from "../controllers/user.control";
import { authGuard, validate } from "../utils/validator";

const userRouter = Router();

userRouter.get('/current-user', authGuard, CurrentUser);

userRouter.post('/login', LoginUser);

userRouter.post('/register', validate([
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
]), RegisterUser);

export default userRouter;