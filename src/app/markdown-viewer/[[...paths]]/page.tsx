import ContainerLayout, { ContainerLayoutProps } from "@/components/ui/ContainerLayout";
import MarkDownHeadTitle from "@/components/ui/MarkDownHeadTitle";
import SplitLinkTitle from "@/components/ui/SplitLInkTitle";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import getUserConfig from "@/utills/config/get-user.config";
import {nextSlugGeneratePaths, nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import {NEXT_CONFIG} from "@/utills/config/config";

export interface Params extends PathsPageParams {
    
}
export const fetchCache = 'force-no-store'
async function getData(path: string): Promise<{data: string}> {
    const DOMAIN = getUserConfig('domain')
    const url = `${DOMAIN}/api/github/markdown`
    
    const response = await fetch(url,{
        method: "POST",
        body: JSON.stringify({
            path: path
        }),
        next: {revalidate: NEXT_CONFIG.cache.revalidate}
    });


    const result = await response.json();
    
    return {
        data: result.content
    }
}

export default async function Page({ params }: Params){

    const {paths, container} = params;
    const path = nextSlugGitContentsPath(paths);
    const {data} = await getData(path);

    let title = path.split('/').at(-1);
    if(title?.endsWith(".md")){
        title = title.slice(0,-3);
    }
    
    return (
        <ContainerLayout
            {...container}
            header={{
                title:<SplitLinkTitle justify={"flex-end"} paths={nextSlugGeneratePaths(path.split('/')).slice(0,-1)}/>,
                ...{...container?.header}   
            }}
        >
            <>
            <MarkDownHeadTitle>
                {title}
            </MarkDownHeadTitle>
            <article
                className={"markdown-body dark"}
                dangerouslySetInnerHTML={{__html: data ?? 'not found'}}>
            </article>
            </>
        </ContainerLayout>

    )
}