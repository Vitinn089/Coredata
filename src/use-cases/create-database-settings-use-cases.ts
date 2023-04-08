import { Logger } from '../infra/logger';
import { RemoteProjectsRepositories } from '../repositories/remote-projects-repositories';
import { LanguagesRepository } from '../repositories/languages-repository';
import { ProjectLanguagesRepository } from '../repositories/project-languages-repository';
import { ProjectTopicsRepository } from '../repositories/project-topics-repository';
import { ProjectsRepository } from '../repositories/projects-repository';
import { SchemaRepository } from '../repositories/schema-repository';
import { TopicsRepository } from '../repositories/topics-repository';
import { CreateProjectUseCases } from './create-project-use-cases';

export class CreateDatabaseSettingsUseCases {
	constructor(
		private projectsRepository: ProjectsRepository,
        private languagesRepository: LanguagesRepository,
        private topicsRepository: TopicsRepository,
        private projectLanguagesRepository: ProjectLanguagesRepository,
        private projectTopicsRepository: ProjectTopicsRepository,
		private remoteProjectsRepositories: RemoteProjectsRepositories,
        private schemaRepository?: SchemaRepository,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		private logger?: Logger<any>
	) {}
	
	async execute() {
		const createProjectUseCases = new CreateProjectUseCases(
			this.projectsRepository, 
			this.languagesRepository, 
			this.topicsRepository, 
			this.projectLanguagesRepository,
			this.projectTopicsRepository, 
			this.schemaRepository, 
			this.logger
		);
		const repositorys = await this.remoteProjectsRepositories.getData().catch(err => {throw err;});
		
		for (const repository of repositorys) {
			const projectAlreadyExists = await this.projectsRepository.get(repository.name);

			if (!projectAlreadyExists.length)
				await createProjectUseCases.execute(repository);
		}
	}
}