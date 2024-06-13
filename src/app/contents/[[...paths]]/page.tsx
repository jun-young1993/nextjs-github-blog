import {nextSlugGeneratePaths, nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import getUserConfig from "@/utills/config/get-user.config";
import ContainerLayout, { ContainerLayoutProps } from "@/components/ui/ContainerLayout";
import ContentList from "@/components/structs/contents/content-list";
import {redirect} from "next/navigation";
import {GithubContentInterface} from "@/interfaces/github-user.interface";
import APP_CONFIG from "@/utills/config/config";

export interface Params {
    params: {
        paths?: string[] | []
        container?: ContainerLayoutProps
    },
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
    const {paths:pathArray, container} = params;
    const path = nextSlugGitContentsPath(pathArray);
    const paths = nextSlugGeneratePaths(pathArray);

    const {data} = await getData(path);

    return (
        <ContainerLayout
            {...container}
        >
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