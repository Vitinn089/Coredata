import { Language } from '../../entities/Project';

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
	getLanguages: (project_id: string) => Promise<Language[]>;
	create: (data: CreateInterface) => Promise<void>;
}