import pool from '../../../../config/postgres';
import path from 'path';
import { createProjects } from './createProjects';
import { createLanguages } from './createLanguages';
import { createTopics } from './createTopics';
import { createProjectLanguages } from './createProjectLanguages';
import { createProjectTopics } from './createProjectTopic';

const schema = [
	createProjects,
	createLanguages,
	createTopics,
	createProjectLanguages,
	createProjectTopics
].join(' ');

export default async function () {
	const client =  await (await pool()).connect();
	client.query(schema).catch(error => {
		throw {
			name: 'InternalServerError',
			trace: [`\n[file: ${path.basename(__filename)}		method: create()]`],
			statusCode: 500,
			msg: `erro: ${error.detail}`
		};
	});
}