import Repository from '../../entities/repository';
import { RemoteProjectsRepositories } from '../remote-projects-repositories';

export class InMemoryRemoteProjectsRepositories implements RemoteProjectsRepositories {
	public items: Repository[] = [
		new Repository({
			name: 'Already exists',
			title: 'test',
			description: 'test',
			repository: 'test',
			site: 'test',
			display: true,
			cover: 'test',
			image: 'test',
			languages: ['JS'],
			topics: ['JS']
		}),
		new Repository({
			name: 'John Doe',
			title: 'test',
			description: 'test',
			repository: 'test',
			site: 'test',
			display: true,
			cover: 'test',
			image: 'test',
			languages: ['JS'],
			topics: ['JS']
		})
	];

	async getData () {
		return this.items;
	}
}