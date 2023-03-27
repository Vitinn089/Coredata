export interface IErrorHandler extends Error {
	logError?: () => void
}