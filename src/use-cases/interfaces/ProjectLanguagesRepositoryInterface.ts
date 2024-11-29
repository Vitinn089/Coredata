export interface GetResponse {
	project_id: string,
	id: number
}

export interface GetLanguagesResponse {
	project_id?: string,
	id: number
	name: string
}

export interface CreateInterface {
	project_id: string,
	id: number
}

export interface ProjectLanguagesRepositoryInterface {
	get: (project_id?: string) => Promise<GetResponse[]>;
	getLanguages: (project_id: string) => Promise<string[]>;
	create: (data: CreateInterface) => Promise<void>;
}