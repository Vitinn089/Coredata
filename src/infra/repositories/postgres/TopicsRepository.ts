import path from 'path';
import { CreateInterface, TopicsRepositoryInterface,  } from '../../../use-cases/interfaces/TopicsRepositoryInterface';

export class TopicsRepository implements TopicsRepositoryInterface {
	constructor(
		private db: Promise<Connection>,
		private sql?: string
	) {
		this.sql = '';
	}

	async get(name?: string) {
		this.sql = `
			SELECT topic_id AS id, 
				topic_name AS name 
			FROM tb_topics
		`;
		
		if(name)
			this.sql += ' WHERE topic_name=$1;' ;

		return (await this.db).query(this.sql, !name ? [] : [name])
			.then(data => data.rows)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}method: get()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}

	async create (data: CreateInterface) {
		const values = Object.values(data);
		this.sql = `
			INSERT INTO tb_topics(
				topic_name
			) 
			VALUES ($1);`;

		await (await this.db).query(this.sql, values)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}method: create()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}
}