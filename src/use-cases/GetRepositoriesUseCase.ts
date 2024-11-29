import { RemoteRepositoriesInterface } from './interfaces/RemoteRepositoriesInterface';
import Repository from '../entities/Repository';
import { Logger } from '../infra/logger';

export class GetRepositoriesUseCase {
	constructor(
		private remoteRepositories: RemoteRepositoriesInterface,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any> 
	) {}

	async execute () {
		const repos = (await this.remoteRepositories.getAll());

		let repositories = repos.map(repo => {
			return new Repository(repo);
		});

		// Consulta as linguagens de todos os repositórios.
		repositories = await Promise.all(repositories.map(async repo => {
			return await this.remoteRepositories.getLanguages(repo.data.languages_url)
				.then(languages => {
					repo.data.languages = languages;
					return repo;
				})
				.catch(err => {throw err;});
		}));
		return repositories;
	}
}