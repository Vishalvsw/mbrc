import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
export const validate = (schema: ZodSchema, src: "body"|"query"|"params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    try { (req as any)[src] = schema.parse((req as any)[src]); next(); }
    catch (e) { next(e); }
  };
