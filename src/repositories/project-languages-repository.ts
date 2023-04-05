export interface QueryProjectLanguages {
	project_id?: string,
	id: number
	name?: string
}

export interface CreateProjectLanguages {
	project_id?: string,
	id: number
}

export interface ProjectLanguagesRepository {
	get: (project_id?: string) => Promise<QueryProjectLanguages[]>;
	getLanguages: (project_id: string) => Promise<QueryProjectLanguages[]>;
	create: (data: CreateProjectLanguages) => Promise<void>;
}