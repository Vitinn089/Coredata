import Repository from '../entities/repository';

export interface ResponseRepositorys {
	name: string,
	languages_url: string,
	description: string,
    topics: string[],
	url: string,
}

export interface RemoteProjectsRepository {
	getData: () => Promise<Repository[]>
}