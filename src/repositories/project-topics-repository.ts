export interface QueryAllProjectTopics {
	topic_id: number
}

export interface QueryProjectTopics extends QueryAllProjectTopics{
	topic_name: string
}

export interface CreateProjectTopics {
	project_id: string,
	topic_id: number,
}

export interface ProjectTopicsRepository {
	get: (project_id?: string) => Promise<QueryAllProjectTopics[]>;
	getTopics: (project_id: string) => Promise<QueryProjectTopics[]>;
	create: (data: CreateProjectTopics) => Promise<void>;
}