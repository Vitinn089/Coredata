import { express } from '../server';
import { PostgresProjectRepository } from '../../../repositories/postgres/postgres-project-repository';
import { CreateProjectUseCases } from '../../../use-cases/create-project-use-cases';
import { GetProjectsUseCases } from '../../../use-cases/get-projects-use-cases';
import { getDataApi } from '../../../utils/getDataApi';
import { WinstonLogger } from '../../../_infra/winston/winston-logger';

const router = express.Router();
const logger = new WinstonLogger();

router.get('/', async (req, res) => {
	const postgresProjectRepository = new PostgresProjectRepository();
	const getProjectsUseCases = new GetProjectsUseCases(postgresProjectRepository, logger);

	res.status(200);
	res.json(await getProjectsUseCases.execute());
});

// Rota para atualizar  o banco de dados com base nas configurações
router.get('/update-config', (req, res) => {
	const postgresProjectRepository = new PostgresProjectRepository();
	const createProjectUseCases = new CreateProjectUseCases(postgresProjectRepository, logger);

	getDataApi().then(async projects => {
		for (const project of projects) {
			await createProjectUseCases.execute(project)
				.catch(err => {throw err;});
		}
		return res.status(201).send();
	})
		.then(() => logger.log.info('Configurações cadastradas com sucesso!\n'))
		.catch(err =>{
			logger.log.error(err);
			return res.status(500).send();
		});
});

export default router;