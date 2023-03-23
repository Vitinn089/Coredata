import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateTopic, TopicsRepository } from '../topics-repository';

export class PostgresTopicsRepository implements TopicsRepository {
	#client: Promise<PoolClient>;
	#sql: string;

	constructor() {
		this.#client = connect();
		this.#sql = '';
	}

	async get() {
		this.#sql = 'SELECT * FROM tb_topics;\n';

		return (await this.#client).query(this.#sql)
			.then(data => data.rows)
			.catch(error => {throw {method: 'get()', error};});
	}

	async create (data: CreateTopic) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_topics(project_id, topic_name) VALUES ($1, $2);\n';

		(await this.#client).query(this.#sql, values)
			.catch(error => {throw {method: 'create()', error};});
	}
}