import Joi from "joi";
import { Request, Response, NextFunction } from "express";

type validatePayload = {
  params?: Joi.Schema<any>;
  query?: Joi.Schema<any>;
  body?: Joi.Schema<any>;
};

export function validate(schema: validatePayload) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { params, query, body } = schema;

    if (params) {
      const { error } = params.validate(req.params);
      if (error) {
        console.log({ message: "Invalid params", error }, req);
        return res.status(400).send();
      }
    }

    if (query) {
      const { error } = query.validate(req.query);
      if (error) {
        console.log({ message: "Invalid query", error }, req);
        return res.status(400).send();
      }
    }

    if (body) {
      try {
        if (req.body) {
          if (typeof req.body !== "object")
            throw new Error("Body must be an object");
          const { error } = body.validate(req.body);
          if (error) {
            console.log({ message: "Invalid body", error }, req);
            return res.status(400).send(error.message);
          }
        } else {
          throw new Error("Body not provided");
        }
      } catch (e: any) {
        console.log({ message: "Invalid JSON body", error: e }, req);
        return res.status(400).send(e.message || "Invalid JSON body");
      }
    }

    next();
  };
}
