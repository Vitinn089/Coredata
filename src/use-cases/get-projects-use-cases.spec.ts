import { describe, expect, it } from 'vitest';
import Project from '../entities/project';
import { InMemoryProjectLanguagesRepository } from '../repositories/in-memory/in-memory-project-languages-repository';
import { InMemoryProjectTopicsRepository } from '../repositories/in-memory/in-memory-project-topics-repository';
import { InMemoryProjectsRepository } from '../repositories/in-memory/in-memory-projects-repository';
import { GetProjectsUseCases } from './get-projects-use-cases';

const inMemoryProjectsRepository = new InMemoryProjectsRepository();
const inMemoryProjectLanguagesRepository = new InMemoryProjectLanguagesRepository();
const inMemoryProjectTopicsRepository = new InMemoryProjectTopicsRepository();

describe('Get the all projects', () => {
	it('Should get the all projects', async () => {
		const getProjectsUseCases = new GetProjectsUseCases(
			inMemoryProjectsRepository,
			inMemoryProjectLanguagesRepository,
			inMemoryProjectTopicsRepository
		);

		expect(getProjectsUseCases.execute()).resolves.not.toThrow();
		(await getProjectsUseCases.execute()).forEach(project => {
			expect(project).instanceOf(Project);
		});
	});
});