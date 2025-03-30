import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

type ValidatePayload = {
  params?: Joi.Schema<any>;
  query?: Joi.Schema<any>;
  body?: Joi.Schema<any>;
};

/**
 * Middleware function to validate request parameters, query, and body against a given schema.
 *
 * @param schema - An object containing validation schemas for `params`, `query`, and `body`.
 *                 Each schema should have a `validate` method that performs the validation.
 *
 * @returns A middleware function that validates the request and sends a 400 response
 *          if any validation fails. If all validations pass, the `next` middleware is called.
 *
 * @example
 * ```typescript
 * import { validate } from './middlewares/validate';
 * import * as Joi from 'joi';
 *
 * const schema = {
 *   params: Joi.object({ id: Joi.string().required() }),
 *   query: Joi.object({ search: Joi.string().optional() }),
 *   body: Joi.object({ name: Joi.string().required() }),
 * };
 *
 * app.post('/example/:id', validate(schema), (req, res) => {
 *   res.send('Validation passed!');
 * });
 * ```
 *
 * @throws {Error} If the request body is not an object or is missing when required.
 * @throws {Error} If the request body contains invalid JSON.
 */
export function validate(schema: ValidatePayload) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { params: paramsSchema, query: querySchema, body: bodySchema } = schema;

    // Validate request parameters
    if (paramsSchema) {
      const { error } = paramsSchema.validate(request.params);
      if (error) {
        console.log({ message: 'Invalid request parameters', error }, request);
        response.status(400).send();
        return;
      }
    }

    // Validate request query
    if (querySchema) {
      const { error } = querySchema.validate(request.query);
      if (error) {
        console.log({ message: 'Invalid request query', error }, request);
        response.status(400).send();
        return;
      }
    }

    // Validate request body
    if (bodySchema) {
      try {
        if (request.body) {
          if (typeof request.body !== 'object') {
            throw new Error('Request body must be an object');
          }
          const { error } = bodySchema.validate(request.body);
          if (error) {
            console.log({ message: 'Invalid request body', error }, request);
            response.status(400).send(error.message);
            return;
          }
        } else {
          throw new Error('Request body not provided');
        }
      } catch (error: any) {
        console.log({ message: 'Invalid JSON in request body', error }, request);
        response.status(400).send(error.message || 'Invalid JSON in request body');
        return;
      }
    }

    next(); // Ensure next() is always called if no errors occur
  };
}
