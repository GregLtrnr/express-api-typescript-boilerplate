import Joi from 'joi';

export const createTemplateBodySchema = Joi.object({
  name: Joi.string().required(),
  content: Joi.string().required(),
});

export const updateTemplateParamsSchema = Joi.object({
  id: Joi.string().required(),
});

export const updateTemplateBodySchema = Joi.object({
  data: Joi.object({
    name: Joi.string(),
    content: Joi.string(),
  }).required(),
});
