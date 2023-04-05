export interface QueryProjectTopics {
	project_id?: string,
	id: number
	name?: string
}
export interface CreateProjectTopics {
	project_id?: string,
	id: number
}

export interface ProjectTopicsRepository {
	get: (project_id?: string) => Promise<QueryProjectTopics[]>;
	getTopics: (project_id: string) => Promise<QueryProjectTopics[]>;
	create: (data: CreateProjectTopics) => Promise<void>;
}