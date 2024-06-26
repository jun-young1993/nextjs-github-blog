import APP_CONFIG from "./config/config";
import { isBlogError } from "./type-guard";

interface BlogFetchInterface {
	endpoint: string;
	method?: "GET" | "POST";
	cache?: RequestCache;
	headers?: HeadersInit;
	body?: BodyInit;
	next?:  NextFetchRequestConfig 
	responseType?: 'json' | 'text'

}
export async function blogFetch<T>({
	endpoint,
	method = "GET",
	cache = 'force-cache',
	headers,
	body,
	next,
	responseType = 'json'
	}: BlogFetchInterface
): Promise<{ status: number; response: T } | never> {
	try {
		const result = await fetch(endpoint, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				...headers
			},
			...(body && {body: body}),
			cache,
			...(next && { next: next })
		});
		
		const response = await result[responseType]();

	

		return {
			status: result.status,
			response
		};
	} catch (e) {
		if (isBlogError(e)) {
			throw {
				cause: e.cause?.toString() || 'unknown',
				status: e.status || 500,
				message: e.message,
			};
		}

		throw {
			error: e,
		};
	}
}

export async function getPreviewMarkdown(text: string){
	
	// const {GIT_HUB_API_REQUEST_HEADER, GIT_HUB_API_END_POINT} = APP_CONFIG;
	// const result =await blogFetch({
	// 	endpoint: GIT_HUB_API_END_POINT.markdown(),
	// 	method: "POST",
	// 	headers: GIT_HUB_API_REQUEST_HEADER,
	// 	body: JSON.stringify({text: text})
	// });
	// console.log(result);
}