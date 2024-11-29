import path from 'path';
import { CreateInterface, ProjectLanguagesRepositoryInterface } from '../../../use-cases/interfaces/ProjectLanguagesRepositoryInterface';

export class ProjectLanguagesRepository implements ProjectLanguagesRepositoryInterface {
	constructor(
		private db: Promise<Connection>,
		private sql?: string
	) {
		this.sql = '';
	}

	async get(project_id?: string) {
		this.sql = `
			SELECT project_id, 
				language_id AS id 
			FROM tb_project_languages`;
		
		if (project_id)
			this.sql += ' WHERE project_id=$1;';
		
		return (await this.db).query(this.sql, !project_id ? [] : [project_id])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: get()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}

	async getLanguages(project_id: string) {
		this.sql = `
			SELECT
				tb_languages.language_id AS id, 
				language_name AS name 
			FROM tb_project_languages RIGHT JOIN tb_languages 
			ON tb_project_languages.language_id = tb_languages.language_id  
			WHERE project_id=$1;
		`;
		
		return (await this.db).query(this.sql, [project_id])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: getLanguages()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}
	
	async create(data: CreateInterface) {
		const values = Object.values(data);
		this.sql = `
			INSERT INTO tb_project_languages(
				project_id, 
				language_id
			) VALUES ($1, $2);
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