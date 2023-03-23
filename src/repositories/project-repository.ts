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
	projectId: string,
	name: string
}

export interface CreateTopics {
	projectId: string,
	name: string
}

export interface QueryProject {
	project_id: string,
	project_name: string,
	project_title: string,
	project_description: string,
	project_repository: string,
	project_display: boolean,
	project_cover: string,
	project_image: string,
}

export interface QueryTopic {
	topic_id: number,
	project_id: string,
	topic_name: string,
}

export interface QueryLanguage {
	language_id: number,
	project_id: string,
	language_name: string,
}

export interface ProjectRepository {
	getProjects: () => Promise<QueryProject[]>;
	getLanguages: () => Promise<QueryLanguage[]>;
	getTopics: () => Promise<QueryTopic[]>;
    createProject: (data: CreateProject) => Promise<void>;
    createLanguages: (data: CreateLanguages) => Promise<void>;
    createTopics: (data: CreateTopics) => Promise<void>;
}