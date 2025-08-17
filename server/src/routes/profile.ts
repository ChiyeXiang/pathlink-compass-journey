import express from 'express';
import { upsertWelcomeSurvey, upsertStudentProfile} from '../controllers/studentController';
import { getStudentProfile, getMentorProfile} from '../controllers/profileController';
import { upsertMentorProfile } from '../controllers/mentorController';
import { authRequired } from '../middlewares/authRequired';

const router = express.Router();

router.get('/student/profile/:userId', authRequired, getStudentProfile);
router.get('/mentor/profile/:userId', authRequired, getMentorProfile);


router.post('/student/welcome',  authRequired, upsertWelcomeSurvey);
router.post('/student/profile',  authRequired, upsertStudentProfile);
router.post('/mentor/profile', authRequired, upsertMentorProfile);

export default router;
