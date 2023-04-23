import express from 'express';
import { PostgresProjectsRepository } from '../../../repositories/postgres/postgres-projects-repository';
import { WinstonLogger } from '../../../infra/winston/winston-logger';
import { PostgresSchemaRepository } from '../../../repositories/postgres/postgres-schema-repository';
import { PostgresLanguagesRepository } from '../../../repositories/postgres/postgres-languages-repository';
import { PostgresTopicsRepository } from '../../../repositories/postgres/postgres-topics-repository';
import { PostgresProjectLanguagesRepository } from '../../../repositories/postgres/postgres-project-languages-repository';
import { PostgresProjectTopicsRepository } from '../../../repositories/postgres/postgres-project-topics-repository';
import GithubRemoteProjectsRepositories from '../../../repositories/github/github-remote-projects-repositories';
import { CoredataController } from '../controllers/coredata-controller';
import routerAdapter from '../../../utils/router-adapter';

const router = express.Router();
const postgresSchemaRepository = new PostgresSchemaRepository();
const postgresProjectsRepository = new PostgresProjectsRepository();
const postgresLanguagesRepository = new PostgresLanguagesRepository();
const postgresTopicsRepository = new PostgresTopicsRepository();
const postgresProjectLanguagesRepository = new PostgresProjectLanguagesRepository();
const postgresProjectTopicsRepository = new PostgresProjectTopicsRepository();
const githubRemoteProjectsRepositories = new GithubRemoteProjectsRepositories();
const winstonLogger = new WinstonLogger();
const controller = new CoredataController(
	postgresSchemaRepository,
	postgresProjectsRepository,
	postgresLanguagesRepository,
	postgresTopicsRepository,
	postgresProjectLanguagesRepository,
	postgresProjectTopicsRepository,
	githubRemoteProjectsRepositories,
	winstonLogger
);

router.get('/', routerAdapter(controller.getProjects()));
// Rota para atualizar  o banco de dados com base nas configurações
router.get('/update-config', routerAdapter(controller.UpdateDatabase()));


export default router;