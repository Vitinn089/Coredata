export interface CreateProject {
    id: string,
	name: string,
	title: string,
	description: string,
	repository: string,
	site: string,
	display: boolean,
	cover: string,
	image:string
}

export interface QueryProject {
	id: string,
	name: string,
	title: string,
	description: string,
	repository: string,
	site: string,
	display: boolean,
	cover: string,
	image: string,
}

export interface ProjectsRepository {
	get: () => Promise<QueryProject[]>;
    create: (data: CreateProject) => Promise<void>;
}