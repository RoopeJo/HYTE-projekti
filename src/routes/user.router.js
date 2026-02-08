import express from 'express';
import {getUsers, postUser,} from '../controllers/user-controller.js';
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

// Post user Login
// userRouter.post('/login',postLogin);

// Get user by id
// userRouter.get('/login',getUserById);

// Put user by id
// userRouter.put('/login',putUserById);

// Delete user by id
// userRouter.delete('/login',deleteUserById);

export default userRouter;