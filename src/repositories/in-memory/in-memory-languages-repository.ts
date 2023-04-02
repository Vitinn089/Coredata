import { CreateLanguage, LanguagesRepository, QueryLanguage } from '../languages-repository';

export class InMemoryLanguagesRepository implements LanguagesRepository {
	public items: QueryLanguage[] = [];
	public id = 0;

	async get(name?: string | undefined): Promise<QueryLanguage[]> {
		const languageAlreadyExists = this.items.filter( item => name == item.name).length != 0;

		if(!name && languageAlreadyExists) {
			return this.items.filter( item => name == item.name);
		}
		
		return this.items;
	}

	async create(data: CreateLanguage): Promise<void> {
		this.items.push({id: this.id, ...data});
	}
}