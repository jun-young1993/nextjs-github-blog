export interface GithubUserInterface {
	login: string
	avatar_url: string
}

export interface GithubContentInterface {
	sha: string
	type: 'file'|'dir'
	name: string
	encoding: string
	content: string
	path: string
}