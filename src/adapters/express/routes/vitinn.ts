import { express } from '../server';
import { PostgresProjectsRepository } from '../../../repositories/postgres/postgres-projects-repository';
import { CreateDatabaseSettingsUseCases } from '../../../use-cases/create-database-settings-use-cases';
import { GetProjectsUseCases } from '../../../use-cases/get-projects-use-cases';
import { WinstonLogger } from '../../../infra/winston/winston-logger';
import { PostgresSchemaRepository } from '../../../repositories/postgres/postgres-schema-repository';
import { PostgresLanguagesRepository } from '../../../repositories/postgres/postgres-languages-repository';
import { PostgresTopicsRepository } from '../../../repositories/postgres/postgres-topics-repository';
import { PostgresProjectLanguagesRepository } from '../../../repositories/postgres/postgres-project-languages-repository';
import { PostgresProjectTopicsRepository } from '../../../repositories/postgres/postgres-project-topics-repository';
import GithubRemoteProjectsRepository from '../../../repositories/github/github-remote-project-repository';

const router = express.Router();
const logger = new WinstonLogger();


router.get('/', async (req, res) => {
	const postgresProjectsRepository = new PostgresProjectsRepository();
	const postgresProjectLanguagesRepository = new PostgresProjectLanguagesRepository();
	const postgresProjectTopicsRepository = new PostgresProjectTopicsRepository();
	
	const getProjectsUseCases = new GetProjectsUseCases(
		postgresProjectsRepository, 
		postgresProjectLanguagesRepository,
		postgresProjectTopicsRepository, 
		logger
	);

	try {
		return await getProjectsUseCases.execute()
			.then(data => data.map(d => d.getJson()))
			.then(data => res.status(200).json(data))
			.catch(err =>{
				logger.log.error(err);
				res.status(500).json({erro: err.message});
			});
			
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		logger.log.error(error);
		res.status(500).json({erro: error.message});
	}
});

// Rota para atualizar  o banco de dados com base nas configurações
router.get('/update-config', async (req, res, next) => {
	const postgresSchemaRepository = new PostgresSchemaRepository();
	const postgresProjectsRepository = new PostgresProjectsRepository();
	const postgresLanguagesRepository = new PostgresLanguagesRepository();
	const postgresTopicsRepository = new PostgresTopicsRepository();
	const postgresProjectLanguagesRepository = new PostgresProjectLanguagesRepository();
	const postgresProjectTopicsRepository = new PostgresProjectTopicsRepository();
	const githubRemoteProjectsRepository = new GithubRemoteProjectsRepository();

	const createDatabaseSettingsUseCases = new CreateDatabaseSettingsUseCases(
		postgresProjectsRepository, 
		postgresLanguagesRepository, 
		postgresTopicsRepository, 
		postgresProjectLanguagesRepository,
		postgresProjectTopicsRepository,
		githubRemoteProjectsRepository,
		postgresSchemaRepository, 
		logger
	);

	try {
		await createDatabaseSettingsUseCases.execute()
			.then(() => res.status(201).send())
			.catch((error) => {throw error;});
		next();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		logger.log.error(error);
		res.status(500).json({erro: error.message});
	}
});

export default router;