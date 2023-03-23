import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateLanguage, LanguagesRepository } from '../languages-repository';

export class PostgresLanguagesRepository implements LanguagesRepository{
	#client: Promise<PoolClient>;
	#sql: string;

	constructor() {
		this.#client = connect();
		this.#sql = '';
	}
	
	async get() {
		this.#sql = 'SELECT * FROM tb_languages;\n';

		return (await this.#client).query(this.#sql)
			.then(data => data.rows)
			.catch(error => {throw {method: 'get()', error};});
	}

	async create(data: CreateLanguage) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_languages(language_name) VALUES ($1);\n';

		await (await this.#client).query(this.#sql, values)
			.catch(error => {throw {method: 'create()', error};});
	}
}