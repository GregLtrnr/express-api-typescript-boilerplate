import Joi from "joi";

export const createTemplateSchema = Joi.object({
  name: Joi.string().required(),
  content: Joi.string().required(),
});
