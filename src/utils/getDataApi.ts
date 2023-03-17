import axios from 'axios';
// import { Request, Response } from 'express';

export interface ResponseRepositorys {
	name: string,
	languages_url: string,
	description: string,
    topics: string[],
	url: string,
}

const headers = {
	Authorization: `${process.env.TOKEN_GITHUB}`
};

const configs = [
	{
		name:'devfinance',
		title:'devFinance',
		display:true,
		capaUrl:'/images/o-capa-devfinance.png',
		imageUrl:'/images/inicio-devfinance.png'
	},
	{
		name:'feedget-web',
		title:'Feedget',
		display:true,
		capaUrl:'/images/o-capa-feedget-web.png',
		imageUrl:'/images/inicio-feedget-web.png'
	},
	{
		name:'proffy',
		title:'Proffys',
		display:true,
		capaUrl:'/images/o-capa-proffy.png',
		imageUrl:'/images/inicio-proffy.png'
	},
	{
		name:'bossfoot',
		title:'Boosfoot',
		display:false,
		capaUrl:'',
		imageUrl:''
	},
	{
		name:'Vitinn089',
		title:'Vitinn',
		display:false,
		capaUrl:'',
		imageUrl:''
	}
];

export async function getDataApi() {
	const repos: ResponseRepositorys[] = await axios.get('https://api.github.com/users/Vitinn089/repos', {headers}).then(res => res.data);

	const projectsFiltereds = await Promise.all(configs.map(async config => {
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