import express from 'express';
import {getMe, getUsers, postUser, postlogin} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
// import { getUserById } from '../controllers/user-controller.js';
// import { putUserById } from '../controllers/user-controller.js';
// import { deleteUserById } from '../controllers/user-controller.js';


const userRouter = express.Router();

// USERS resource endpoints

//Get all users
userRouter.get('/', getUsers)

// Post new user
userRouter.post('/', postUser);

// Get user info based on token
userRouter.get('/me', authenticateToken, getMe);

// Post user Login
userRouter.post('/login',postlogin);

// Get user by id
userRouter.get('/id',getUserById);

// Put user by id
userRouter.put('/id',putUserById);

// Delete user by id
userRouter.delete('/id',deleteUserById);

export default userRouter;