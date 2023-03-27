import winston, { createLogger, format, transports } from 'winston';
import { Logger } from '../logger';


export class WinstonLogger implements Logger<winston.Logger>{
	log: winston.Logger;
	constructor() {
		this.log = createLogger({
			format: format.combine(
				format.simple(),
				format.timestamp(),
				format.prettyPrint({colorize: true}),
				format.printf(info => `${info.level.toLocaleUpperCase()}: ${new Date(info.timestamp).toLocaleString('pt-Br')} - ${info.message}`)
			),
			transports: [
				new transports.File({
					level: process.env.NODE_ENV == 'development' ? 'debug' : 'info',
					filename: `${__dirname}/../../logs/log-api.log`
				}),
				new transports.File({
					level: 'error',
					filename: `${__dirname}/../../logs/log-errors.log`
				}),
				new transports.Console({
					level: process.env.NODE_ENV == 'development' ? 'debug' : 'info'
				})
			]
		});
	}
}