import path from 'path';
import { CreateInterface, ProjectTopicsRepositoryInterface } from '../../../use-cases/interfaces/ProjectTopicsRepositoryInterface';

export class ProjectTopicsRepository implements ProjectTopicsRepositoryInterface {
	constructor(
		private db: Promise<Connection>,
		private sql?: string
	) {
		this.sql = '';
	}

	async get(project_id?: string) {
		this.sql = `
			SELECT project_id, 
				topic_id AS id 
			FROM tb_project_topics
		`;
		this.sql += ' WHERE project_id=$1';

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

	async getTopics(project_id: string) {
		this.sql = `
			SELECT
				tb_topics.topic_id AS id, 
				topic_name AS name 
			FROM tb_project_topics RIGHT JOIN tb_topics 
			ON tb_project_topics.topic_id = tb_topics.topic_id  
			WHERE project_id=$1;
		`;
		
		return (await this.db).query(this.sql, [project_id])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: getTopics()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}
	
	async create(data: CreateInterface) {
		const values = Object.values(data);
		this.sql = `
			INSERT INTO tb_project_topics(
				project_id, 
				topic_id
			) VALUES ($1, $2)
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