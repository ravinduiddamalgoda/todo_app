import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { IAuthPayload } from '../extends';

const APP_SECRET = 'my-todo-app-secret';
const APP_ACCESS_TOKEN_EXP_SECS = 3600;
const JWT_OPTIONS: SignOptions = {
    algorithm: "HS256",
    issuer: "mytodoapp.com/api",
    audience: "mytodoapp.com",
    expiresIn: APP_ACCESS_TOKEN_EXP_SECS,
}

export function createPasswordHash(password: string) {
    return bcrypt.hash(password, 10);
}

export function validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function signToken(password: string, hash: string, payload: IAuthPayload) {
    const isValidPassword = await validatePassword(password, hash);

    if (!isValidPassword) {
        throw new Error('Invalid Password');
    }

    const token = jwt.sign(payload, APP_SECRET, JWT_OPTIONS);
    return {
        token,
        life: APP_ACCESS_TOKEN_EXP_SECS,
    }
}

export async function verifyToken(token: string) {
    const payload = jwt.verify(token, APP_SECRET, JWT_OPTIONS);
    return payload as IAuthPayload;
}