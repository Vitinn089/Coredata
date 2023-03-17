import { express } from '..';
import { PostgresProjectRepository } from '../repositories/postgres/postgres-project-repository';
import { GetProjectsUseCases } from '../use-cases/get-projects-use-cases';

const router = express.Router();

router.get('/', async (req, res) => {
	const postgresProjectRepository = new PostgresProjectRepository();
	const getProjectsUseCases = new GetProjectsUseCases(postgresProjectRepository);

	res.status(200);
	res.json(await getProjectsUseCases.execute());
});

export default router;