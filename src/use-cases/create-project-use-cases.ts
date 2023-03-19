import { ProjectRepository } from '../repositories/project-repository';
import {v4 as uuidv4} from 'uuid';
import BdError from '../utils/error';

interface CreateProjectUseCasesProject {
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

	async execute(project: CreateProjectUseCasesProject) {
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const msg = `Ocorreu um erro ao salvar o produto ${project.name} no banco de dados.`;
			throw new BdError(msg, error);
		}
	}
}