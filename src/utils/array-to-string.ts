import Language from '../entities/language';
import Topic from '../entities/topic';

type arrayToStringProps = Language[] | Topic[]

export function arrayToString(data: arrayToStringProps | undefined): string[]{
	const content: string[] = [];

	if (data) {
		for (const d of data) {
			content.push(d.name);
		}
	}

	return content;
}