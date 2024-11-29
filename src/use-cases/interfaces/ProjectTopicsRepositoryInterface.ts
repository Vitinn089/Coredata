
export interface GetResponse {
	project_id: string,
	id: number
}

export interface GetTopicsResponse {
	project_id?: string,
	id: number
	name: string
}

export interface CreateInterface {
	project_id: string,
	id: number
}

export interface ProjectTopicsRepositoryInterface {
	get: (project_id?: string) => Promise<GetResponse[]>;
	getTopics: (project_id: string) => Promise<GetTopicsResponse[]>;
	create: (data: CreateInterface) => Promise<void>;
}