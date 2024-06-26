import APP_CONFIG from "./config/config";

export async function convertToGithubMarkDown(text: string){
	const {GIT_HUB_API_REQUEST_HEADER, GIT_HUB_API_END_POINT} = APP_CONFIG;
        const response = await fetch(GIT_HUB_API_END_POINT.markdown(),{
		method: "POST",
		headers: GIT_HUB_API_REQUEST_HEADER,
		body: JSON.stringify({text: text})
	    });
	return response;
}