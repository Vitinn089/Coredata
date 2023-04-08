import { describe, expect, it } from "vitest";
import { InMemoryLanguagesRepository } from "../repositories/in-memory/in-memory-languages-repository";
import { InMemoryProjectLanguagesRepository } from "../repositories/in-memory/in-memory-project-languages-repository";
import { InMemoryProjectTopicsRepository } from "../repositories/in-memory/in-memory-project-topics-repository";
import { InMemoryProjectsRepository } from "../repositories/in-memory/in-memory-projects-repository";
import { InMemoryRemoteProjectsRepositories } from "../repositories/in-memory/in-memory-remote-project-repositories";
import { InMemoryTopicsRepository } from "../repositories/in-memory/in-memory-topics-repository";
import { CreateDatabaseSettingsUseCases } from "./create-database-settings-use-cases";

const inMemoryProjectsRepository = new InMemoryProjectsRepository();
const inMemoryLanguagesRepository = new InMemoryLanguagesRepository();
const inMemoryTopicsRepository = new InMemoryTopicsRepository();
const inMemoryProjectLanguagesRepository = new InMemoryProjectLanguagesRepository();
const inMemoryProjectTopicsRepository = new InMemoryProjectTopicsRepository();
const inMemoryRemoteProjectsRepositories = new InMemoryRemoteProjectsRepositories();

describe('Update database via configuration file', () => {
	it('Should be able get remote repositories', () => {
		const createDatabaseSettingsUseCases = new CreateDatabaseSettingsUseCases(
			inMemoryProjectsRepository,
			inMemoryLanguagesRepository,
			inMemoryTopicsRepository,
			inMemoryProjectLanguagesRepository,
			inMemoryProjectTopicsRepository,
			inMemoryRemoteProjectsRepositories
		);

		expect(createDatabaseSettingsUseCases.execute()).resolves.not.toThrow();
	})
})