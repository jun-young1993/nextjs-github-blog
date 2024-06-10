import {nextSlugGeneratePaths, nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import getUserConfig from "@/utills/config/get-user.config";
import ContainerLayout from "@/components/ui/ContainerLayout";
import ContentList from "@/components/structs/contents/content-list";
import {redirect} from "next/navigation";
import {GithubContentInterface} from "@/interfaces/github-user.interface";
import APP_CONFIG from "@/utills/config/config";

interface Params {
    params: {
        paths?: string[] | []
    }
}
async function getData(path: string): Promise<{data: GithubContentInterface[]}> {
    const {APP_END_POINT} = APP_CONFIG;
    const url = APP_END_POINT.repos.contents(path);
    if(url.endsWith('.md')){
        redirect(`/markdown-viewer/${path}`);
    }
    const response = await fetch(url);
    const result = await response.json();

    return {
        data: result ?? []
    }
}
export default async function Page({ params }:Params) {
    const path = nextSlugGitContentsPath(params.paths);
    const paths = nextSlugGeneratePaths(params.paths);

    const {data} = await getData(path);

    return (
        <ContainerLayout>
            <ContentList
                paths={paths}
                data={data.map((item) => {
                    return {
                        userData: item,
                        title: item.name
                    }
                })}
            >

            </ContentList>
        </ContainerLayout>
    )


}