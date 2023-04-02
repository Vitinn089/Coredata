import { CreateProjectTopics, ProjectTopicsRepository, QueryAllProjectTopics, QueryProjectTopics } from '../project-topics-repository';

export class InMemoryProjectTopicsRepository implements ProjectTopicsRepository {
	public items: QueryAllProjectTopics[] = [];

	async get(id?: string | undefined): Promise<QueryAllProjectTopics[]> {
		const languageAlreadyExists = this.items.filter( item => id == item.project_id).length != 0;

		if(!id && languageAlreadyExists) {
			return this.items.filter( item => id == item.project_id);
		}
		
		return this.items;
	}

	async getTopics(project_id: string): Promise<QueryProjectTopics[]> {
		const items = this.items.map(item => ({...item, topic_name: 'thing'}));
		const languageAlreadyExists = this.items.filter( item => project_id == item.project_id).length != 0;

		if(!project_id && languageAlreadyExists) {
			return items.filter( item => project_id == item.project_id);
		}
		
		return items;
	}

	async create(data: CreateProjectTopics): Promise<void> {
		this.items.push({project_id: data.project_id, topic_id: data.topic_id});
	}
}