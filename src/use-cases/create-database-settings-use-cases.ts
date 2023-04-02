import { ProjectsRepository } from '../repositories/projects-repository';
import {v4 as uuidv4} from 'uuid';
import BdErrorHandler from '../infra/errorHandler/error-handler';
import { Logger } from '../infra/logger';
import { LanguagesRepository, QueryLanguage } from '../repositories/languages-repository';
import { QueryTopic, TopicsRepository } from '../repositories/topics-repository';
import { SchemaRepository } from '../repositories/schema-repository';
import { ProjectLanguagesRepository } from '../repositories/project-languages-repository';
import { ProjectTopicsRepository } from '../repositories/project-topics-repository';

interface CreateProjectUseCasesProject {
	name: string,
	title: string,
	description: string,
	url: string,
	site: string,
	display: boolean,
	capaUrl: string,
	imageUrl:string
    languages: string[]
    topics: string[]
}[];

export class  CreateDatabaseSettingsUseCases {
	constructor(
		private projectsRepository: ProjectsRepository,
        private languagesRepository: LanguagesRepository,
        private topicsRepository: TopicsRepository,
        private projectLanguagesRepository: ProjectLanguagesRepository,
        private projectTopicsRepository: ProjectTopicsRepository,
        private schemaRepository?: SchemaRepository,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any>
	){}

	async execute(project: CreateProjectUseCasesProject) {
		const id = uuidv4();
		try {
			await this.schemaRepository?.create();

			if((await this.projectsRepository.get(project.name)).length)
				throw `O projeto ${project.name} já existe no banco de dados.`;

			await this.projectsRepository.create({
				id,
				name: project.name,
				title: project.title,
				description: project.description,
				repository: project.url,
				site: project.site,
				display: project.display,
				cover: project.capaUrl,
				image:project.imageUrl
			}).then(() => this.logger?.log.info(`Projeto ${project.name} adicionado no banco de dados`));

			// Salva languages
			for (const lang of project.languages) {
				if ((await this.languagesRepository.get(lang)).length == 0){
					await this.languagesRepository.create({
						name: lang
					});
					this.logger?.log.info(`Linguagem ${lang} adicionada ao banco de dados`);
				}
			}

			// Salva relação project languages
			for (const lang of project.languages) {
				const currentLanguage: QueryLanguage = (await this.languagesRepository.get(lang))[0];
				const projectLanguage = (await this.projectLanguagesRepository.get(id)).filter((projectLang) => projectLang.project_id == id && projectLang.language_id == currentLanguage.id ? true : false);

				if(!currentLanguage)
					throw `A linguagem ${lang} não está cadastrada no banco de dados!`;

				if (projectLanguage.length !== 0)
					throw `O projeto ${project.name} já possui a linguagem ${lang}`;

				await this.projectLanguagesRepository.create({project_id: id, language_id: currentLanguage.id});
				
			}
			this.logger?.log.info(`Linguagens do projeto ${project.name} adicionadas ao banco de dados`);

			// Salva topics
			for (const topic of project.topics) {
				if ((await this.topicsRepository.get(topic)).length == 0){
					await this.topicsRepository.create({
						name: topic
					});
					this.logger?.log.info(`Topico ${topic} adicionado ao banco de dados`);
				}
			}

			// Salva relação project topics
			for (const topic of project.topics) {
				const topicAlreadyExists: QueryTopic = (await this.topicsRepository.get(topic))[0];
				const projectAlreadyHasTopic = (await this.projectTopicsRepository.get(id)).filter((projectTopic) => projectTopic.project_id == id && projectTopic.topic_id == topicAlreadyExists.id ? true : false);
				
				if(!topicAlreadyExists)
					throw `O topico ${topic} não está cadastrada no banco de dados!`;

				if (projectAlreadyHasTopic.length !== 0)
					throw `O projeto ${project.name} já possui a linguagem ${topic}`;

				await this.projectTopicsRepository.create({project_id: id, topic_id: topicAlreadyExists.id});
				
			}
			this.logger?.log.info(`Topicos do projeto ${project.name} adicionados ao banco de dados`);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const msg = `Ocorreu um erro ao salvar o produto ${project.name} no banco de dados. ${error}\n`;
			throw new BdErrorHandler(msg);
		}
	}
}