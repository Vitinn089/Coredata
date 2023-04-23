import path from 'path';
import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateRequest, ProjectLanguagesRepository } from '../project-languages-repository';

export class PostgresProjectLanguagesRepository implements ProjectLanguagesRepository {
	#client: Promise<PoolClient>;
	#sql: string;
	
	constructor() {
		this.#client = connect();
		this.#sql = '';
	}

	async get(project_id?: string) {
		this.#sql = !project_id 
			? 'SELECT project_id, language_id AS id FROM tb_project_languages;' 
			: 'SELECT project_id, language_id AS id FROM tb_project_languages WHERE project_id=$1;';
		
		return (await this.#client).query(this.#sql, !project_id ? [] : [project_id])
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

	async getLanguages(project_id: string) {
		this.#sql = 'SELECT project_id, tb_languages.language_id AS id, language_name AS name FROM tb_project_languages RIGHT JOIN tb_languages ON tb_project_languages.language_id = tb_languages.language_id  WHERE project_id=$1;';
		
		return (await this.#client).query(this.#sql, [project_id])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`[file: ${path.basename(__filename)}	method: getLanguages()]`],
					statusCode: 500,
					msg: `erro:${error.detail}`
				};
			});
	}
	
	async create(data: CreateRequest) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_project_languages(project_id, language_id) VALUES ($1, $2);';

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