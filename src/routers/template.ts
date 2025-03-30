import { Router } from 'express';
import { validate } from '@middlewares/validate';
import {
  createTemplateBodySchema,
  updateTemplateParamsSchema,
  updateTemplateBodySchema,
} from '@schemas/template';
import {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '@controllers/template';

const templateRouter = Router();

templateRouter.get('/', getTemplates);
templateRouter.get('/:id', getTemplateById);
templateRouter.post(
  '/',
  validate({ body: createTemplateBodySchema, params: updateTemplateParamsSchema }),
  createTemplate,
);
templateRouter.put(
  '/:id',
  validate({ body: updateTemplateBodySchema, params: updateTemplateParamsSchema }),
  updateTemplate,
);
templateRouter.delete('/:id', deleteTemplate);

export default templateRouter;
