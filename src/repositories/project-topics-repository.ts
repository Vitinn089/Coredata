export interface QueryProjectTopics {
	project_id: string,
	topic_id: number,
}

export interface CreateProjectTopics {
	project_id: string,
	topic_id: number,
}

export interface ProjectTopicsRepository {
	get: () => Promise<QueryProjectTopics[]>;
	create: (data: CreateProjectTopics) => Promise<void>;
}