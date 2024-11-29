import { NextFunction, Request, Response } from 'express';
import { WinstonLogger } from '../../../infra/winston/winston-logger';
import ErrorHandler from '../../../infra/errorHandler/error-handler';
import { GetProjectsUseCase } from '../../../use-cases/GetProjectsUseCase';
import { ProjectsRepository } from '../../../infra/repositories/postgres/ProjectsRepository';
import { ProjectLanguagesRepository } from '../../../infra/repositories/postgres/ProjectLanguagesRepository';
import { ProjectTopicsRepository } from '../../../infra/repositories/postgres/ProjectTopicsRepository';
import { RemoteRepositories } from '../../../infra/repositories/github/RemoteRepositories';
import repositoryToProject from '../../../utils/repositoryToProject';
import { SaveProjectUseCases } from '../../../use-cases/SaveProjectUseCase';
import { LanguagesRepository } from '../../../infra/repositories/postgres/LanguagesRepository';
import { TopicsRepository } from '../../../infra/repositories/postgres/TopicsRepository';
import { GetRepositoryUseCase } from '../../../use-cases/GetRepositoryUseCase';
import { UpdateProjectUseCases } from '../../../use-cases/UpdateProjectUseCase';

export class ProjectsController {
	#projectsRepository;
	#languagesRepository;
	#topicsRepository;
	#projectLanguagesRepository;
	#projectTopicsRepository;
	#remoteRepositories;
	
	#logger;

	#getRepositoryUseCase;
	#getProjectsUseCase;
	#saveProjectsUseCase;
	#updateProjectsUseCase;
	constructor (
		private db: Promise<Connection>,
		private url: string,
		private user: string,
		private token?: string
	) {
		// Repositorios
		this.#projectsRepository = new ProjectsRepository(this.db);
		this.#languagesRepository = new LanguagesRepository(this.db);
		this.#topicsRepository = new TopicsRepository(this.db);
		this.#projectLanguagesRepository = new ProjectLanguagesRepository(this.db);
		this.#projectTopicsRepository = new ProjectTopicsRepository(this.db);
		this.#remoteRepositories = new RemoteRepositories(url, user, token);

		// Outros
		this.#logger = new WinstonLogger();

		//Casos de uso
		this.#getRepositoryUseCase = new GetRepositoryUseCase(
			this.#remoteRepositories,
			this.#logger
		);
		this.#getProjectsUseCase = new GetProjectsUseCase(
			this.#projectsRepository, 
			this.#projectLanguagesRepository,
			this.#projectTopicsRepository, 
			this.#logger
		);
		this.#saveProjectsUseCase = new SaveProjectUseCases(
			this.#projectsRepository,
			this.#languagesRepository,
			this.#topicsRepository,
			this.#projectLanguagesRepository,
			this.#projectTopicsRepository,
			this.#logger
		);
		this.#updateProjectsUseCase = new UpdateProjectUseCases(
			this.#projectsRepository,
			this.#languagesRepository,
			this.#topicsRepository,
			this.#projectLanguagesRepository,
			this.#projectTopicsRepository,
			this.#logger
		);
	}

	getProjects () {
		return async (req: Request, res: Response, next: NextFunction) => {
			return await this.#getProjectsUseCase.execute(req.body.id)
				.then(data => data.map(d => d.data))
				.then(data => {
					res.status(200).json(data);
					next();
				})
				.catch(error => next(new ErrorHandler(error)));
		};
	}

	saveProjects() {
		return async (req: Request, res: Response, next: NextFunction) => {
			let created = [];
			try {
				const isBodyArray = Array.isArray(req.body);
				if(isBodyArray){
					for (const option of req.body){
						const repository = await this.#getRepositoryUseCase.execute(option.name);
						const project =  repositoryToProject(repository, option);
						await this.#saveProjectsUseCase.execute(project);
						created.push((await this.#getProjectsUseCase.execute(option.id))[0]);
					}
				} else {
					const repository = await this.#getRepositoryUseCase.execute(req.body.name);
					const project =  repositoryToProject(repository, req.body);
					await this.#saveProjectsUseCase.execute(project);
					created = (await this.#getProjectsUseCase.execute(req.body.id));
				}
				res.status(201).json(created);
				next();
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				next(new ErrorHandler(error));
			}
		};
	}

	updateProjects() {
		return async (req: Request, res: Response, next: NextFunction) => {
			let updated = [];
			try {
				const isBodyArray = Array.isArray(req.body);
				if(isBodyArray){
					for (const option of req.body){
						await this.#updateProjectsUseCase.execute(option);
						updated.push((await this.#getProjectsUseCase.execute(option.id))[0]);
					}
				} else {
					await this.#updateProjectsUseCase.execute(req.body);
					updated = (await this.#getProjectsUseCase.execute(req.body.id));
				}
				res.status(200).json(updated);
				next();
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				next(new ErrorHandler(error));
			}
		};
	}
}