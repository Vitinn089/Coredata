import Repository from '../entities/repository';

export interface ResponseRepositories {
	name: string,
	languages_url: string,
	description: string,
    topics: string[],
	html_url: string,
}

export interface RemoteProjectsRepositories {
	getData: () => Promise<Repository[]>
}