import { CreateProjectLanguages, ProjectLanguagesRepository, QueryAllProjectLanguages, QueryProjectLanguages } from '../project-languages-repository';

export class InMemoryProjectLanguagesRepository implements ProjectLanguagesRepository {
	public items: QueryAllProjectLanguages[] = [];

	async get(id?: string | undefined): Promise<QueryAllProjectLanguages[]> {
		const languageAlreadyExists = this.items.filter( item => id == item.project_id).length != 0;

		if(!id && languageAlreadyExists) {
			return this.items.filter( item => id == item.project_id);
		}
		
		return this.items;
	}

	async getLanguages(project_id: string): Promise<QueryProjectLanguages[]> {
		const items = this.items.map(item => ({...item, language_name: 'thing'}));
		const languageAlreadyExists = this.items.filter( item => project_id == item.project_id).length != 0;

		if(!project_id && languageAlreadyExists) {
			return items.filter( item => project_id == item.project_id);
		}
		
		return items;
	}

	async create(data: CreateProjectLanguages): Promise<void> {
		this.items.push({project_id: data.project_id, language_id: data.language_id});
	}
}