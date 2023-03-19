import { ProjectRepository } from '../repositories/project-repository';
import BdError from '../utils/error';

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
			const msg = `Ocorreu um erro ao buscar os projetos no banco de dados.\n\tMétodo: ${error.method}\n\t${error.msgError}`;
			throw new BdError(msg, error);
		}
	}
}