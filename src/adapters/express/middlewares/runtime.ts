import { NextFunction, Request, Response } from 'express';
import { WinstonLogger } from '../../../infra/winston/winston-logger';

const logger = new WinstonLogger();

const  start = (req: Request, res: Response, next: NextFunction): void => {
	req.startTime = new Date();

	next();
};

const  end = (req: Request, res: Response, next: NextFunction): void => {
	const endTime = new Date();
	const totalTime = endTime.getTime() - (req.startTime?.getTime() || 0);
	logger.log.debug(`Runtime: ${totalTime}ms\n`);

	next();
};

export default {
	start,
	end
};