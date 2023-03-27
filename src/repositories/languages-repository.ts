export interface QueryLanguage {
	language_id: number,
	language_name: string,
}

export interface CreateLanguage {
	name: string;
}

export interface LanguagesRepository {
	get: (name?: string) => Promise<QueryLanguage[]>;
	create: (data: CreateLanguage) => Promise<void>;
}