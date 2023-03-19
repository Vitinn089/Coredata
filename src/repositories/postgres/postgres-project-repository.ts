import { PoolClient } from 'pg';
import connect from '../../config/postgres';
import { CreateLanguages, CreateProject, CreateTopics, ProjectRepository } from '../project-repository';

export class PostgresProjectRepository implements ProjectRepository {
	client: Promise<PoolClient>;
	sql: string;

	constructor () {
		this.client = connect();
		this.sql = '';
	}

	async createDb() {
		this.sql = `CREATE TABLE IF NOT EXISTS tb_projects (
            project_id VARCHAR(50) UNIQUE NOT NULL CONSTRAINT pk_project PRIMARY KEY,
            project_name VARCHAR(50) UNIQUE NOT NULL,
            project_title VARCHAR(50) NOT NULL,
            project_description VARCHAR(255),
            project_repository VARCHAR(100),
            project_display boolean NOT NULL,
            project_cover VARCHAR(100),
            project_image VARCHAR(100)
        );
        
        CREATE TABLE IF NOT EXISTS tb_languages (
            language_id SERIAL NOT NULL UNIQUE NOT NULL PRIMARY KEY,
            project_id VARCHAR(50) NOT NULL,
            language_name VARCHAR(50) UNIQUE NOT NULL,
        
            CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(project_id)
        );
        
        CREATE TABLE IF NOT EXISTS tb_topics  (
            topic_id SERIAL NOT NULL UNIQUE NOT NULL PRIMARY KEY,
            project_id VARCHAR(50) NOT NULL,
            topic_name VARCHAR(50) UNIQUE NOT NULL,
        
            CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(project_id)
        );`;

		try {
			console.log(await (await this.client).query(this.sql));

			this.sql = '';
		} catch (error) {
			console.error({method: 'createDb()', error});
		}
	}

	async getProjects() {
		this.sql = 'SELECT project_id AS id, project_name AS name, project_title AS title, project_description AS description, project_repository AS url, project_display AS display, project_cover AS capaUrl, project_image AS imageUrl FROM tb_projects;\n';

		return (await this.client).query(this.sql).then(data => data.rows);
	}

	async getLanguages() {
		this.sql = 'SELECT * FROM tb_languages;\n';

		return (await this.client).query(this.sql).then(data => data.rows);
	}

	async getTopics() {
		this.sql = 'SELECT * FROM tb_topics;\n';

		return (await this.client).query(this.sql).then(data => data.rows);
	}

	async createProject(data: CreateProject) {
		const values = Object.values(data);
		this.sql = 'INSERT INTO tb_projects(project_id, project_name, project_title, project_description, project_repository, project_display, project_cover, project_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);\n';

		// this.createDb();
		await (await this.client).query(this.sql, values)
			.catch(error => {console.error({method: 'Project()', ...error});});

		this.sql = '';
	}

	async createLanguages(data: CreateLanguages) {
		const values = Object.values(data);
		this.sql = 'INSERT INTO tb_languages(project_id, language_name) VALUES ($1, $2);\n';

		// this.createDb();
		await (await this.client).query(this.sql, values)
			.catch(error => {console.error({method: 'createLanguages()', ...error});});

		this.sql = '';
	}

	async createTopics(data: CreateTopics) {
		const values = Object.values(data);
		this.sql = 'INSERT INTO tb_topics(project_id, topic_name) VALUES ($1, $2);\n';

		// this.createDb();
		await (await this.client).query(this.sql, values)
			.catch(error => {console.error({method: 'createTopics()', ...error});});

		this.sql = '';
	}
}