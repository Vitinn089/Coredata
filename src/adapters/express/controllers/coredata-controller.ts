import { NextFunction, Request, Response } from 'express';
import { GetProjectsUseCases } from '../../../use-cases/get-projects-use-cases';
import { CreateDatabaseSettingsUseCases } from '../../../use-cases/create-database-settings-use-cases';
import { SchemaRepository } from '../../../repositories/schema-repository';
import { ProjectsRepository } from '../../../repositories/projects-repository';
import { LanguagesRepository } from '../../../repositories/languages-repository';
import { TopicsRepository } from '../../../repositories/topics-repository';
import { ProjectLanguagesRepository } from '../../../repositories/project-languages-repository';
import { ProjectTopicsRepository } from '../../../repositories/project-topics-repository';
import { RemoteProjectsRepositories } from '../../../repositories/remote-projects-repositories';
import { WinstonLogger } from '../../../infra/winston/winston-logger';
import ErrorHandler from '../../../infra/errorHandler/error-handler';

export class CoredataController {
	constructor (
		private schemaRepository: SchemaRepository,
		private projectsRepository: ProjectsRepository,
		private languagesRepository: LanguagesRepository,
		private topicsRepository: TopicsRepository,
		private projectLanguagesRepository: ProjectLanguagesRepository,
		private projectTopicsRepository: ProjectTopicsRepository,
		private remoteProjectsRepositories: RemoteProjectsRepositories,
		private logger: WinstonLogger
	) {}

	getProjects() {
		return async (req: Request, res: Response, next: NextFunction) => {
			const getProjectsUseCases = new GetProjectsUseCases(
				this.projectsRepository, 
				this.projectLanguagesRepository,
				this.projectTopicsRepository, 
				this.logger
			);
		
			return await getProjectsUseCases.execute()
				.then(data => data.map(d => d.getJson()))
				.then(data => res.status(200).json(data))
				.catch(error => next(new ErrorHandler(error)));
		};
	}

	UpdateDatabase () {
		return async (req: Request, res: Response, next: NextFunction) => {
			const createDatabaseSettingsUseCases = new CreateDatabaseSettingsUseCases(
				this.projectsRepository, 
				this.languagesRepository, 
				this.topicsRepository, 
				this.projectLanguagesRepository,
				this.projectTopicsRepository,
				this.remoteProjectsRepositories,
				this.schemaRepository, 
				this.logger
			);
		
			createDatabaseSettingsUseCases.execute()
				.then(() => res.status(201).json({200: 'Update realizado com sucesso!'}))
				.catch((error) => next(new ErrorHandler(error)));
		};
	}
}