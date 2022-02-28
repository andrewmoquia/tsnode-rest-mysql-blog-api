import Joi, { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export class PostValidator {
   private title = Joi.string().min(3).max(255).messages({
      'string.base': `Title should be a type of 'text'.`,
      'string.min': `Title should have a minimum length of {#limit}`,
      'string.max': `Title should have a maximum length of {#limit}`,
   });

   private content = Joi.string().min(3).max(5000).messages({
      'string.base': `Content should be a type of 'text'.`,
      'string.min': `Content should have a minimum length of {#limit}`,
      'string.max': `Content should have a maximum length of {#limit}`,
   });

   private image_url = Joi.string().min(4).max(300).messages({
      'string.base': `Image URL should be a type of 'text'.`,
      'string.min': `Image URL should have a minimum length of {#limit}`,
      'string.max': `Image URL should have a maximum length of {#limit}`,
   });

   private user_id = Joi.number().min(1).max(300).required().messages({
      'string.base': `User ID should be a type of 'number'.`,
      'string.empty': `User ID cannot be an empty field`,
      'string.min': `User ID should have a minimum length of {#limit}`,
      'string.max': `User ID should have a maximum length of {#limit}`,
      'any.required': 'User ID field is required',
   });

   private category_id = Joi.number().min(1).max(300).required().messages({
      'string.base': `Category ID should be a type of 'number'.`,
      'string.empty': `Category ID cannot be an empty field`,
      'string.min': `Category ID should have a minimum length of {#limit}`,
      'string.max': `Category ID should have a maximum length of {#limit}`,
      'any.required': 'Category ID field is required',
   });

   public PostSchema = Joi.object().keys({
      title: this.title,
      content: this.content,
      image_url: this.image_url,
      category_id: this.category_id,
      user_id: this.user_id,
   });

   public reqBody = (schema: Schema) => {
      return (req: Request, res: Response, next: NextFunction) => {
         const result = schema.validate(req.body);

         return result.error ? res.send({ messsage: result.error.details[0].message }) : next();
      };
   };
}
