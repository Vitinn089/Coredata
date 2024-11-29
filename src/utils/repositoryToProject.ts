import { randomUUID } from 'crypto';
import Project from '../entities/Project';
import Repository from '../entities/Repository';

interface valueProps {
	title: string, display: boolean, cover?: string, image?: string, site?: string;
}

export default function repositoryToProject (repository: Repository, value:valueProps) {
	const data =  {
		id: randomUUID(),
		name: repository.data.name,
		description: repository.data.description,
		repository: repository.data.html_url,
		topics: repository.data.topics,
		languages: repository.data.languages,
		...value
	};
	return new Project(data);
}