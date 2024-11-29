export interface GetResponse {
	id: number
	name: string
}

export interface CreateInterface {
	name: string
}

export interface LanguagesRepositoryInteface{

	get: (name?: string) => Promise<GetResponse[]>;
	create: (data: CreateInterface) => Promise<void>;
}