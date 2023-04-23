import path from 'path';
import ErrorHandler from '../infra/errorHandler/error-handler';
import { arrayToString } from '../utils/array-to-string';
import Language from './language';
import Topic from './topic';

export interface ProjectProps {
	id: string;
	name: string;
	title: string;
	description?: string;
	repository?: string;
	site?: string;
	cover?: string;
	image?: string;
	display: boolean;
	languages?: Language[];
	topics?: Topic[];
}

export default class Project {
	#props: ProjectProps;

	constructor(props: ProjectProps) {
		const { id, name, title} = props;

		if (!id || !name || !title)
			throw new ErrorHandler({msg: 'The "id", "name", "title" and "display" properties are required!', name: 'InternalServerError', statusCode: 500, trace: [`[file: ${path.basename(__filename)}\tmethod: constructor()]`]});

		this.#props = props;
	}


	get id() {
		return this.#props.id;	
	}

	get name() {
		return this.#props.name;	
	}

	get title() {
		return this.#props.title;
	}

	get description() {
		return this.#props.description;
	}

	get repository() {
		return this.#props.repository;
	}

	get site() {
		return this.#props.site;
	}

	get cover() {
		return this.#props.cover;
	}

	get image() {
		return this.#props.image;
	}

	get display() {
		return this.#props.display;
	}
	
	set languages(lang: Language[]) {
		this.#props.languages = lang;
	}
	
	get languages() {
		if (this.#props.languages)
			return this.#props.languages;
		return [];
	}
	
	set topics(topic: Topic[]) {
		this.#props.topics = topic;
	}

	get topics() {
		if(this.#props.topics)
			return this.#props.topics;
		return [];
	}

	getJson() {
		const {id, display, name, title, cover, description, image, repository, site} = this.#props;
		const languages = arrayToString(this.#props.languages);
		const topics = arrayToString(this.#props.languages);

		return {
			id,
			name,
			title,
			description,
			repository,
			site,
			cover,
			image,
			display,
			languages,
			topics,
		};
	}
}