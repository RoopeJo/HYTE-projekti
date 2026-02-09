import express from 'express';
import {getMe, getUsers, postUser, postlogin} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
// import { getUserById } from '../controllers/user-controller.js';
// import { putUserById } from '../controllers/user-controller.js';
// import { deleteUserById } from '../controllers/user-controller.js';


const userRouter = express.Router();

// USERS resource endpoints
userRouter.route('/')
//Get all users
.get(getUsers)
// Post new user
.post(postUser);

// Get user info based on token
userRouter.get('/me', authenticateToken, getMe);

// Post user Login
userRouter.post('/login',postlogin);

// Get user by id
// userRouter.get('/login',getUserById);

// Put user by id
// userRouter.put('/login',putUserById);

// Delete user by id
// userRouter.delete('/login',deleteUserById);

export default userRouter;