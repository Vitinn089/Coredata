import { ProjectRepository } from '../repositories/project-repository';
import BdErrorHandler from '../_infra/errorHandler/db-error-handler';
import { Logger } from '../_infra/logger';

export class GetProjectsUseCases {
	constructor(
		private projectRepository: ProjectRepository,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger: Logger<any>
	){}

	async execute() {
		try {
			const projects = await this.projectRepository.getProjects();
			const languages = await this.projectRepository.getLanguages();
			const topics = await this.projectRepository.getTopics();

			const obj = projects.map(project => {
				return {
					...project,
					topics: topics.reduce((ac: string[], topic ) => {
						if (project.project_id === topic.project_id)
							ac.push(topic.topic_name);
						return ac;
					}, []),
					languages: languages.reduce((ac: string[], language) => {
						if (project.project_id === language.project_id)
							ac.push(language.language_name);
						return ac;
					}, [])
				};
			});

			return obj;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const msg = 'Ocorreu um erro ao buscar os projetos no banco de dados.\n';
			throw new BdErrorHandler(msg, error);
		}
	}
}