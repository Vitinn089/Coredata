export interface CreateProject {
    id: string,
	name: string,
	title: string,
	description: string,
	repository: string,
	display: boolean,
	cover: string,
	image:string
}

export interface CreateLanguages {
    id: string,
	projectId: string,
	name: string
}

export interface CreateTopics {
    id: string,
	projectId: string,
	name: string
}

export interface ProjectRepository {
    createProject: (data: CreateProject) => Promise<void>;
    createLanguages: (data: CreateLanguages) => Promise<void>;
    createTopics: (data: CreateTopics) => Promise<void>;
}