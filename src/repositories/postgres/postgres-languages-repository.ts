import path from 'path';
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
	
	async get(name?: string) {
		this.#sql = !name 
			? 'SELECT * FROM tb_languages;\n' 
			: 'SELECT * FROM tb_languages WHERE language_name=$1;\n';

		return (await this.#client).query(this.#sql, !name ? [] : [name])
			.then(data => data.rows)
			.catch(error => {
				const msg = `method: create() file: ${path.basename(__filename)} erro:${error.detail}`;
				throw msg;
			});
	}

	async create(data: CreateLanguage) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_languages(language_name) VALUES ($1);\n';

		await (await this.#client).query(this.#sql, values)
			.catch(error => {
				const msg = `method: create() file: ${path.basename(__filename)} erro:${error.detail}`;
				throw msg;
			});
	}
}