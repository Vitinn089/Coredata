import { describe, expect, it, test } from 'vitest';
import ErrorHandler from '../infra/errorHandler/error-handler';
import { InMemoryLanguagesRepository } from '../repositories/in-memory/in-memory-languages-repository';
import { InMemoryProjectLanguagesRepository } from '../repositories/in-memory/in-memory-project-languages-repository';
import { InMemoryProjectTopicsRepository } from '../repositories/in-memory/in-memory-project-topics-repository';
import { InMemoryProjectsRepository } from '../repositories/in-memory/in-memory-projects-repository';
import { InMemoryTopicsRepository } from '../repositories/in-memory/in-memory-topics-repository';
import { CreateDatabaseSettingsUseCases } from './create-database-settings-use-cases';


const inMemoryProjectsRepository = new InMemoryProjectsRepository();
const inMemoryLanguagesRepository = new InMemoryLanguagesRepository();
const inMemoryTopicsRepository = new InMemoryTopicsRepository();
const inMemoryProjectLanguagesRepository = new InMemoryProjectLanguagesRepository();
const inMemoryProjectTopicsRepository = new InMemoryProjectTopicsRepository();

describe('Create database by settings', () => {
	test('Database must be created by settings data', () => {
		const createDatabaseSettingsUseCases = new CreateDatabaseSettingsUseCases(
			inMemoryProjectsRepository,
			inMemoryLanguagesRepository, 
			inMemoryTopicsRepository,
			inMemoryProjectLanguagesRepository,
			inMemoryProjectTopicsRepository
		);

		expect(createDatabaseSettingsUseCases.execute({
			name: 'John Doe',
			title: 'test',
			description: 'test',
			url: 'test',
			site: 'test',
			display: true,
			capaUrl: 'test',
			imageUrl: 'test',
			languages: ['JS'],
			topics: ['JS']
		})).resolves.not.toThrow();
	});

	it ('should not create duplicate projects', () => {
		const createDatabaseSettingsUseCases = new CreateDatabaseSettingsUseCases(
			inMemoryProjectsRepository,
			inMemoryLanguagesRepository, 
			inMemoryTopicsRepository,
			inMemoryProjectLanguagesRepository,
			inMemoryProjectTopicsRepository
		);

		expect(createDatabaseSettingsUseCases.execute({
			name: 'Already exists',
			title: 'test',
			description: 'test',
			url: 'test',
			site: 'test',
			display: true,
			capaUrl: 'test',
			imageUrl: 'test',
			languages: ['JS'],
			topics: ['JS']
		})).rejects.toBeInstanceOf(ErrorHandler);
	});
});