import { TABLE_OF_CONTENTS_MAX_LEVEL } from "../config/config";

export interface HeadingToc {
	level: '1' | '2' | '3' | '4' | '5' | '6'
	id: string
	title: string
}
export default function replaceHeadings(content: string): [string, HeadingToc[] | []]{

	const headingRegex = new RegExp(`<h[1-${TABLE_OF_CONTENTS_MAX_LEVEL}][^>]*>(.*?)<\/h[1-${TABLE_OF_CONTENTS_MAX_LEVEL}]>`, 'g');
	console.log(headingRegex);
	const regex = new RegExp(`^<h([1-${TABLE_OF_CONTENTS_MAX_LEVEL}])`);
	console.log(regex);
	const toc: HeadingToc[] | [] = [];
	const result = content.replace(headingRegex,(searchValue, replaceValue: string) => {
		const uniqId = new Date().getTime().toString() + replaceValue;
		
		const match = regex.exec(searchValue);
		
		if(match ){
			const level = match[1].toString() as HeadingToc['level'];
			toc.push({
				level: level,
				title: replaceValue,
				id: uniqId
			});
			return `<h${level} id="${uniqId}" class="heading-element">${replaceValue}</h${level}>`;	
		}
		
		return searchValue;
	})
	return [result, toc];
}