import { ProjectRepository } from '../repositories/project-repository';
import {v4 as uuidv4} from 'uuid';
import BdErrorHandler from '../_infra/errorHandler/db-error-handler';
import { Logger } from '../_infra/logger';

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
        private projectRepository: ProjectRepository,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger: Logger<any>
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
			}).then(() => this.logger.log.info(`Projeto ${project.name} adicionado no banco de dados`));
			
			for (const lang of project.languages) {
				await this.projectRepository.createLanguages({
					projectId: id,
					name: lang
				});
			}
			this.logger.log.info(`Linguagens do projeto ${project.name} adicionadas ao banco de dados`);

			for (const topic of project.languages) {
				await this.projectRepository.createTopics({
					projectId: id,
					name: topic
				});
			}
			this.logger.log.info(`Topicos do projeto ${project.name} adicionados ao banco de dados\n`);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const msg = `Ocorreu um erro ao salvar o produto ${project.name} no banco de dados.\n`;
			throw new BdErrorHandler(msg, error);
		}
	}
}