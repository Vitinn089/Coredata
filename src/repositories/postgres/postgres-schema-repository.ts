import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { SchemaRepository } from '../schema-repository';

export class PostgresSchemaRepository implements SchemaRepository {
	client: Promise<PoolClient>;
	
	constructor() {
		this.client = connect();
	}

	async create() {
		const sql = `CREATE TABLE IF NOT EXISTS tb_projects (
			project_id VARCHAR(36) UNIQUE NOT NULL,
			project_name VARCHAR(50) UNIQUE NOT NULL,
			project_title VARCHAR(50) NOT NULL,
			project_desc VARCHAR(255),
			project_repo VARCHAR(100),
			project_site VARCHAR(100),
			project_display boolean NOT NULL,
			project_cover VARCHAR(100),
			project_image VARCHAR(100),
		
			CONSTRAINT pk_project PRIMARY KEY (project_id)
		);
		
		CREATE TABLE IF NOT EXISTS tb_languages (
			language_id SERIAL UNIQUE NOT NULL,
			language_name VARCHAR(50) NOT NULL,
		
			CONSTRAINT pk_language PRIMARY KEY (language_id)
		);
		
		CREATE TABLE IF NOT EXISTS tb_topics  (
			topic_id SERIAL UNIQUE NOT NULL,
			topic_name VARCHAR(50) NOT NULL,
		
			CONSTRAINT pk_topic PRIMARY KEY (topic_id)
		);
		
		CREATE TABLE IF NOT EXISTS tb_project_languages (
			project_id VARCHAR(36) UNIQUE NOT NULL,
			language_id INT UNIQUE NOT NULL,
		
			CONSTRAINT pk_project_languages PRIMARY KEY (project_id, language_id),
			CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES tb_projects(project_id),
			CONSTRAINT fk_language FOREIGN KEY(language_id) REFERENCES tb_languages(language_id)
		);
		
		CREATE TABLE IF NOT EXISTS tb_project_topics (
			project_id VARCHAR(36) UNIQUE NOT NULL,
			topic_id INT UNIQUE NOT NULL,
		
			CONSTRAINT pk_project_topics PRIMARY KEY (project_id, topic_id),
			CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES tb_projects(project_id),
			CONSTRAINT fk_topic FOREIGN KEY(topic_id) REFERENCES tb_topics(topic_id)
		);`;

		(await this.client).query(sql)
			.catch(error => {throw {method: 'create()', error};});
	}
}