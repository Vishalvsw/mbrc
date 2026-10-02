import { Response } from "express";
export const ok = <T>(res: Response, data: T, status = 200) => res.status(status).json(data);
export const created = <T>(res: Response, data: T) => res.status(201).json(data);
export const noContent = (res: Response) => res.status(204).end();
