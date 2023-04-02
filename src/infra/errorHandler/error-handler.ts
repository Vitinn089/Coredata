import { IErrorHandler } from '../error-handler';

export default class ErrorHandler extends Error implements IErrorHandler {
	constructor(msg: string) {
		super(msg);
	}
}