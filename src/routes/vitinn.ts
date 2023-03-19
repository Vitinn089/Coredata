import { express } from '..';
import { PostgresProjectRepository } from '../repositories/postgres/postgres-project-repository';
import { CreateProjectUseCases } from '../use-cases/create-project-use-cases';
import { GetProjectsUseCases } from '../use-cases/get-projects-use-cases';
import { getDataApi } from '../utils/getDataApi';

const router = express.Router();

router.get('/', async (req, res) => {
	const postgresProjectRepository = new PostgresProjectRepository();
	const getProjectsUseCases = new GetProjectsUseCases(postgresProjectRepository);

	res.status(200);
	res.json(await getProjectsUseCases.execute());
});

// Rota para atualizar  o banco de dados com base nas configurações
router.get('/update-config', (req, res) => {
	const postgresProjectRepository = new PostgresProjectRepository();
	const createProjectUseCases = new CreateProjectUseCases(postgresProjectRepository);

	getDataApi().then(async projects => {
		for (const project of projects) {
			await createProjectUseCases.execute(project)
				.then(() => console.info(`Produto ${project.name} cadastrado com sucesso!\n`))
				.catch(err => {throw err;});
		}
		return res.status(201).send();
	})
		.catch(err =>{
			console.error(err);
			return res.status(500).send();
		});
});

export default router;