import Joi from "joi";

export const blogValidationSchema = Joi.object({
  title: Joi.string().trim().min(5).max(100).required(),
  description: Joi.string().trim().min(10).max(500).required(),
  body: Joi.string().trim().min(50).max(2000).required(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  state: Joi.string().valid("draft", "published").default("draft"),
  read_count: Joi.number().integer().min(0).default(0),
  reading_time: Joi.number().integer().min(0).default(0),
  author: Joi.string()
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});
