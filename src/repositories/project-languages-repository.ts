export interface QueryProjectLanguages {
	project_id: string,
	language_id: number,
}

export interface CreateProjectLanguages {
	project_id: string,
	language_id: number,
}

export interface ProjectLanguagesRepository {
	get: () => Promise<QueryProjectLanguages[]>;
	create: (data: CreateProjectLanguages) => Promise<void>;
}