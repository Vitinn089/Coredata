import { NextFunction, Request, Response } from 'express';
// import { RemoteRepositories } from '../../../use-cases/interfaces/remoteRepositoriesInterface';
import { RemoteRepositories } from '../../../infra/repositories/github/RemoteRepositories';
import { GetRepositoriesUseCase } from '../../../use-cases/GetRepositoriesUseCase';
import ErrorHandler from '../../../infra/errorHandler/error-handler';
import { WinstonLogger } from '../../../infra/winston/winston-logger';
import { GetRepositoryUseCase } from '../../../use-cases/GetRepositoryUseCase';

export class RepositoriesController {
	#remoteRepositories;
	
	#logger;

	#getRepositoryUseCase;
	#getRepositoriesUseCase;
	constructor(
		private url: string, 
		private user: string,
		private token?: string ,
	){
		// Reporisories
		this.#remoteRepositories = new RemoteRepositories(this.url, this.user,  this.token);
		// Utilities
		this.#logger = new WinstonLogger();
		// Use cases
		this.#getRepositoryUseCase = new GetRepositoryUseCase(
			this.#remoteRepositories,
			this.#logger
		);
		this.#getRepositoriesUseCase = new GetRepositoriesUseCase(
			this.#remoteRepositories,
			this.#logger
		);
	}

	getRepositories () {
		return async (req: Request, res: Response, next: NextFunction) => {
			if(req.body.name){
				return await this.#getRepositoryUseCase.execute(req.body.name)
					.then(repository => {
						res.status(200).json(repository);
						next();
					})
					.catch((error) => next(new ErrorHandler(error)));
			}


			return await this.#getRepositoriesUseCase.execute()
				.then(repositories => {
					const data = repositories.map(repo => repo.data);
					res.status(200).json(data);
					next();
				})
				.catch((error) => next(new ErrorHandler(error)));
		};
	}
}