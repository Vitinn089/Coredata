import { CreateRequest, ProjectsRepository, GetResponse } from '../projects-repository';

export class InMemoryProjectsRepository implements ProjectsRepository {
	public items: GetResponse[] = [{
		id: 'id',
		name: 'Already exists',
		title: 'test',
		description: 'test',
		repository: 'test',
		site: 'test',
		display: true,
		cover: 'test',
		image: 'test'
	}];

	async get(name?: string | undefined): Promise<GetResponse[]>{
		const projectAlreadyExists = this.items.filter( item => name == item.name).length != 0;

		if(name) {
			if(projectAlreadyExists){
				return this.items.filter( item => name == item.name);
			} else {
				return [];
			}
		}
		return this.items;
	}

	async create(data: CreateRequest): Promise<void> {
		this.items.push({...data});
	}
}