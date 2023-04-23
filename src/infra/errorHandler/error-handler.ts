import { IError, IErrorHandler } from '../error-handler';

export default class ErrorHandler extends Error implements IErrorHandler {
	statusCode: number;
	msg: string;
	name: string;
	trace: string[];

	constructor(error: IError) {
		super(error.msg);
		this.msg = error.msg;
		this.statusCode = error.statusCode;
		this.name = error.name;
		this.trace = error.trace;
	}
}