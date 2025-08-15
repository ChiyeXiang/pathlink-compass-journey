import express from 'express';
import { Router } from 'express';
import {upsertMentorProfile, listMentors, getMentorProfileFromSquare } from '../controllers/mentorController';
import { createCoffeeChat } from '../controllers/coffeeChatController';
import { authRequired } from '../middlewares/authRequired';

const router = express.Router();

router.get('/mentor/list', listMentors);
router.get('/mentor-detail/:userId', authRequired, getMentorProfileFromSquare);  
router.post('/coffeechat', authRequired, createCoffeeChat);

export default router;
