interface ObjectError {
	method: string;
	msgError: string;
  }

export default class BdError extends Error {
	private errorMensage: unknown;
	constructor(msg: string, error: ObjectError) {
		super(msg);
		
		this.errorMensage = error;
	}
}