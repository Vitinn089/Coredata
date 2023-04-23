import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../../../infra/errorHandler/error-handler';
import { WinstonLogger } from '../../../infra/winston/winston-logger';

const logger = new WinstonLogger();

export default (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
	if (err && err.statusCode) {
		logger.log.error(`${err.msg} info: ${err.trace}`);
	
		res.status(err.statusCode).json({
			statusCode: err.statusCode,
			message: err.msg
		});
	}

	next();
};