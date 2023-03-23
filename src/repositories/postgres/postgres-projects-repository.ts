import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateProject, ProjectsRepository } from '../projects-repository';

export class PostgresProjectsRepository implements ProjectsRepository {
	#client: Promise<PoolClient>;
	#sql: string;

	constructor () {
		this.#client = connect();
		this.#sql = '';
	}

	async get() {
		this.#sql = 'SELECT project_id AS id, project_name AS name, project_title AS title, project_desc AS description,  project_repo AS url, project_site AS site, project_display AS display, project_cover AS capaUrl, project_image AS imageUrl FROM tb_projects;\n';

		return (await this.#client).query(this.#sql)
			.then(data => data.rows)
			.catch(error => {throw {method: 'get()', error};});
	}

	async create(data: CreateProject) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_projects(project_id, project_name, project_title,  project_desc, project_repo, project_site, project_display, project_cover, project_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);\n';

		(await this.#client).query(this.#sql, values)
			.catch(error => {throw {method: 'create()', error};});
	}
}