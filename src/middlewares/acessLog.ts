import { NextFunction, Request, Response } from 'express';

// Methods
export default function acessLog (req: Request, res: Response, next: NextFunction) {
	const timeElapsed = Date.now();
	const time = new Date(timeElapsed);
	console.log(`\n${time.toLocaleString('pt-Br')}\t${req.path}`);
	next();
}