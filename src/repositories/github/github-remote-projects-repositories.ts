import axios from 'axios';
import projectsConfigs from '../../config/projects';
import config from '../../config/config';
import Repository from '../../entities/repository';
import { WinstonLogger } from '../../infra/winston/winston-logger';
import { RemoteProjectsRepositories, ResponseRepositories } from '../remote-projects-repositories';
import path from 'path';

export default class GithubRemoteProjectsRepositories implements RemoteProjectsRepositories {
	constructor(
		private logger = new WinstonLogger()
	) {}

	async getData() {
		const repos: ResponseRepositories[] = await axios.get(config.URL_REPOSITORY, {headers: {'Authorization': `token ${config.TOKEN_GITHUB}`}})
			.then(res => {
				this.logger.log.http(`${res.config.method?.toLocaleUpperCase()} ${res.status}  ${res.config.url}`);
				return res.data;
			})
			.catch(err => {
				throw {
					name: 'InternalServerError',
					trace: [`\n[file: ${path.basename(__filename)}	method: getData()]`],
					statusCode: 500,
					msg: `erro: ${err}`
				};
			});

		return await Promise.all(projectsConfigs.map(async config => {
			const projects = repos.filter((repo) => repo.name == config.name)[0];
			const languages = await axios.get(projects.languages_url, {headers: {'Authorization': `token ${process.env.TOKEN_GITHUB}`}})
				.then(res => res.data)
				.catch(err => {
					throw {
						name: 'InternalServerError',
						trace: [`\n[file: ${path.basename(__filename)}	method: getData()]`],
						statusCode: 500,
						msg: `erro: ${err}`
					};
				});

			return new Repository({
				...config,
				description: projects.description || '',
				repository: projects.html_url,
				topics: projects.topics,
				languages: Object.keys(languages)
			});
		}));
	}
}