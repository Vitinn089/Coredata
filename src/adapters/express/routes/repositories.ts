import { Router } from 'express';
import { RepositoriesController } from '../controllers/RepositoriesController';
import routerAdapter from '../../../utils/router-adapter';
import config from '../../../config/config';

const {URL_REPOSITORY, USER_REPOSITORY,  TOKEN_GITHUB} = config;

const router =  Router();
const repositoriesController = new RepositoriesController(URL_REPOSITORY, USER_REPOSITORY, TOKEN_GITHUB);

router.get('/',routerAdapter(repositoriesController.getRepositories()));

export default router;