import { describe, expect, it } from 'vitest';
import Language from './language';

describe('Create language', () => {
	it('should be able to create a language', () => {
		const language = new Language({
			id: 1,
			name: 'any'
		});

		expect(language).toBeInstanceOf(Language);
	});

	it('should not be able to create a language without id', () => {
		expect(() => {
			return new Language({
				id: 0,
				name: 'any'
			});
		}).toThrow();
	});

	it('should not be able to create a language without name', () => {
		expect(() => {
			return new Language({
				id: 1,
				name: ''
			});
		}).toThrow();
	});
});