import path from 'path';
import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateRequest, TopicsRepository } from '../topics-repository';

export class PostgresTopicsRepository implements TopicsRepository {
	#client: Promise<PoolClient>;
	#sql: string;

	constructor() {
		this.#client = connect();
		this.#sql = '';
	}

	async get(name?: string) {
		this.#sql = !name 
			? 'SELECT topic_id AS id, topic_name AS name FROM tb_topics;\n' 
			: 'SELECT topic_id AS id, topic_name AS name FROM tb_topics WHERE topic_name=$1\n' ;

		return (await this.#client).query(this.#sql, !name ? [] : [name])
			.then(data => data.rows)
			.catch(error => {
				const msg = `method: create() file: ${path.basename(__filename)} erro:${error.detail}`;
				throw msg;
			});
	}

	async create (data: CreateRequest) {
		const values = Object.values(data);
		this.#sql = 'INSERT INTO tb_topics(topic_name) VALUES ($1);\n';

		await (await this.#client).query(this.#sql, values)
			.catch(error => {
				const msg = `method: create() file: ${path.basename(__filename)} erro:${error.detail}`;
				throw msg;
			});
	}
}