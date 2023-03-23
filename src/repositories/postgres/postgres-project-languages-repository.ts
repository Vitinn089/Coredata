import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateProjectLanguages, ProjectLanguagesRepository } from '../project-languages-repository';

export class PostgresProjectLanguagesRepository implements ProjectLanguagesRepository {
	#client: Promise<PoolClient>;
	#sql: string;
	
	constructor() {
		this.#client = connect();
		this.#sql = '';
	}

	async get() {
		this.#sql = 'SELECT project_id, language_id FROM tb_project_languages';

		return (await this.#client).query(this.#sql)
			.then(data => data.rows)
			.catch(error => {throw {method: 'get()', error};});
	}
	
	async create(data: CreateProjectLanguages) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_project_languages(project_id, language_id) VALUES ($1, $2)';

		(await this.#client).query(this.#sql, values)
			.catch(error => {throw {method: 'create()', error};});
	}
}