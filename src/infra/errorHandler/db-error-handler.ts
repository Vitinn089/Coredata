import { ErrorHandler, ObjectError } from '../error-handler';

export default class BdErrorHandler extends Error implements ErrorHandler {
	errorMensage: unknown;
	constructor(msg: string, error: ObjectError) {
		super(msg);
		
		this.errorMensage = error;
	}
}