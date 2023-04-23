import { Handler, NextFunction, Request, Response } from 'express';

export default (handalerFn: Handler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		return Promise.resolve(handalerFn(req, res, next));
	};
};