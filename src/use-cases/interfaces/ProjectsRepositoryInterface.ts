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

export interface CreateInteface {
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

export interface ProjectsRepositoryInterface {
	get: (name?: string) => Promise<GetResponse[]>;
    create: (data: CreateInteface) => Promise<void>;
}