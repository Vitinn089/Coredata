import path from 'path';
import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateRequest, LanguagesRepository } from '../languages-repository';

export class PostgresLanguagesRepository implements LanguagesRepository{
	#client: Promise<PoolClient>;
	#sql: string;

	constructor() {
		this.#client = connect();
		this.#sql = '';
	}
	
	async get(name?: string) {
		this.#sql = !name 
			? 'SELECT language_id AS id, language_name AS name FROM tb_languages;\n' 
			: 'SELECT language_id AS id, language_name AS name FROM tb_languages WHERE language_name=$1;\n';

		return (await this.#client).query(this.#sql, !name ? [] : [name])
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
		this.#sql = 'INSERT INTO tb_languages(language_name) VALUES ($1);\n';

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