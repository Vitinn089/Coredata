import axios from 'axios';
import projectsConfigs from '../config/projects';
// import { Request, Response } from 'express';

export interface ResponseRepositorys {
	name: string,
	languages_url: string,
	description: string,
    topics: string[],
	url: string,
}

const headers = {
	// Authorization: `${process.env.TOKEN_GITHUB}`
};

export async function getDataApi() {
	const repos: ResponseRepositorys[] = await axios.get('https://api.github.com/users/Vitinn089/repos', {headers})
		.then(res => res.data)
		.catch(err => {throw err;});

	const projectsFiltereds = await Promise.all(projectsConfigs.map(async config => {
		const projects = repos.filter((repo) => repo.name == config.name)[0];
		const languages = await axios.get(projects.languages_url, {headers}).then(res => res.data);
		return {
			...config,
			description: projects.description || '',
			url: projects.url,
			topics: projects.topics,
			languages: Object.keys(languages)
		};
	}));
	return projectsFiltereds;
}