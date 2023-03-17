import { ProjectRepository } from '../repositories/project-repository';
import {v4 as uuidv4} from 'uuid';

interface CreateProjectsUseCasesProject {
	name: string,
	title: string,
	description: string,
	url: string,
	display: boolean,
	capaUrl: string,
	imageUrl:string
    languages: string[]
    topics: string[]
}[];

export class  CreateProjectUseCases {
	constructor(
        private projectRepository: ProjectRepository
	){}

	async execute(project: CreateProjectsUseCasesProject) {
		const id = uuidv4();
		try {
			await this.projectRepository.createProject({
				id,
				name: project.name,
				title: project.title,
				description: project.description,
				repository: project.url,
				display: project.display,
				cover: project.capaUrl,
				image:project.imageUrl
			});
			
			for (const lang of project.languages) {
				await this.projectRepository.createLanguages({
					projectId: id,
					name: lang
				});
			}

			for (const topic of project.languages) {
				await this.projectRepository.createTopics({
					projectId: id,
					name: topic
				});
			}
		} catch (error) {
			throw {method: 'Ocorreu um erro ao salvar os produtos no banco de dados.', error};
		}
	}
}