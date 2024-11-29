import { NextFunction, Request, Response } from 'express';
import { WinstonLogger } from '../../../infra/winston/winston-logger';

const logger = new WinstonLogger();

// Methods
export  function acessLog (req: Request, res: Response, next: NextFunction) {
	logger.log.http(`${req.method}\t${req.path}\t${req.ip}`);
	next();
}

export  function endRequisitionLog (req: Request) {
	logger.log.http(`End requisition to: ${req.ip}`);
}