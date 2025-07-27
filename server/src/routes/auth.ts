import express from 'express';
import {register, login, sendCode} from '../controllers/authController';

// import { testController} from '../controllers/authController';


const router = express.Router();

// router.get('/test', testController);
router.post('/register', register);
router.post('/login', login);
router.post('/send-code', sendCode);

export default router;
