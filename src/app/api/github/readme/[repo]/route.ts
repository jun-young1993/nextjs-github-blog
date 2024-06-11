import APP_CONFIG from "@/utills/config/config";
import {constants} from "http2";
import {NextResponse} from "next/server";
type Params = {
    params: {
        repo: string
    }
}
export async function GET(request: Request, {params}: Params): Promise<Response>
{
    try{
        const {repo} = params;
        const {GIT_HUB_API_END_POINT, GIT_HUB_API_REQUEST_HEADER} = APP_CONFIG
        const readmeResponse = await fetch(GIT_HUB_API_END_POINT.repos.readme(repo));
        const readmeResult = await readmeResponse.json();
        const text = Buffer.from(readmeResult.content, readmeResult.encoding).toString('utf8');

        const response = await fetch(GIT_HUB_API_END_POINT.markdown(),{
            method: "POST",
            headers: GIT_HUB_API_REQUEST_HEADER,
            body: JSON.stringify({text: text})
        })
        const {status, statusText } = response;
        if(status !== constants.HTTP_STATUS_OK){
            throw new Error(`Request failed with status ${status}: ${statusText}`);
        }
        const markdownContent = await response.text();
        return NextResponse.json({
            content: markdownContent
        });
    }catch(error){
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json({
			error: errorMessage
		}, {
			status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
		});
    }
}