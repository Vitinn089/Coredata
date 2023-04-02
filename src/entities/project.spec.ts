import { expect, test, describe } from 'vitest';
import Language from './language';
import Project from './project';
import Topic from './topic';

describe('Create project', () => {
	test('create an project', () => {
		const project = new Project({
			id: 'test',
			name: 'John Doe',
			title: 'test',
			description: 'test',
			repository: 'test',
			site: 'test',
			cover: 'test',
			image: 'test',
			display: true,
			languages: [new Language({id: 1, name: 'JS'})],
			topics: [new Topic({id: 1, name: 'JS'})]
		});
	
		expect(project).toBeInstanceOf(Project);
		expect(project.name).toEqual('John Doe');
	});
	
	test('cannot create an create an project without id', () => {
		expect(() => {
			return new Project({
				id: '',
				name: 'John Doe',
				title: 'test',
				description: 'test',
				repository: 'test',
				site: 'test',
				cover: 'test',
				image: 'test',
				display: true,
				languages: [new Language({id: 1, name: 'JS'})],
				topics: [new Topic({id: 1, name: 'JS'})]
			});
		}).toThrow();
	});
	
	test('cannot create an create an project without name', () => {
		expect(() => {
			return new Project({
				id: 'id',
				name: '',
				title: 'test',
				description: 'test',
				repository: 'test',
				site: 'test',
				cover: 'test',
				image: 'test',
				display: true,
				languages: [new Language({id: 1, name: 'JS'})],
				topics: [new Topic({id: 1, name: 'JS'})]
			});
		}).toThrow();
	});
	
	test('cannot create an create an project without title', () => {
		expect(() => {
			return new Project({
				id: 'id',
				name: 'John Doe',
				title: '',
				description: 'test',
				repository: 'test',
				site: 'test',
				cover: 'test',
				image: 'test',
				display: true,
				languages: [new Language({id: 1, name: 'JS'})],
				topics: [new Topic({id: 1, name: 'JS'})]
			});
		}).toThrow();
	});
});