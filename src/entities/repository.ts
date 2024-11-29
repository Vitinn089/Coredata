export interface RepositoryProps {
	id: number,
	name: string,
	html_url?: string,
	description?: string,
	repository: string,
	topics: string[],
	languages?: string[];
	languages_url: string;
}

export default class Repository {
	constructor(
		private props: RepositoryProps
	){}

	get data () {
		return this.props;
	}

}