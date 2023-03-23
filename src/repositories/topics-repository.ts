export interface QueryTopic {
	id: number,
	name: string,
}

export interface CreateTopic {
	name: string
}

export interface TopicsRepository {
	get: () => Promise<QueryTopic[]>;
	create: (data: CreateTopic) => Promise<void>;
}