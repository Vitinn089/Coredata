import ErrorHandler from '../infra/errorHandler/error-handler';

export interface TopicProps {
	project_id?: string;
	id?: number;
	name: string;
}

export default class Topic {
	#props: TopicProps;

	constructor(props: TopicProps) {
		const { id, name } = props;

		if (!id || !name)
			throw new ErrorHandler('The "id" and "name" properties are required!');

		this.#props = props;
	}

	get id() {
		return this.#props.id;
	}

	get name() {
		return this.#props.name;
	}
}