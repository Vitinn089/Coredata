import path from 'path';
import Project from '../entities/Project';
import { Logger } from '../infra/logger';

import { ProjectsRepositoryInterface } from './interfaces/ProjectsInterface';
import { ProjectLanguagesRepositoryInterface } from './interfaces/ProjectLanguagesRepositoryInterface';
import { ProjectTopicsRepositoryInterface } from './interfaces/ProjectTopicsRepositoryInterface';

type GetProjectsUseCasesResponse = Promise<Project[]>

export class GetProjectsUseCase {
	constructor(
		private projectsRepository: ProjectsRepositoryInterface,
		private projectLanguagesRepository: ProjectLanguagesRepositoryInterface,
        private projectTopicsRepository: ProjectTopicsRepositoryInterface,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any>
	){}

	async execute(id?: string): GetProjectsUseCasesResponse {
		try {
			let projects: Project[] = await this.projectsRepository.get(id)
				.then(projects => {
					return projects.map(project => {
						const  {id, cover, description, display, image, name, repository, site, title} = project;
						return new Project({
							id,
							name,
							title,
							description,
							repository,
							site,
							cover,
							image,
							display,
						});
					});
				});
			
			projects = await Promise.all(projects.map(async project => {
				const langs = await this.projectLanguagesRepository.getLanguages(project.data.id);
				const topics = await this.projectTopicsRepository.getTopics(project.data.id);

				project.data.languages = langs;
				project.data.topics = topics;

				return project;
			}));
			
			this.logger?.log.info('Todos os projetos foram consultados no banco de dados.');
			return projects;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.statusCode){
				error.msg = `Ocorreu um erro ao obter os projetos do banco de dados. ${error.msg}`;
				error.trace?.unshift(`[file: ${path.basename(__filename)} method: execute()]`);
			} else {
				error.statusCode = 500;
				error.name = 'InternalServerError';
				error.trace = [`[file: ${path.basename(__filename)} method: execute()]`];
			}
			throw error;
		}
	}
}