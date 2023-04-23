import { ProjectsRepository } from '../repositories/projects-repository';
import {v4 as uuidv4} from 'uuid';
import { Logger } from '../infra/logger';
import { LanguagesRepository, GetResponse } from '../repositories/languages-repository';
import { GetResponse as GetResponseTopic, TopicsRepository } from '../repositories/topics-repository';
import { SchemaRepository } from '../repositories/schema-repository';
import { ProjectLanguagesRepository } from '../repositories/project-languages-repository';
import { ProjectTopicsRepository } from '../repositories/project-topics-repository';
import Repository from '../entities/repository';
import path from 'path';

type CreateProjectUseCasesRequest = Repository

export class  CreateProjectUseCases {
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

	async execute(project: CreateProjectUseCasesRequest) {
		const id = uuidv4();
		try {
			await this.schemaRepository?.create();

			if((await this.projectsRepository.get(project.name)).length)
				throw {msg: `O projeto ${project.name} já existe no banco de dados.`};

			await this.projectsRepository.create({
				id,
				name: project.name,
				title: project.title,
				description: project.description || '',
				repository: project.repository || '',
				site: project.site || '',
				display: project.display,
				cover: project.cover || '',
				image:project.image || ''
			}).then(() => this.logger?.log.info(`Projeto ${project.name} adicionado no banco de dados`));

			// Salva languages
			for (const lang of project.languages) {
				if ((await this.languagesRepository.get(lang)).length == 0){
					await this.languagesRepository.create({name: lang});
					this.logger?.log.info(`Linguagem ${lang} adicionada ao banco de dados`);
				}
			}

			// Salva relação project languages
			for (const lang of project.languages) {
				const currentLanguage: GetResponse = (await this.languagesRepository.get(lang))[0];
				const projectLanguage = (await this.projectLanguagesRepository.get(id)).filter((projectLang) => projectLang.project_id == id && projectLang.id == currentLanguage.id ? true : false);

				if(!currentLanguage)
					throw {msg: `A linguagem ${lang} não está cadastrada no banco de dados!`};

				if (projectLanguage.length !== 0)
					throw {msg: `O projeto ${project.name} já possui a linguagem ${lang}`};

				await this.projectLanguagesRepository.create({project_id: id, id: currentLanguage.id});
				
			}
			this.logger?.log.info(`Linguagens do projeto ${project.name} adicionadas ao banco de dados`);

			// Salva topics
			for (const topic of project.topics) {
				if ((await this.topicsRepository.get(topic)).length == 0){
					await this.topicsRepository.create({name: topic});
					this.logger?.log.info(`Topico ${topic} adicionado ao banco de dados`);
				}
			}

			// Salva relação project topics
			for (const topic of project.topics) {
				const topicAlreadyExists: GetResponseTopic  = (await this.topicsRepository.get(topic))[0];
				const projectAlreadyHasTopic = (await this.projectTopicsRepository.get(id)).filter((projectTopic) => projectTopic.project_id == id && projectTopic.id == topicAlreadyExists.id ? true : false);
				
				if(!topicAlreadyExists)
					throw {msg: `O topico ${topic} não está cadastrada no banco de dados!`};

				if (projectAlreadyHasTopic.length !== 0)
					throw {msg: `O projeto ${project.name} já possui a linguagem ${topic}`};

				await this.projectTopicsRepository.create({project_id: id, id: topicAlreadyExists.id});
				
			}
			this.logger?.log.info(`Topicos do projeto ${project.name} adicionados ao banco de dados`);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.statusCode){
				error.msg = `Um erro ocorreu enquanto criava o projeto ${project.name} no banco de dados. ${error.msg}`;
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