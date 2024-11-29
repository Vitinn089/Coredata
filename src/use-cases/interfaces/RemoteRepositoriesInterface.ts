import { RepositoryProps } from '../../entities/Repository';

export interface RemoteRepositoriesInterface {

	getAll: () => Promise<[RepositoryProps]>
	get: (repositoryName: string) => Promise<RepositoryProps>
	getLanguages: (url?: string) => Promise<string[]>
}