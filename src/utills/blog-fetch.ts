import { NextRequest, NextResponse } from "next/server";
import APP_CONFIG, {NEXT_CONFIG} from "./config/config";
import HttpStatus from "./defined/http-status";
import {isBlogError } from "./type-guard";

import {GithubContentInterface, GithubIssueCommentInterface, GithubIssueInterface, GithubSearchInterface, GithubUserInterface} from "@/interfaces/github-user.interface";
import { revalidateTag } from "next/cache";
import TAGS from "./defined/tags";


interface BlogFetchInterface {
	endpoint: string;
	method?: RequestInit['method'];
	cache?: RequestCache;
	headers?: HeadersInit;
	body?: BodyInit;
	body_html?: BodyInit,
	next?:  NextFetchRequestConfig
	tags?: string[]
	responseType?: 'json' | 'text'
	successStatus?: number[]

}
interface BlogFetchResponse<T = never>{
	status: number; statusText?: string, response: T
}
const {
	GIT_HUB_API_URL,
	GIT_HUB_API_REQUEST_HEADER,
	GIT_HUB_API_REQUEST_MARKDOWN_HEADER,
	GIT_HUB_API_REQUEST_TEXT_MATCH_HEADER,
	GIT_HUB_API_END_POINT,
	GIT_HUB_PERSONAL_REPOSITORY_OWNER,
	GIT_HUB_PERSONAL_REPOSITORY_NAME
} = APP_CONFIG;
export async function blogFetch<T>({
									   endpoint,
									   method = "GET",
									   cache = 'force-cache',
									   headers,
									   body,
									   tags,
									   responseType = 'json',
									   successStatus = [HttpStatus.HTTP_STATUS_OK,HttpStatus.HTTP_STATUS_CREATED]
								   }: BlogFetchInterface
): Promise<BlogFetchResponse<T> | never> {
	try {

		const result = await fetch(endpoint, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				...headers
			},
			...(body && {body: body}),
			cache,
			...(tags && { next: { tags} })
		});
		const {status, statusText} = result;
		
		const response = await result[responseType]();

		if(
			!successStatus.includes(status)
		){
			
			throw new Error(`Request failed with status ${status}: ${statusText}`);
		}
		
		return {
			statusText: statusText,
			status: status,
			response
		};
	} catch (e) {
		
		if (isBlogError(e)) {
			
			throw {
				status: e.status || 500,
				statusText: e.toString() || 'unknown',
			};
		}
		throw {
			statusText: e?.toString() || 'unknown',
			status: HttpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
		};
	}
}

export async function NextBlogFetchResponse<T>(blogFetchResponse:BlogFetchResponse<T>){
	const { status, statusText, response } = blogFetchResponse;
	return NextResponse.json({
		error: statusText,
		...response,
	},{
		status: status,
	});
}

export async function revalidate(req: NextRequest, {tag, body}:{tag?: string, body?: object}): Promise<NextResponse>
{
	if(tag){
		revalidateTag(tag)
	}

	return NextResponse.json({
		body: body,
		headers: {
			'Content-Type': 'application/json',
		},
		status: HttpStatus.HTTP_STATUS_OK,
		revalidate: true,
		now: Date.now()
	});
}


export async function getGithubUser()
{
	return await blogFetch<GithubUserInterface>({
		endpoint: GIT_HUB_API_END_POINT.user(),
		headers: APP_CONFIG.GIT_HUB_API_REQUEST_HEADER,
		cache: 'no-store'
	});

}
async function getGithubContents<T>(path: string | {path: string, repository?: string}, initOptions?: BlogFetchInterface){
	let repository;
	if(typeof path === 'object'){
		repository = path.repository;
		path = path.path;
	}
	const url = GIT_HUB_API_END_POINT.repos.contents(path,repository);
	const result = await blogFetch<T>({
		endpoint: url,
		headers: GIT_HUB_API_REQUEST_HEADER,
		next: {revalidate: NEXT_CONFIG.cache.revalidate},
		...(initOptions && initOptions)
	});
	
	return result;

}

export async function getContent<T = GithubContentInterface>(path: string, initOptions?: BlogFetchInterface){
	return getGithubContents<T>(path, initOptions);
}

export async function getContents(path: string | {path: string, repository?: string}){
	return getGithubContents<GithubContentInterface[]>(path);
}

export async function convertToGithubMarkDownByContent(path: string, repository?: string)
{
	if(!path.endsWith('.md')){
		throw new Error('This is not a Markdown page.')
	}

	const response = await getContent<string>(path,{
		endpoint: GIT_HUB_API_END_POINT.repos.contents(path,repository),
		method: "GET",
		responseType: 'text',
		successStatus: [HttpStatus.HTTP_STATUS_OK],
		headers: GIT_HUB_API_REQUEST_MARKDOWN_HEADER,
	});
	
	return response ;


}

export async function convertToGithubMarkDown(text: string){
	const response = await blogFetch<string>({
		endpoint: GIT_HUB_API_END_POINT.markdown(),
		method: "POST",
		headers: GIT_HUB_API_REQUEST_HEADER,
		responseType: 'text',
		body: JSON.stringify({text: text})
	});
	return response;
}
export async function getCache(path: string){
	const url = GIT_HUB_API_END_POINT.repos.cacheContent(path);

	return await getContent(path, {
		endpoint: url,
		successStatus: [HttpStatus.HTTP_STATUS_NOT_FOUND, HttpStatus.HTTP_STATUS_OK]
	});
}
export async function getCacheData(path: string){
	try{
		const {response: data} = await getCache(path);
		const encoding = data.encoding as BufferEncoding;
		const text = Buffer.from(data.content, encoding).toString('utf8');
		return JSON.parse(text);
	}catch(error){
		return {};
	}


}
export async function createOrUpdateCache(path: string, content: string){
	const url = GIT_HUB_API_END_POINT.repos.cacheContent(path);
	const {response: user} = await getGithubUser();
	const {response: result} = await getContent(path, {
		endpoint: url,
		successStatus: [HttpStatus.HTTP_STATUS_NOT_FOUND, HttpStatus.HTTP_STATUS_OK]
	});
	return await blogFetch({
		endpoint: url,
		method: "PUT",
		headers: GIT_HUB_API_REQUEST_HEADER,
		body: JSON.stringify({
			sha: result.sha,
			message: `create or update cache file ${new Date().toTimeString()}`,
			content: Buffer.from(content).toString('base64'),
			author: {
				name: user.name,
				email: user.email
			},
			committer: {
				name: user.name,
				email: user.email
			}
		})
	});
}

export async function getIssues(issueNumber: number){
	const url = GIT_HUB_API_END_POINT.repos.issues(issueNumber);
	return await blogFetch<GithubIssueInterface>({
		endpoint: url,
		method: "GET",
		headers: GIT_HUB_API_REQUEST_HEADER,
		successStatus: [HttpStatus.HTTP_STATUS_OK]
	})
}

export async function createIssues(
	title = 'no title'
){
	const url = GIT_HUB_API_END_POINT.repos.issues();

	return await blogFetch<GithubIssueInterface>({
		endpoint: url,
		method: "POST",
		headers: GIT_HUB_API_REQUEST_HEADER,
		successStatus: [HttpStatus.HTTP_STATUS_CREATED],
		body: JSON.stringify({
			title: title
		})
	})
}

export async function getIssueComments(
	issueNumber: number,
	options?: {sort?: 'created' | 'updated', direction?: 'desc' | 'asc'}
){

	const { sort = 'updated', direction = 'asc' } = options || {};
	const url = GIT_HUB_API_END_POINT.repos.comments(issueNumber)+`?sort=${sort}&direction=${direction}&per_page=100&page=${1}`;

	return await blogFetch<GithubIssueCommentInterface[] | []>({
		endpoint: url,
		method: "GET",
		headers: GIT_HUB_API_REQUEST_MARKDOWN_HEADER,
		successStatus: [HttpStatus.HTTP_STATUS_OK],
		tags: [TAGS.comment],
	})

}

export async function createIssueComments(issueNumber: number, content: string){
	const url = GIT_HUB_API_END_POINT.repos.comments(issueNumber);

	const result = await blogFetch<GithubIssueCommentInterface>({
		endpoint: url,
		method: "POST",
		headers: GIT_HUB_API_REQUEST_HEADER,
		successStatus: [HttpStatus.HTTP_STATUS_CREATED],
		body: content,
		cache: 'no-store'
	})
	await revalidateTag(TAGS.comment);
	return result;
}

export async function searchCode(query: string){
	if(query.length >= 2){
		const url = `${GIT_HUB_API_URL}/search/code?q=${query}+repo:${GIT_HUB_PERSONAL_REPOSITORY_OWNER}/${GIT_HUB_PERSONAL_REPOSITORY_NAME}`
		

		const result = await blogFetch<GithubSearchInterface>({
			endpoint: url,
			method: "GET",
			headers: GIT_HUB_API_REQUEST_TEXT_MATCH_HEADER,
			successStatus: [HttpStatus.HTTP_STATUS_OK],
			cache: 'no-store'
		})
		return result;
	}
	return {
		items: []
	};
	
}



interface TreeInterface {
	path: string,
	type: string,
	sha: string
}

export async function fetchContentRecursively(path: string): Promise<GithubContentInterface[] | []>
{
	let result:GithubContentInterface[] | [] = [];
	async function fetchContents(path: string){
		const response = await getContents(path);
		const contents = response.response;
		for (const content of contents) {
			if (content.type === 'dir') {
				await fetchContents(content.path);
			} else {
				result = [...result,...[content]];
			}
		}
	}
	await fetchContents(path);
	return result;
}

export async function fetchTreeRecursively(sha: string): Promise<TreeInterface[] | []> {
	const url = `${GIT_HUB_API_URL}/repos/${GIT_HUB_PERSONAL_REPOSITORY_OWNER}/${GIT_HUB_PERSONAL_REPOSITORY_NAME}/git/trees/`;


	async function fetchTree(sha: string): Promise<{tree: TreeInterface[]}> {

		const response = await fetch(`${url}${sha}?recursive=false`);
		if (!response.ok) {
			throw new Error(`Error fetching tree: ${response.statusText}`);
		}
		return response.json();
	}

	async function getAllFiles(treeSha: string): Promise<TreeInterface[] | []> {
		const treeResult = await fetchTree(treeSha);
		let allFiles: TreeInterface[] | [] | any = [];

		for (const item of treeResult.tree) {
			if (item.type === 'tree') {
				// Recurse into the tree
				const subTreeFiles: any = await getAllFiles(item.sha);
				allFiles = allFiles.concat(subTreeFiles);
			} else if (item.type === 'blob') {
				allFiles.push(item);
			}
		}

		return allFiles;
	}

	return await getAllFiles(sha);
}