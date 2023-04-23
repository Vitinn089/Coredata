export interface IError {
	msg: string,
	statusCode: number
	name: string
	trace: string[]
}

export interface IErrorHandler extends Error {
	msg: string,
	statusCode: number,
	name: string,
	trace: string[]
	
	logError?: () => void
}