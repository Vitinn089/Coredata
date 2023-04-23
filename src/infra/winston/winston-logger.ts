import winston, { createLogger, format, transports } from 'winston';
import { Logger } from '../logger';
import { zonedTimeToUtc, format as formatTime } from 'date-fns-tz';

export class WinstonLogger implements Logger<winston.Logger>{
	log: winston.Logger;
	data: Date;
	constructor() {
		this.data = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');
		this.log = createLogger({
			format: format.combine(
				format.simple(),
				format.timestamp(),
				format.prettyPrint({colorize: true}),
				format.printf(info => `${info.level.toLocaleUpperCase()}: ${formatTime(this.data, 'dd/MM/yyyy, HH:mm:ss')} - ${info.message}`)
			),
			transports: [
				new transports.Console({
					level: 'debug'
				}),
				new transports.File({
					level: 'debug',
					filename: `${__dirname}/../../logs/debug/${formatTime(this.data, 'yyyy-MM-dd')}.log`
				}),
				new transports.File({
					level: 'info',
					filename: `${__dirname}/../../logs/${formatTime(this.data, 'yyyy-MM-dd')}.log`
				}),
				new transports.File({
					level: 'error',
					filename: `${__dirname}/../../logs/err/${formatTime(this.data, 'yyyy-MM-dd')}.log`
				})
			]
		});
	}
}