import { describe, expect, it } from 'vitest';
import Repository from './repository';

describe('Create repository', () => {
	it('Should be able create a repository', () => {
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

		expect(repository).instanceOf(Repository);
		expect(repository.name).toEqual('John Doe');
	});

	it('Should not be able create a repository without name property', () => {
		expect(() => {
			return new Repository({
				name: '',
				title: 'test',
				description: 'test',
				repository: 'test',
				site: 'test',
				display: true,
				cover: 'test',
				image: 'test',
				languages: ['JS'],
				topics: ['JS']
			});}).toThrow();
	});

	it('Should not be able create a repository without title property', () => {
		expect(() => {
			return new Repository({
				name: 'John Doe',
				title: '',
				description: 'test',
				repository: 'test',
				site: 'test',
				display: true,
				cover: 'test',
				image: 'test',
				languages: ['JS'],
				topics: ['JS']
			});}).toThrow();
	});
});