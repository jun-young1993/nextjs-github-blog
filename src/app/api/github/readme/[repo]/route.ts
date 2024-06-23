import APP_CONFIG from "@/utills/config/config";
import {constants} from "http2";
import {NextResponse} from "next/server";
type Params = {
    params: {
        repo: string
    }
}
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
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
            cache: 'no-store',
            body: JSON.stringify({text: text})
        })
        const {status, statusText } = response;

        if(status !== constants.HTTP_STATUS_OK){
            throw new Error(`Request failed with status ${status}: ${statusText}`);
        }
        const markdownContent = await response.text();

        const jsonResponse =  NextResponse.json({
            content: markdownContent,
            headers: {
                'Content-Type': 'application/json',

            }
        });
        jsonResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        jsonResponse.headers.set('Pragma', 'no-cache');
        jsonResponse.headers.set('Expires', '0');
        jsonResponse.headers.set('Surrogate-Control', 'no-store');

        return jsonResponse;
    }catch(error){
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json({
			error: errorMessage
		}, {
			status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            headers: {
                'Content-Type': 'application/json',
                
            }
		});
    }
}