import { RequestHandler } from 'express';
import { PostRespond } from './post.respond';

const models = require('../../../models');

export class PostActions {
   private respond = new PostRespond();

   public createPost: RequestHandler = (req, res): void => {
      const post = {
         title: req.body.title,
         content: req.body.content,
         image_url: req.body.image_url,
         category_id: req.body.category_id,
         user_id: req.body.user_id,
      };

      models.Post.create(post)
         .then((result) => {
            res.status(200).json({ message: 'Post created successfully.', post: result });
         })
         .catch((err) => {
            res.status(500).json({ message: 'Something went wrong.', post: err });
         });
   };

   public showPost: RequestHandler = (req, res): void => {
      const { id } = req.params;

      models.Post.findByPk(id) //Find by primary key
         .then((result) => {
            res.status(200).json({ post: result });
         })
         .catch((err: Error) => {
            res.status(500).json({ message: 'Something went wrong.', post: err });
         });
   };

   public getAllPost: RequestHandler = (req, res): void => {
      models.Post.findAll()
         .then((result) => {
            res.status(200).json({ post: result });
         })
         .catch((err: Error) => {
            res.status(500).json({ message: 'Something went wrong.', post: err });
         });
   };

   public updatePost: RequestHandler = (req, res): void => {
      const { id } = req.params;

      const updatedPost = {
         title: req.body.title,
         content: req.body.content,
         imageUrl: req.body.image_url,
         categoryID: req.body.category_id,
      };

      const userID = 1;

      models.Post.update(updatedPost, { where: { id }, userID })
         .then((result: Number) => {
            result == 1
               ? res.status(200).json({ message: 'Post updated successfully.', post: updatedPost })
               : res.status(400).json({ message: 'No post found.' });
         })
         .catch((err: Error) => {
            res.status(500).json({ message: 'Something went wrong.', post: err });
         });
      //
   };

   public deletePost: RequestHandler = (req, res): void => {
      const { id } = req.params;

      const userID = 1;

      models.Post.destroy({ where: { id }, userID })
         .then((result: Number) => {
            result == 1
               ? res.status(200).json({ message: 'Post deleted successfully.' })
               : res.status(400).json({ message: 'No post found.' });
         })
         .catch((err: Error) => {
            res.status(500).json({ message: 'Something went wrong.', post: err });
         });
   };
}
