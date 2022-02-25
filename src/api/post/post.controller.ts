import { RequestHandler } from 'express';
const models = require('../../../models');

export const createPost: RequestHandler = (req, res) => {
   const post = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.image_url,
      categoryID: req.body.category_id,
      userID: 1,
   };
   models.Post.create(post)
      .then((result) => {
         res.status(200).json({ message: 'Post created successfully.', post: result });
      })
      .catch((err) => {
         res.status(500).json({ message: 'Something went wrong.', post: err });
      });
};
