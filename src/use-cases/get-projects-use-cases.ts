import BdErrorHandler from '../infra/errorHandler/db-error-handler';
import { Logger } from '../infra/logger';
import { ProjectLanguagesRepository } from '../repositories/project-languages-repository';
import { ProjectTopicsRepository } from '../repositories/project-topics-repository';
import { ProjectsRepository } from '../repositories/projects-repository';

export class GetProjectsUseCases {
	constructor(
        private projectsRepository: ProjectsRepository,
        private projectLanguagesRepository: ProjectLanguagesRepository,
        private projectTopicsRepository: ProjectTopicsRepository,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger: Logger<any>
	){}

	async execute() {
		try {
			const projects = await this.projectsRepository.get();
			
			const obj = Promise.all(projects.map(async project => {
				const projectLanguages = await this.projectLanguagesRepository.getLanguages(project.id);
				const projectTopics = await this.projectTopicsRepository.getTopics(project.id);

				const languages = projectLanguages.reduce((ac: string[], language) => {
					if (project.id === language.project_id)
						ac.push(language.language_name);
					return ac;
				}, []);

				const topics = projectTopics.reduce((ac: string[], topic ) => {
					if (project.id === topic.project_id)
						ac.push(topic.topic_name);
					return ac;
				}, []);
				
				return {
					...project,
					topics,
					languages
				};
			}));
			
			this.logger.log.info('Todos os projetos foram consultados no banco de dados.');
			return obj;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const msg = `Ocorreu um erro ao obter os projetos no banco de dados. ${error}\n`;
			throw new BdErrorHandler(msg);
		}
	}
}