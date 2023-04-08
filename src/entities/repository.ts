import ErrorHandler from '../infra/errorHandler/error-handler';

export interface RepositoryProps {
	name: string,
	title: string,
	display: boolean,
	site: string,
	cover: string,
	image: string,
	description: string,
	repository: string,
	topics: string[],
	languages: string[],
}

export default class Repository {
	#props: RepositoryProps;

	constructor(props: RepositoryProps) {
		const { name, title} = props;

		if (!name || !title)
			throw new ErrorHandler('The "name", "title" and "display" properties are required!');

		this.#props = props;
	}

	get name () {
		return this.#props.name;
	}

	get title () {
		return this.#props.title;
	}

	get display () {
		return this.#props.display;
	}

	get site () {
		return this.#props.site;
	}

	get cover () {
		return this.#props.cover;
	}

	get image () {
		return this.#props.image;
	}

	get description () {
		return this.#props.description;
	}

	get repository () {
		return this.#props.repository;
	}

	get topics () {
		return this.#props.topics;
	}

	get languages () {
		return this.#props.languages;
	}

}