import { RemoteRepositoriesInterface } from './interfaces/RemoteRepositoriesInterface';
import Repository from '../entities/Repository';
import { Logger } from '../infra/logger';
import path from 'path';

export class GetRepositoryUseCase {
	constructor(
		private remoteRepositories: RemoteRepositoriesInterface,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any> 
	) {}

	async execute (repositoryName: string) {
		try {
			const repo = (await this.remoteRepositories.get(repositoryName));

			const repositories = new Repository(repo);
	
			repositories.data.languages = await this.remoteRepositories.getLanguages(repositories.data.languages_url)
				.catch(error => {throw error;});

			return repositories;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error:any) {
			if (error.statusCode){
				error.msg = `Um erro ocorreu e. ${error.msg}`;
				error.trace?.unshift(`file: ${path.basename(__filename)} method: execute()`);
			} else {
				error.statusCode = 500;
				error.name = 'InternalServerError';
				error.trace = [`file: ${path.basename(__filename)} method: execute()`];
			}
			throw error;
		}
	}
}