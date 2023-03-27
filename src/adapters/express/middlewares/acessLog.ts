import { NextFunction, Request, Response } from 'express';
import { WinstonLogger } from '../../../infra/winston/winston-logger';

const logger = new WinstonLogger();

// Methods
export default function acessLog (req: Request, res: Response, next: NextFunction) {
	logger.log.info(`\t${req.path}\t${req.connection.remoteAddress}`);
	next();
}