import { describe, expect, it } from 'vitest';
import Topic from './topic';

describe('Create topic', () => {
	it('should be able to create a topic', () => {
		const topic = new Topic({
			id: 1,
			name: 'any'
		});

		expect(topic).toBeInstanceOf(Topic);
	});

	it('should not be able to create a topic without id', () => {
		expect(() => {
			return new Topic({
				id: 0,
				name: 'any'
			});
		}).toThrow();
	});

	it('should not be able to create a topic without name', () => {
		expect(() => {
			return new Topic({
				id: 1,
				name: ''
			});
		}).toThrow();
	});
});