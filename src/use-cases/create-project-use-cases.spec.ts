import { describe, expect, it, test } from 'vitest';
import Repository from '../entities/repository';
import { InMemoryLanguagesRepository } from '../repositories/in-memory/in-memory-languages-repository';
import { InMemoryProjectLanguagesRepository } from '../repositories/in-memory/in-memory-project-languages-repository';
import { InMemoryProjectTopicsRepository } from '../repositories/in-memory/in-memory-project-topics-repository';
import { InMemoryProjectsRepository } from '../repositories/in-memory/in-memory-projects-repository';
import { InMemoryTopicsRepository } from '../repositories/in-memory/in-memory-topics-repository';
import { CreateProjectUseCases } from './create-project-use-cases';

const inMemoryProjectsRepository = new InMemoryProjectsRepository();
const inMemoryLanguagesRepository = new InMemoryLanguagesRepository();
const inMemoryTopicsRepository = new InMemoryTopicsRepository();
const inMemoryProjectLanguagesRepository = new InMemoryProjectLanguagesRepository();
const inMemoryProjectTopicsRepository = new InMemoryProjectTopicsRepository();

describe('Create database by settings', () => {
	test('Database must be created by settings data', () => {
		const repository = new Repository({
			name: 'John Doe',
			title: 'test',
			description: 'test',
			repository: 'test',
			site: 'test',
			display: true,
			cover: 'test',
			image: 'test',
			languages: ['JS'],
			topics: ['JS']
		});
		const createProjectUseCases = new CreateProjectUseCases(
			inMemoryProjectsRepository,
			inMemoryLanguagesRepository, 
			inMemoryTopicsRepository,
			inMemoryProjectLanguagesRepository,
			inMemoryProjectTopicsRepository
		);

		expect(createProjectUseCases.execute(repository)).resolves.not.toThrow();
	});

	it ('should not create duplicate projects', () => {
		const repository = new Repository({
			name: 'Already exists',
			title: 'test',
			description: 'test',
			repository: 'test',
			site: 'test',
			display: true,
			cover: 'test',
			image: 'test',
			languages: ['JS'],
			topics: ['JS']
		});
		const createProjectUseCases = new CreateProjectUseCases(
			inMemoryProjectsRepository,
			inMemoryLanguagesRepository, 
			inMemoryTopicsRepository,
			inMemoryProjectLanguagesRepository,
			inMemoryProjectTopicsRepository
		);

		createProjectUseCases.execute(repository).catch(err => expect(err). to.exist);
	});
});