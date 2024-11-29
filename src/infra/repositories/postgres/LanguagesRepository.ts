import path from 'path';
import { LanguagesRepositoryInteface, CreateInterface } from '../../../use-cases/interfaces/LanguagesRepositoryInteface';

export class LanguagesRepository implements LanguagesRepositoryInteface{
	constructor(
		private db: Promise<Connection>,
		private sql?: string
	) {
		this.sql = '';
	}
	
	async get(name?: string) {
		this.sql = `
			SELECT language_id AS id, 
				language_name AS name 
				FROM tb_languages
		`;

		if (name)	
			this.sql += ' WHERE language_name=$1;';

		return (await this.db).query(this.sql, !name ? [] : [name])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`[file: ${path.resolve(__filename)}	method: get()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}

	async create(data: CreateInterface) {
		const values = Object.values(data);
		this.sql = `
			INSERT INTO tb_languages(
				language_name
			) VALUES ($1);
		 `;

		await (await this.db).query(this.sql, values)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: create()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}
}