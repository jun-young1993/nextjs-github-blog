import {NextResponse} from "next/server";
import APP_CONFIG from "@/utills/config/config";
import {nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import {constants} from "http2";

type Params = {
    params: {
        paths: string[]
    }
}

export async function GET(request: Request, { params }: Params){
    try{
        const path = nextSlugGitContentsPath(params.paths ?? []);

        const {GIT_HUB_API_END_POINT, GIT_HUB_PERSONAL_ACCESS_TOKEN,GIT_HUB_API_VERSION} = APP_CONFIG;
        const url = GIT_HUB_API_END_POINT.repos.images(path);

        const res = await fetch(url,{
            headers: {
                'Authorization': `Bearer ${GIT_HUB_PERSONAL_ACCESS_TOKEN}`,
                'Accept': 'application/vnd.github.raw+json',
                'X-GitHub-Api-Version': GIT_HUB_API_VERSION
            }
        });

        return res;
    }catch( error ){
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