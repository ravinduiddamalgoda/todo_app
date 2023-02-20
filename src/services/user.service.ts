import User from "../models/user.model";
import { createPasswordHash, signToken } from "./auth.service";

async function findUserByEmail(email: string) {
    const existingUser = await User.findOne({
        email
    });

    return existingUser;
}

async function register(email: string, fname: string, lname: string, password: string, role: string) {
    const hash = await createPasswordHash(password);
    const newUser = new User({
        fname,
        lname,
        password: hash,
        email,
        role: 'user',
    });


    const userPayload = JSON.parse(JSON.stringify(newUser));

    if (userPayload) {
        // delete userPayload.password;
    }

    await newUser.save();

    return userPayload;
}

async function login(email: string, password: string) {
    const acc = await User.findOne({ email });

    if (!acc) {
        throw new Error('User not found');
    }

    const payload = await signToken(password, acc.password, {
        email: acc.email,
        id: acc._id.toString(),
        role: acc.role,
    });

    return payload;
}

export default {
    findUserByEmail,
    register,
    login,
}