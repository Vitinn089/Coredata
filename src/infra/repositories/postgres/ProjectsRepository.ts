import path from 'path';
import { CreateInteface, ProjectsRepositoryInterface, UpdateInteface } from '../../../use-cases/interfaces/ProjectsInterface';


export class ProjectsRepository implements ProjectsRepositoryInterface {
	constructor (
		private db: Promise<Connection>,
		private sql?: string
	) {
		this.sql = '';
	}

	async get(id?: string) {
		this.sql = `
			SELECT project_id AS id, 
				project_name AS name, 
				project_title AS title, 
				project_desc AS description,  
				project_repo AS repository, 
				project_site AS site, 
				project_display AS display, 
				project_cover AS cover, 
				project_image AS image
			FROM tb_projects
		`; 
		if (id)
			this.sql += ' WHERE project_id = $1;\n';
		
		return await(await this.db).query(this.sql, !id ? [] : [id])
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

	async create(data: CreateInteface) {
		const values = Object.values(data);
		
		this.sql = `
			INSERT INTO tb_projects(
				project_id, 
				project_name, 
				project_title,  
				project_desc, 
				project_repo, 
				project_site, 
				project_display, 
				project_cover, 
				project_image
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
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

	async update(data: UpdateInteface) {
		const values = Object.values(data);
		
		this.sql = `
			UPDATE tb_projects SET
				project_name = $2,
				project_title = $3,
				project_desc = $4,
				project_repo = $5,
				project_site = $6,
				project_display = $9,
				project_cover = $7,
				project_image = $8,
				updated_at = CURRENT_TIMESTAMP
			WHERE project_id = $1
		 `;

		await (await this.db).query(this.sql, values)
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: update()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}

	async delete(id: string) {
		
		this.sql = `
			DELETE FROM tb_projects
			WHERE project_id = $1
		 `;

		await (await this.db).query(this.sql, [id])
			.catch(error => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: delete()]`],
					statusCode: 500,
					msg: `erro: ${error.message}`
				};
			});
	}
}