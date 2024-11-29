import { Logger } from '../infra/logger';

import path from 'path';
import { ProjectsRepositoryInterface, UpdateInteface } from './interfaces/ProjectsInterface';
import { LanguagesRepositoryInteface } from './interfaces/LanguagesRepositoryInteface';
import { TopicsRepositoryInterface } from './interfaces/TopicsRepositoryInterface';
import { ProjectLanguagesRepositoryInterface } from './interfaces/ProjectLanguagesRepositoryInterface';
import { ProjectTopicsRepositoryInterface } from './interfaces/ProjectTopicsRepositoryInterface';
import Project from '../entities/Project';


export class  UpdateProjectUseCases {
	constructor(
		private projectsRepository: ProjectsRepositoryInterface,
        private languagesRepository: LanguagesRepositoryInteface,
        private topicsRepository: TopicsRepositoryInterface,
        private projectLanguagesRepository: ProjectLanguagesRepositoryInterface,
        private projectTopicsRepository: ProjectTopicsRepositoryInterface,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any>
	){}

	async execute(values: UpdateInteface) {
		try {
			const project = (await this.projectsRepository.get(values.id))[0];
			if(!project)
				throw {msg: 'O projeto não foi encontrado! Verifique o id informado.'};
			const newProject = new Project({
				id: values.id,
				name: values.name ?? project.name,
				title: values.title ?? project.title,
				description: values.description ?? project.description,
				repository: values.repository ?? project.repository,
				site: values.site ?? project.site,
				cover: values.cover ?? project.cover,
				image: values.image ?? project.image,
				display: values.display ?? project.display,
			});

			this.projectsRepository.update(newProject.data)
				.then(() => this.logger?.log.info(`O projeto ${newProject.data.name} foi atualizado!`));

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.statusCode){
				error.msg = `Um erro ocorreu enquanto atualizava o projeto no banco de dados. ${error.msg}`;
				error.trace?.unshift(`file: ${path.basename(__filename)} method: execute()`);
			} else {
				error.statusCode = 500;
				error.name = 'InternalServerError';
				error.trace = [`file: ${path.basename(__filename)} method: execute()`];
			}
			throw error;
		}
	}
}