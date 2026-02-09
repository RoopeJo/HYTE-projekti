import express from 'express';
import {getUsers, postUser, getUserById, putUserById, deleteUserById, postlogin} from '../controllers/user-controller.js';

const userRouter = express.Router();

// USERS resource endpoints

//Get all users
userRouter.get('/', getUsers)

// Post new user
userRouter.post('/', postUser);

// Post user Login
userRouter.post('/login',postlogin);

// Get user by id
userRouter.get('/id',getUserById);

// Put user by id
userRouter.put('/id',putUserById);

// Delete user by id
userRouter.delete('/id',deleteUserById);

export default userRouter;