import { NextRequest, NextResponse } from "next/server";
import APP_CONFIG, {NEXT_CONFIG} from "./config/config";
import HttpStatus from "./defined/http-status";
import {isBlogError } from "./type-guard";

import {GithubContentInterface, GithubIssueCommentInterface, GithubIssueInterface, GithubUserInterface} from "@/interfaces/github-user.interface";
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
	GIT_HUB_API_REQUEST_HEADER,
	GIT_HUB_API_REQUEST_MARKDOWN_HEADER,
	GIT_HUB_API_END_POINT,
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
				statusText: e.statusText?.toString() || 'unknown',
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
async function getGithubContents<T>(path: string, initOptions?: BlogFetchInterface){
	const url = GIT_HUB_API_END_POINT.repos.contents(path);
	const result = await blogFetch<T>({
		endpoint: url,
		headers: GIT_HUB_API_REQUEST_HEADER,
		next: {revalidate: NEXT_CONFIG.cache.revalidate},
			...(initOptions && initOptions)
	});

	return result;

}

export async function getContent(path: string, initOptions?: BlogFetchInterface){
	return getGithubContents<GithubContentInterface>(path, initOptions);
}

export async function getContents(path: string){
	return getGithubContents<GithubContentInterface[]>(path);
}

export async function convertToGithubMarkDownByContent(path: string){
	if(!path.endsWith('.md')){
		throw new Error('This is not a Markdown page.')
	}
	const {response: data} = await getContent(path);
	if(typeof data !== 'object'){
		throw new Error('This is not object');
	}
	const encoding = data.encoding as BufferEncoding;
	let text = Buffer.from(data.content, encoding).toString('utf8');
	return await convertToGithubMarkDown(text);

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