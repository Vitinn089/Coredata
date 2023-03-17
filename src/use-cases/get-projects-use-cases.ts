import { ProjectRepository } from '../repositories/project-repository';

export class GetProjectsUseCases {
	constructor(
		private projectRepository: ProjectRepository
	){}

	async execute() {
		try {
			const projects = await this.projectRepository.getProjects();
			const languages = await this.projectRepository.getLanguages();
			const topics = await this.projectRepository.getTopics();

			const obj = projects.map(project => {
				return {
					...project,
					project_topics: topics.reduce((ac: string[], topic ) => {
						if (project.project_id === topic.project_id)
							ac.push(topic.topic_name);
						return ac;
					}, []),
					project_languages: languages.reduce((ac: string[], language) => {
						if (project.project_id === language.project_id)
							ac.push(language.language_name);
						return ac;
					}, [])
				};
			});

			return obj;
		} catch (error) {
			throw {method: 'Ocorreu um erro recuperar os projetos do banco de dados.', error};
		}
	}
}