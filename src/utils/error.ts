interface BdErrorProperty {
	
}

export default class BdError extends Error {
	private method: string;
	constructor(method: string, msg: undefined) {
		super(msg);
		this.method = method;
	}
}