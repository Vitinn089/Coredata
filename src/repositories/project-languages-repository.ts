export interface QueryAllProjectLanguages {
	project_id: string,
	language_id?: number,
}

export interface QueryProjectLanguages  extends QueryAllProjectLanguages{
	language_name: string
}

export interface CreateProjectLanguages {
	project_id: string,
	language_id: number,
}

export interface ProjectLanguagesRepository {
	get: (project_id?: string) => Promise<QueryAllProjectLanguages[]>;
	getLanguages: (project_id: string) => Promise<QueryProjectLanguages[]>;
	create: (data: CreateProjectLanguages) => Promise<void>;
}