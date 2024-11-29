import {ProjectProps} from '../../entities/Project';

export interface GetResponse {
	id: string,
	name: string,
	title: string,
	description: string,
	repository: string,
	site: string,
	display: boolean,
	cover: string,
	image: string,
}

export interface CreateInteface {
    id: string,
	name: string,
	title: string,
	description: string,
	repository: string,
	site: string,
	display: boolean,
	cover: string,
	image:string
}

export interface UpdateInteface {
    id: string,
	name?: string,
	title?: string,
	description?: string,
	repository?: string,
	site?: string,
	display?: boolean,
	cover?: string,
	image?:string
}

export interface ProjectsRepositoryInterface {
	get: (name?: string) => Promise<ProjectProps[]>;
    create: (data: CreateInteface) => Promise<void>;
	update: (data: UpdateInteface) => Promise<void>;
	delete: (id: string) => Promise<void>;
}