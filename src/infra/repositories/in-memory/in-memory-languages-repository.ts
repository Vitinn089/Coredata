import { CreateRequest, LanguagesRepository, GetResponse } from '../languages-repository';

export class InMemoryLanguagesRepository implements LanguagesRepository {
	public items: GetResponse[] = [];
	public id = 0;

	async get(name?: string | undefined): Promise<GetResponse[]> {
		const languageAlreadyExists = this.items.filter( item => name == item.name).length != 0;

		if(!name && languageAlreadyExists) {
			return this.items.filter( item => name == item.name);
		}
		
		return this.items;
	}

	async create(data: CreateRequest): Promise<void> {
		this.items.push({id: this.id, ...data});
	}
}