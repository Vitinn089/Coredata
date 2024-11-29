import axios from 'axios';
import { WinstonLogger } from '../../winston/winston-logger';
import { RemoteRepositoriesInterface, } from '../../../use-cases/interfaces/RemoteRepositoriesInterface';
import path from 'node:path';

export class RemoteRepositories implements RemoteRepositoriesInterface{
	constructor(
		private url: string,
		private user: string,
		private token?: string,
		private logger = new WinstonLogger()
	) {}

	async getAll () {
		const url = this.url + `/users/${this.user}/repos`;

		return await axios.get(url, {headers: {'Authorization': `Bearer ${this.token}`}})
			.then(res => {
				this.logger.log.http(`${res.config.method?.toLocaleUpperCase()} ${res.status}  ${res.config.url}`);
				return res.data;
			})
			.catch(err => {
				this.logger.log.http(`${err.config.method?.toLocaleUpperCase()} ${err.code === 'ENOTFOUND' ? 404: err.code}  ${err.config.url}`);
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: getData()]`],
					statusCode: err.code === 'ENOTFOUND' ? 404: err.code,
					msg: `erro: ${err}`
				};
			});
	}

	async get (repositoryName: string) {
		const url = this.url + `/repos/${this.user}/${repositoryName}`;

		return await axios.get(url, {headers: {'Authorization': `Bearer ${this.token}`}})
			.then(res => {
				this.logger.log.http(`${res.config.method?.toLocaleUpperCase()} ${res.status}  ${res.config.url}`);
				return res.data;
			})
			.catch(err => {
				this.logger.log.http(`${err.config.method?.toLocaleUpperCase()} ${err.code === 'ENOTFOUND' ? 404: err.code}  ${err.config.url}`);
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: getData()]`],
					statusCode: err.code === 'ENOTFOUND' ? 404: err.code,
					msg: `erro: ${err}`
				};
			});
	}


	async getLanguages (url?: string) {
		url = url ?? '';
		return await axios.get(url, {headers: {'Authorization': `Bearer ${this.token}`}})
			.then(res => {
				this.logger.log.http(`${res.config.method?.toLocaleUpperCase()} ${res.status}  ${res.config.url}`);
				return Object.keys(res.data);
			})
			.catch(err => {
				this.logger.log.http(`${err.config.method?.toLocaleUpperCase()} ${err.code === 'ENOTFOUND' ? 404 : err.code}  ${err.config.url}`);
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.resolve(__filename)}	method: getData()]`],
					statusCode: err.code === 'ENOTFOUND' ? 404: err.code,
					msg: `erro: ${err}`
				};
			});
	}
}