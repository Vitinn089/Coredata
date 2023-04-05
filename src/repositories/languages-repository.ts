export interface QueryLanguage {
	id: number
	name: string
}

export interface CreateLanguage {
	name: string
}

export interface LanguagesRepository {
	get: (name?: string) => Promise<QueryLanguage[]>;
	create: (data: CreateLanguage) => Promise<void>;
}