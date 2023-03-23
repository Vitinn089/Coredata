export interface ObjectError {
	method: string;
	msgError: string;
}

export interface ErrorHandler extends Error {
	errorMensage: unknown;
	
	logError?: () => void
}