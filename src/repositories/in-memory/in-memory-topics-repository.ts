import { CreateTopic, TopicsRepository, QueryTopic } from '../topics-repository';

export class InMemoryTopicsRepository implements TopicsRepository {
	public items: QueryTopic[] = [];
	public id = 0;

	async get(name?: string | undefined): Promise<QueryTopic[]> {
		const topicAlreadyExists = this.items.filter( item => name == item.name).length != 0;

		if(!name && topicAlreadyExists) {
			return this.items.filter( item => name == item.name);
		}
		
		return this.items;
	}

	async create(data: CreateTopic): Promise<void> {
		this.items.push({id: this.id, ...data});
	}
}