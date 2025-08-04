import express from 'express';
import {registerStudent,login,sendCode,getCurrentStudent} from '../controllers/authController';

// import { testController} from '../controllers/authController';


const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', login);
router.post('/send-code', sendCode);
router.get('/me',getCurrentStudent);

export default router;








