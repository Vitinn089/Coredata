export interface QueryTopic {
	topic_id: number,
	topic_name: string,
}

export interface CreateTopic {
	name: string
}

export interface TopicsRepository {
	get: (name?: string) => Promise<QueryTopic[]>;
	create: (data: CreateTopic) => Promise<void>;
}