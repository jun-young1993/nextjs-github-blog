import { cookies } from "next/headers";
import APP_CONFIG, {NEXT_CONFIG} from "./config/config";
import {isBlogError, isGithubContent} from "./type-guard";
import { firstVisit } from "./defined/cookie";
import { constants } from "http2";
import {GithubContentInterface, GithubUserInterface} from "@/interfaces/github-user.interface";


interface BlogFetchInterface {
	endpoint: string;
	method?: "GET" | "POST" | "PUT";
	cache?: RequestCache;
	headers?: HeadersInit;
	body?: BodyInit;
	next?:  NextFetchRequestConfig 
	responseType?: 'json' | 'text'

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
	responseType = 'json'
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
			status === constants.HTTP_STATUS_OK 
			&& status === constants.HTTP_STATUS_CREATED
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
			statusText: 'unknown',
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
async function getGithubContents(path: string){
	const url = GIT_HUB_API_END_POINT.repos.contents(path);
	const result = await blogFetch<GithubContentInterface>({
		endpoint: url,
		headers: GIT_HUB_API_REQUEST_HEADER,
		next: {revalidate: NEXT_CONFIG.cache.revalidate}
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
	const {response: data} = await getContent(path);
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
export async function createOrUpdateContent(path: string, content: string){
	const url = GIT_HUB_API_END_POINT.repos.cacheContent(path);

	const {response: user} = await getGithubUser();



	return await blogFetch({
		endpoint: url,
		method: "PUT",
		headers: GIT_HUB_API_REQUEST_HEADER,
		body: JSON.stringify({
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
		}),
	});
}

