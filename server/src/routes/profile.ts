import express from 'express';
import { upsertWelcomeSurvey } from '../controllers/studentController';
import { getStudentProfile, getMentorProfile} from '../controllers/profileController';
import { upsertMentorProfile } from '../controllers/mentorController';

const router = express.Router();

router.get('/student/profile/:userId', getStudentProfile);
router.get('/mentor/profile/:userId', getMentorProfile);
router.post('/student/welcome', upsertWelcomeSurvey);
router.post('/mentor/profile', upsertMentorProfile);

export default router;
