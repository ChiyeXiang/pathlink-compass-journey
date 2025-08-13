import express from 'express';
import { Router } from 'express';
import {upsertMentorProfile, listMentors, getMentorProfileFromSquare } from '../controllers/mentorController';

const router = express.Router();

router.get('/mentor/list', listMentors);
router.get('/mentor-detail/:userId', getMentorProfileFromSquare);  

export default router;
