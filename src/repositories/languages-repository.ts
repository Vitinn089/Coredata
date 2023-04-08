export interface GetResponse {
	id: number
	name: string
}

export interface CreateRequest {
	name: string
}

export interface LanguagesRepository {
	get: (name?: string) => Promise<GetResponse[]>;
	create: (data: CreateRequest) => Promise<void>;
}