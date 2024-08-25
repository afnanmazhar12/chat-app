import express from 'express';
import { signup, login, logout } from '../controllers/auth.controllers.js';

const router = express.Router();

// Define the routes with POST methods
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;

