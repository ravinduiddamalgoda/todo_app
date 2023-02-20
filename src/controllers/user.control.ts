import { Request, Response } from 'express';
import UserService from '../services/user.service';

export const CurrentUser = async (req: Request, res: Response) => {
    const currentUser = req.user;

    try {
        if (!currentUser) {
            return res.status(400).send({ err: 'User not logged in' });
        }

        const userDoc = await UserService.findUserByEmail(currentUser.email);
        const user = userDoc?.toJSON() as any;
    
        delete user?.password;
        res.status(200).json(user);
    } catch (err) {
        res.status(400).send({ err: err });
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;

        const payload = await UserService.login(email, password);

        res.status(200).send(payload);
    } catch(err: any) {
        res.status(400).send({ err: err.message })
    }

}

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { fname, lname, password, email } = req.body;

        const existingUser = await UserService.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).send({
                err: 'User Alreadey Exits',
            })
        }
        const user = await UserService.register(email, fname, lname, password, 'user');
        res.status(201).send(user);
    } catch(err: any) {
        res.status(400).send({ err: err.message })
    }

}