import { Router } from 'express';
import { createPost } from './post.controller';

const router = Router();

router.post('/create/post', createPost);

export default router;
