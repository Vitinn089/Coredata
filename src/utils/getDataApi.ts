import axios from 'axios';
import projectsConfigs from '../config/projects';
import BdErrorHandler from '../infra/errorHandler/db-error-handler';
import { WinstonLogger } from '../infra/winston/winston-logger';
// import { Request, Response } from 'express';

const logger = new WinstonLogger();

export interface ResponseRepositorys {
	name: string,
	languages_url: string,
	description: string,
    topics: string[],
	url: string,
}

// const headers = {
// 	Authorization: `token ${process.env.TOKEN_GITHUB}`
// };

export async function getDataApi() {
	try {
		const repos: ResponseRepositorys[] = await axios.get('https://api.github.com/users/Vitinn089/repos', {headers: {'Authorization': `token ${process.env.TOKEN_GITHUB}`}})
			.then(res => {
				logger.log.http(`${res.config.method?.toLocaleUpperCase()} ${res.status}  ${res.config.url}`);
				return res.data;
			})
			.catch(err => {throw err;});

		const projectsFiltereds = await Promise.all(projectsConfigs.map(async config => {
			const projects = repos.filter((repo) => repo.name == config.name)[0];
			const languages = await axios.get(projects.languages_url, {headers: {'Authorization': `token ${process.env.TOKEN_GITHUB}`}}).then(res => res.data);
			return {
				...config,
				description: projects.description || '',
				url: projects.url,
				topics: projects.topics,
				languages: Object.keys(languages)
			};
		}));
		return projectsFiltereds;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const msg = 'Ocorreu um erro ao obter dados da API.';
		throw new BdErrorHandler(msg);
	}
	
}