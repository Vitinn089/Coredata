import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateProjectTopics, ProjectTopicsRepository } from '../project-topics-repository';

export class PostgresProjectTopicsRepository implements ProjectTopicsRepository {
	#client: Promise<PoolClient>;
	#sql: string;
	
	constructor() {
		this.#client = connect();
		this.#sql = '';
	}

	async get() {
		this.#sql = 'SELECT project_id, topics_id FROM tb_project_topics';

		return (await this.#client).query(this.#sql)
			.then(data => data.rows)
			.catch(error => {throw {method: 'get()', error};});
	}
	
	async create(data: CreateProjectTopics) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_project_topics(project_id, topics_id) VALUES ($1, $2)';

		(await this.#client).query(this.#sql, values)
			.catch(error => {throw {method: 'create()', error};});
	}
}