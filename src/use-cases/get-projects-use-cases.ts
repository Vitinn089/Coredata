import Language from '../entities/language';
import Project from '../entities/project';
import Topic from '../entities/topic';
import BdErrorHandler from '../infra/errorHandler/error-handler';
import { Logger } from '../infra/logger';
import { ProjectLanguagesRepository } from '../repositories/project-languages-repository';
import { ProjectTopicsRepository } from '../repositories/project-topics-repository';
import { ProjectsRepository } from '../repositories/projects-repository';

type GetProjectsUseCasesResponse = Promise<Project[]>

export class GetProjectsUseCases {
	constructor(
        private projectsRepository: ProjectsRepository,
        private projectLanguagesRepository: ProjectLanguagesRepository,
        private projectTopicsRepository: ProjectTopicsRepository,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any>
	){}

	async execute(): GetProjectsUseCasesResponse {
		try {
			const projects: Project[] = await this.projectsRepository.get().then(res => {
				return res.map(project => {
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
			
			const obj = Promise.all(projects.map(async project => {
				const langs = await this.projectLanguagesRepository.getLanguages(project.id);
				const top = await this.projectTopicsRepository.getTopics(project.id);

				const languages = langs.map(l => {
					return new Language({name: l.name, id: l.id});
				});

				const topics = top.map(l => {
					return new Topic({name: l.name, id: l.id});
				});

				project.languages = languages;
				project.topics = topics;
				
				return project;
			}));
			
			this.logger?.log.info('Todos os projetos foram consultados no banco de dados.');
			return obj;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const msg = `Ocorreu um erro ao obter os projetos no banco de dados. ${error}\n`;
			throw new BdErrorHandler(msg);
		}
	}
}