export interface GetResponse {
	project_id: string,
	id: number
}

export interface GetTopicsResponse {
	project_id?: string,
	id: number
	name: string
}

export interface CreateRequest {
	project_id: string,
	id: number
}

export interface ProjectTopicsRepository {
	get: (project_id?: string) => Promise<GetResponse[]>;
	getTopics: (project_id: string) => Promise<GetTopicsResponse[]>;
	create: (data: CreateRequest) => Promise<void>;
}