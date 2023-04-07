export interface GetResponse {
	project_id: string,
	id: number
}

export interface GetLanguagesResponse {
	project_id?: string,
	id: number
	name: string
}

export interface CreateProjectLanguages {
	project_id?: string,
	id: number
}

export interface ProjectLanguagesRepository {
	get: (project_id?: string) => Promise<GetResponse[]>;
	getLanguages: (project_id: string) => Promise<GetLanguagesResponse[]>;
	create: (data: CreateProjectLanguages) => Promise<void>;
}