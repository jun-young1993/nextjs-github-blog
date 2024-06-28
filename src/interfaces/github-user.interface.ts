export interface GithubUserInterface {
	login: string
	avatar_url: string
	email: string
	name: string
}

export interface GithubContentInterface {
	sha: string
	type: 'file'|'dir'
	name: string
	encoding: string
	content: string
	path: string
}

export interface GithubIssueInterface {
	number: number
}