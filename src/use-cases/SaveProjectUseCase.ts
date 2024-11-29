import { Logger } from '../infra/logger';

import path from 'path';
import { ProjectsRepositoryInterface } from './interfaces/ProjectsInterface';
import { LanguagesRepositoryInteface } from './interfaces/LanguagesRepositoryInteface';
import { TopicsRepositoryInterface } from './interfaces/TopicsRepositoryInterface';
import { ProjectLanguagesRepositoryInterface } from './interfaces/ProjectLanguagesRepositoryInterface';
import { ProjectTopicsRepositoryInterface } from './interfaces/ProjectTopicsRepositoryInterface';
import Project from '../entities/Project';


export class  SaveProjectUseCases {
	constructor(
		private projectsRepository: ProjectsRepositoryInterface,
        private languagesRepository: LanguagesRepositoryInteface,
        private topicsRepository: TopicsRepositoryInterface,
        private projectLanguagesRepository: ProjectLanguagesRepositoryInterface,
        private projectTopicsRepository: ProjectTopicsRepositoryInterface,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any>
	){}

	async execute(project: Project) {
		try {

			if((await this.projectsRepository.get(project.data.name)).length)
				return this.logger?.log.info(`O projeto ${project.data.name} já existe no banco de dados.`);

			await this.projectsRepository.create({
				id: project.data.id,
				name: project.data.name,
				title: project.data.title,
				description: project.data.description || '',
				repository: project.data.repository || '',
				site: project.data.site || '',
				display: project.data.display,
				cover: project.data.cover || '',
				image:project.data.image || ''
			}).then(() => this.logger?.log.info(`Projeto ${project.data.name} adicionado no banco de dados`))
				.catch(err => {throw err;});
			
			if(project.data.languages) {
				// Salva languages
				for (const lang of project.data.languages) {
					if ((await this.languagesRepository.get(lang)).length == 0){
						await this.languagesRepository.create({name: lang}).catch(err => {throw err;});
						this.logger?.log.info(`Linguagem ${lang} adicionada ao banco de dados`);
					}
				}

				// Salva relação project languages
				for (const lang of project.data.languages) {
					const currentLanguage = (await this.languagesRepository.get(lang))[0];
					const projectLanguage = (await this.projectLanguagesRepository.get(project.data.id)).filter((projectLang) => projectLang.project_id == project.data.id && projectLang.id == currentLanguage.id ? true : false);

					if(!currentLanguage)
						throw {msg: `A linguagem ${lang} não está cadastrada no banco de dados!`};

					if (projectLanguage.length !== 0)
						throw {msg: `O projeto ${project.data.name} já possui a linguagem ${lang}`};

					await this.projectLanguagesRepository.create({project_id: project.data.id, id: currentLanguage.id});
				}
			}
			this.logger?.log.info(`Linguagens do projeto ${project.data.name} adicionadas ao banco de dados`);

			if(project.data.topics) {
				// Salva topics
				for (const topic of project.data.topics) {
					if ((await this.topicsRepository.get(topic)).length == 0){
						await this.topicsRepository.create({name: topic});
						this.logger?.log.info(`Topico ${topic} adicionado ao banco de dados`);
					}
				}
	
				// Salva relação project topics
				for (const topic of project.data.topics) {
					const topicAlreadyExists  = (await this.topicsRepository.get(topic))[0];
					const projectAlreadyHasTopic = (await this.projectTopicsRepository.get(project.data.id)).filter((projectTopic) => projectTopic.project_id == project.data.id && projectTopic.id == topicAlreadyExists.id ? true : false);
					
					if(!topicAlreadyExists)
						throw {msg: `O topico ${topic} não está cadastrada no banco de dados!`};
	
					if (projectAlreadyHasTopic.length !== 0)
						throw {msg: `O projeto ${project.data.name} já possui a linguagem ${topic}`};
	
					await this.projectTopicsRepository.create({project_id: project.data.id, id: topicAlreadyExists.id}).catch(err => {throw err;});
				}
			}
			this.logger?.log.info(`Topicos do projeto ${project.data.name} adicionados ao banco de dados`);

			const msg = `Projeto ${project.data.name} adicionado no banco de dados`;
			this.logger?.log.info(msg);
			return msg;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.statusCode){
				error.msg = `Um erro ocorreu enquanto criava o projeto ${project.data.name} no banco de dados. ${error.msg}`;
				error.trace?.unshift(`file: ${path.resolve(__filename)} method: execute()`);
			} else {
				error.statusCode = 500;
				error.name = 'InternalServerError';
				error.trace = [`file: ${path.resolve(__filename)} method: execute()`];
			}
			throw error;
		}
	}
}