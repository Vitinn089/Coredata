import path from 'path';
import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateRequest, ProjectTopicsRepository } from '../project-topics-repository';

export class PostgresProjectTopicsRepository implements ProjectTopicsRepository {
	#client: Promise<PoolClient>;
	#sql: string;
	
	constructor() {
		this.#client = connect();
		this.#sql = '';
	}

	async get(project_id?: string) {
		this.#sql = !project_id 
			? 'SELECT project_id, topic_id AS id FROM tb_project_topics'
			: 'SELECT project_id, topic_id AS id FROM tb_project_topics WHERE project_id=$1';

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

	async getTopics(project_id: string) {
		this.#sql = 'SELECT project_id, tb_topics.topic_id AS id, topic_name AS name FROM tb_project_topics RIGHT JOIN tb_topics ON tb_project_topics.topic_id = tb_topics.topic_id  WHERE project_id=$1;';
		
		return (await this.#client).query(this.#sql, [project_id])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`[file: ${path.basename(__filename)}	method: getTopics()]`],
					statusCode: 500,
					msg: `erro:${error.detail}`
				};
			});
	}
	
	async create(data: CreateRequest) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_project_topics(project_id, topic_id) VALUES ($1, $2)';

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