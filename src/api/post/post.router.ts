import { PostActions } from './post.actions';
import { Router } from 'express';
import { PostValidator } from './post.validator';

class PostRouter {
   private router = Router();
   private actions = new PostActions();
   private validate = new PostValidator();

   createRouter() {
      this.router.post(
         '/create/post',
         this.validate.postSchema,
         this.actions.createPost
      );

      this.router.get('/post/:id', this.actions.showPost);

      this.router.get('/posts', this.actions.getAllPost);

      this.router.put('/update/post/:id', this.actions.updatePost);

      this.router.delete('/delete/post/:id', this.actions.deletePost);

      return this.router;
   }
}

export const Post = new PostRouter();
