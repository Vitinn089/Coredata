export interface GetResponse {
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

export interface CreateRequest {
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

export interface ProjectsRepository {
	get: (name?: string) => Promise<GetResponse[]>;
    create: (data: CreateRequest) => Promise<void>;
}