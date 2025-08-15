import express from 'express';
import {register, login, sendCode} from '../controllers/authController';
import {getCurrentUser, getStudentProfile, getMentorProfile} from '../controllers/profileController';
import { authRequired } from '../middlewares/authRequired';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-code', sendCode);
router.get('/me',authRequired,getCurrentUser);
router.get('/profile/:userId', authRequired, getStudentProfile);

export default router;








