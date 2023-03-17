import { express } from '..';
import { PostgresProjectRepository } from '../repositories/postgres/postgres-project-repository';
import { CreateProjectUseCases } from '../use-cases/create-projects-use-cases';
import { getDataApi } from '../utils/getDataApi';

const router = express.Router();

router.get('/',  async (req, res) => {
	try {
		const postgresProjectRepository = new PostgresProjectRepository();
		const createProjectsUseCases = new CreateProjectUseCases(postgresProjectRepository);

		getDataApi().then(async projects => {
			for (const project of projects) {
				await createProjectsUseCases.execute(project);
			}
			console.info('Refresh concluido.');
			return res.status(201).send();
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send();
	}
});

export default router;