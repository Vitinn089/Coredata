import path from 'path';
import ErrorHandler from '../infra/errorHandler/error-handler';

export interface ProjectProps {
	id: string;
	name: string;
	title: string ;// *
	description?: string;
	repository?: string;
	site?: string;
	cover?: string; // *
	image?: string;	// *
	display: boolean;	// *
	languages?: string[];
	topics?: string[];
}

export default class Project {
	constructor(private props: ProjectProps) {
		this.props.display = this.props.display ?? false;

		if ( !this.props.title)
			throw new ErrorHandler({msg: 'The "title" are required!', name: 'InternalServerError', statusCode: 500, trace: [`[file: ${path.basename(__filename)}\tmethod: constructor()]`]});
	}

	get data() {
		return this.props;	
	}

	getJson() {
		return JSON.stringify(this.props);
	}
}