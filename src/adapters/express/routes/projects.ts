import { Router } from 'express';
import { ProjectsController } from '../controllers/ProjectsController';
import routerAdapter from '../../../utils/router-adapter';
import connect from '../../../config/postgres';
import config from '../../../config/config';



const db = connect();

const router = Router();


const controller = new ProjectsController(
	db,
	config.URL_REPOSITORY,
	config.USER_REPOSITORY,
	config.TOKEN_GITHUB
);

router.get('/', routerAdapter(controller.getProjects()));
router.post('/', routerAdapter(controller.saveProjects()));
router.put('/', routerAdapter(controller.updateProjects()));


export default router;