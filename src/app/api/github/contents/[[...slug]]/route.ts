import {constants} from "http2";
import {NextResponse} from "next/server";
import APP_CONFIG from "@/utills/config/config";
import {GithubContentInterface, GithubUserInterface} from "@/interfaces/github-user.interface";
import {nextSlugGitContentsPath} from "@/utills/next-slug.utills";
type Params = {
    params: {
        slug?: [] | string[]
    }
}

export async function GET(request: Request, {params}: Params): Promise<GithubContentInterface[]>
{
    try{

        const path = nextSlugGitContentsPath(params.slug);

        const {
            GIT_HUB_API_URL,
            GIT_HUB_PERSONAL_REPOSITORY_NAME,
            GIT_HUB_PERSONAL_REPOSITORY_OWNER,
            GIT_HUB_API_REQUEST_HEADER
        } = APP_CONFIG;
        const url = `${GIT_HUB_API_URL}/repos/${GIT_HUB_PERSONAL_REPOSITORY_OWNER}/${GIT_HUB_PERSONAL_REPOSITORY_NAME}/contents/${path}`
        const response = await fetch(url,{
            headers: GIT_HUB_API_REQUEST_HEADER
        });
        const {status, statusText } = response;
        if(status !== constants.HTTP_STATUS_OK){
            throw new Error(`Request failed with status ${status}: ${statusText}`);
        }
        const result:GithubUserInterface = await response.json();
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