import path from 'path';
import ErrorHandler from '../infra/errorHandler/error-handler';

export interface LanguageProps {
	id: number;
	name: string;
}

export default class Language{
	#props: LanguageProps;

	constructor(props: LanguageProps){
		const { id, name } = props;

		if (!id || !name)
			throw new ErrorHandler({msg: 'The "id" and "name" properties are required!', name: 'InternalServerError', statusCode: 500, trace: [`[file: ${path.basename(__filename)}\tmethod: constructor()]`]});

		this.#props = props;
	}

	get id() {
		return this.#props.id;
	}

	get name() {
		return this.#props.name;
	}
}