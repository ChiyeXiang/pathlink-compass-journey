import express from 'express';
import {register, login, sendCode} from '../controllers/authController';
import {getCurrentUser, getStudentProfile, getMentorProfile} from '../controllers/profileController';

// import { testController} from '../controllers/authController';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-code', sendCode);
router.get('/me',getCurrentUser);
router.get('/profile/:userId', getStudentProfile);
router.get

export default router;








