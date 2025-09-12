import express from 'express';
import { matchMentors } from '../controllers/matchingController';
// 如果你有鉴权中间件，可改成可选鉴权；也可以不加
// import { authOptional } from '../middlewares/auth';

const router = express.Router();

// 推荐导师
router.post('/matching', /* authOptional, */ matchMentors);

export default router;
