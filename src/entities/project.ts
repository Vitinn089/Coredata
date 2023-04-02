import ErrorHandler from '../infra/errorHandler/error-handler';
import Language from './language';
import Topic from './topic';

export interface ProjectProps {
	id: string;
	name: string;
	title: string;
	description?: string;
	url?: string;
	site?: string;
	capaUrl?: string;
	imageUrl?: string;
	display: boolean;
	languages?: Language[];
	topics?: Topic[];
}

export default class Project {
	#props: ProjectProps;

	constructor(props: ProjectProps) {
		const { id, name, title} = props;

		if (!id || !name || !title)
			throw new ErrorHandler('The "id", "name", "title" and "display" properties are required!'); 

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
		return this.#props.url;
	}

	get site() {
		return this.#props.site;
	}

	get cover() {
		return this.#props.capaUrl;
	}

	get image() {
		return this.#props.imageUrl;
	}

	get display() {
		return this.#props.display;
	}

	get languages() {
		return this.#props.languages;
	}

	get topics() {
		return this.#props.topics;
	}

}