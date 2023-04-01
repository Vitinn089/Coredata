import { express } from '../server';
import { PostgresProjectsRepository } from '../../../repositories/postgres/postgres-projects-repository';
import { CreateDatabaseSettingsUseCases } from '../../../use-cases/create-database-settings-use-cases';
import { GetProjectsUseCases } from '../../../use-cases/get-projects-use-cases';
import { getDataApi } from '../../../utils/getDataApi';
import { WinstonLogger } from '../../../infra/winston/winston-logger';
import { PostgresSchemaRepository } from '../../../repositories/postgres/postgres-schema-repository';
import { PostgresLanguagesRepository } from '../../../repositories/postgres/postgres-languages-repository';
import { PostgresTopicsRepository } from '../../../repositories/postgres/postgres-topics-repository';
import { PostgresProjectLanguagesRepository } from '../../../repositories/postgres/postgres-project-languages-repository';
import { PostgresProjectTopicsRepository } from '../../../repositories/postgres/postgres-project-topics-repository';

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

	return await getProjectsUseCases.execute()
		.then(data => res.status(200).json(data))
		.catch(err =>{
			logger.log.error(err);
			return res.status(500).json({erro: err.message});
		});
});

// Rota para atualizar  o banco de dados com base nas configurações
router.get('/update-config', (req, res) => {
	const postgresSchemaRepository = new PostgresSchemaRepository();
	const postgresProjectsRepository = new PostgresProjectsRepository();
	const postgresLanguagesRepository = new PostgresLanguagesRepository();
	const postgresTopicsRepository = new PostgresTopicsRepository();
	const postgresProjectLanguagesRepository = new PostgresProjectLanguagesRepository();
	const postgresProjectTopicsRepository = new PostgresProjectTopicsRepository();

	const createDatabaseSettingsUseCases = new CreateDatabaseSettingsUseCases(
		postgresSchemaRepository, 
		postgresProjectsRepository, 
		postgresLanguagesRepository, 
		postgresTopicsRepository, 
		postgresProjectLanguagesRepository,
		postgresProjectTopicsRepository, 
		logger
	);

	getDataApi().then(async projects => {
		for (const project of projects) {
			await createDatabaseSettingsUseCases.execute(project);
		}
		return res.status(201).send();
	})
		.then(() => logger.log.info('Configurações cadastradas com sucesso!\n'))
		.catch(err =>{
			logger.log.error(err);
			return res.status(500).json({erro: err.message});
		});
});

export default router;