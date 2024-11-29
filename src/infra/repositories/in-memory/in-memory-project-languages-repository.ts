import { CreateRequest, ProjectLanguagesRepository, GetResponse, GetLanguagesResponse } from '../project-languages-repository';

export class InMemoryProjectLanguagesRepository implements ProjectLanguagesRepository {
	public items: GetResponse[] = [];

	async get(id?: string | undefined): Promise<GetResponse[]> {
		const languageAlreadyExists = this.items.filter( item => id == item.project_id).length != 0;

		if(!id && languageAlreadyExists) {
			return this.items.filter( item => id == item.project_id);
		}
		
		return this.items;
	}

	async getLanguages(project_id: string): Promise<GetLanguagesResponse[]> {
		const items = this.items.map(item => ({...item, name: 'thing'}));
		const languageAlreadyExists = this.items.filter( item => project_id == item.project_id).length != 0;

		if(!project_id && languageAlreadyExists) {
			
			return items.filter( item => {
				project_id == item.project_id;
			});
		}
		
		return items;
	}

	async create(data: CreateRequest): Promise<void> {
		this.items.push({project_id: data.project_id, id: data.id});
	}
}