import { PostActions } from './post.actions';
import { Router } from 'express';

class PostRouter {
   private router = Router();
   private actions = new PostActions();

   public createRouter() {
      this.router.post('/create/post', this.actions.createPost);

      return this.router;
   }
}

export const Post = new PostRouter();
