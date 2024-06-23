import {NextResponse} from "next/server";
import APP_CONFIG from "@/utills/config/config";
import {nextSlugGitContentsPath} from "@/utills/next-slug.utills";

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
        return NextResponse.json({
            error: error.toString()
        },{status: 500})
    }


}