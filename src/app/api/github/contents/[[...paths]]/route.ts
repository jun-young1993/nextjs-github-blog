import {constants} from "http2";
import {NextResponse} from "next/server";
import APP_CONFIG from "@/utills/config/config";
import {GithubContentInterface} from "@/interfaces/github-user.interface";
import {nextSlugGitContentsPath} from "@/utills/next-slug.utills";
type Params = {
    params: {
        paths?: [] | string[]
    }
}

export async function GET(request: Request, {params}: Params): Promise<Response>
{
    try{

        const path = nextSlugGitContentsPath(params.paths ?? []);

        const {
            GIT_HUB_API_REQUEST_HEADER,
            GIT_HUB_API_END_POINT,
        } = APP_CONFIG;
        const url = GIT_HUB_API_END_POINT.repos.contents(path);
        const response = await fetch(url,{
            headers: GIT_HUB_API_REQUEST_HEADER
        });
        const {status, statusText } = response;
        if(status !== constants.HTTP_STATUS_OK){

            throw new Error(`Request failed with status ${status}: ${statusText}`);
        }
        const result:GithubContentInterface[] | [] = await response.json();
        return NextResponse.json(result,{
            status: status
        })
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            error: errorMessage
        }, {
            status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        });
    }
}