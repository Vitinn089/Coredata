import path from 'path';
import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateRequest, ProjectsRepository } from '../projects-repository';

export class PostgresProjectsRepository implements ProjectsRepository {
	#client: Promise<PoolClient>;
	#sql: string;

	constructor () {
		this.#client = connect();
		this.#sql = '';
	}

	async get(name?: string) {
		this.#sql = !name 
			? 'SELECT project_id AS id, project_name AS name, project_title AS title, project_desc AS description,  project_repo AS repository, project_site AS site, project_display AS display, project_cover AS cover, project_image AS image FROM tb_projects;\n' 
			: 'SELECT project_id AS id, project_name AS name, project_title AS title, project_desc AS description,  project_repo AS repository, project_site AS site, project_display AS display, project_cover AS cover, project_image AS image FROM tb_projects WHERE project_name=$1;\n';
		
		return await(await this.#client).query(this.#sql, !name ? [] : [name])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`[file: ${path.basename(__filename)}	method: get()]`],
					statusCode: 500,
					msg: `erro:${error.detail}`
				};
			});
	}

	async create(data: CreateRequest) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_projects(project_id, project_name, project_title,  project_desc, project_repo, project_site, project_display, project_cover, project_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);\n';

		await (await this.#client).query(this.#sql, values)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`[file: ${path.basename(__filename)}	method: create()]`],
					statusCode: 500,
					msg: `erro:${error.detail}`
				};
			});
	}
}