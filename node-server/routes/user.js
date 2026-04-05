import { Router } from "express";

//import { authenticate } from "../middleware/authMiddleware.js";
import {UserController} from '../controller/user.js';

export const createUserRouter = ({userModel}) => {
    const userRouter = Router();

    const userController = new UserController({userModel});

    userRouter.get('/:id', userController.getById);

    /*userRouter.options('/login', (req, res) => {
        const allowedOrigins = ['http://localhost:3000', 'https://10.5.0.2:8000/', 'https://192.168.1.92:8000/', 'https://127.0.0.1:8000'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        console.log(req.headers);
        //res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");
        res.header('Access-Control-Allow-Credentials', true);
        res.end();
    });*/

    userRouter.post('/login', userController.login);

    userRouter.post('/register', userController.create);

    userRouter.patch('/', userController.update);

    userRouter.post('/logout', userController.logout);

    userRouter.post('/protected', userController.protected);

    

    return userRouter;
}