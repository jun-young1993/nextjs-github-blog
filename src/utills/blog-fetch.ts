import { cookies } from "next/headers";
import APP_CONFIG, {NEXT_CONFIG} from "./config/config";
import {isBlogError, isGithubContent} from "./type-guard";
import { firstVisit } from "./defined/cookie";
import { constants } from "http2";
import {GithubContentInterface, GithubIssueInterface, GithubUserInterface} from "@/interfaces/github-user.interface";


interface BlogFetchInterface {
	endpoint: string;
	method?: "GET" | "POST" | "PUT";
	cache?: RequestCache;
	headers?: HeadersInit;
	body?: BodyInit;
	next?:  NextFetchRequestConfig 
	responseType?: 'json' | 'text'
	successStatus?: number[]

}
interface BlogFetchResponse<T>{
	status: number; statusText?: string, response: T
}
const {
	GIT_HUB_API_REQUEST_HEADER,
	GIT_HUB_API_END_POINT,
	GIT_HUB_PERSONAL_REPOSITORY_OWNER,
	GIT_HUB_API_URL,
	GIT_HUB_PERSONAL_REPOSITORY_NAME,
} = APP_CONFIG;
export async function blogFetch<T>({
	endpoint,
	method = "GET",
	// cache = 'force-cache',
	headers,
	body,
	next,
	responseType = 'json',
	successStatus = [constants.HTTP_STATUS_OK,constants.HTTP_STATUS_CREATED]
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
			// cache,
			...(next && { next: next })
		});
		const {status, statusText} = result;
		console.log('status,statusText',status,statusText);
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
			statusText: e.toString() || 'unknown',
			status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
		};
	}
}

export async function getGithubUser()
{

	const cookieStore = cookies();
	if(!cookieStore.has(firstVisit)){
		cookieStore.set(firstVisit, 'true', { maxAge: 3600*24 })
	}

	return await blogFetch<GithubUserInterface>({
		endpoint: GIT_HUB_API_END_POINT.user(),
		headers: APP_CONFIG.GIT_HUB_API_REQUEST_HEADER,
		cache: 'no-store'
	});

}
async function getGithubContents(path: string, initOptions?: BlogFetchInterface){
	const url = GIT_HUB_API_END_POINT.repos.contents(path);
	const result = await blogFetch<GithubContentInterface>({
		endpoint: url,
		headers: GIT_HUB_API_REQUEST_HEADER,
		next: {revalidate: NEXT_CONFIG.cache.revalidate},
			...(initOptions && initOptions)
	});

	return result;

}

export async function getContent(path: string){
	return getGithubContents<GithubContentInterface>(path);
}

export async function getContents(path: string){
	return getGithubContents<GithubContentInterface[]>(path);
}

export async function convertToGithubMarkDownByContent(path: string){
	if(!path.endsWith('.md')){
		throw new Error('This is not a Markdown page.')
	}
	const {response: data} = await getContent<GithubContentInterface>(path);
	if(typeof data !== 'object'){
		throw new Error('This is not object');
	}

	let text = Buffer.from(data.content, data.encoding).toString('utf8');
	return await convertToGithubMarkDown(text);

}

export async function convertToGithubMarkDown(text: string){
	const response = await blogFetch({
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

	return await getGithubContents(path, {
		endpoint: url,
		successStatus: [constants.HTTP_STATUS_NOT_FOUND, constants.HTTP_STATUS_OK]
	});
}
export async function getCacheData(path: string){
	try{
		const {response: data} = await getCache(path);
		const text = Buffer.from(data.content, data.encoding).toString('utf8');
		return JSON.parse(text);
	}catch(error){
		return {};
	}


}
export async function createOrUpdateCache(path: string, content: string){
	const url = GIT_HUB_API_END_POINT.repos.cacheContent(path);
	const {response: user} = await getGithubUser();
	const {response: result} = await getGithubContents(path, {
		endpoint: url,
		successStatus: [constants.HTTP_STATUS_NOT_FOUND, constants.HTTP_STATUS_OK]
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
		successStatus: [constants.HTTP_STATUS_OK]
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
		successStatus: [constants.HTTP_STATUS_CREATED],
		body: JSON.stringify({
			title: title
		})
	})
}