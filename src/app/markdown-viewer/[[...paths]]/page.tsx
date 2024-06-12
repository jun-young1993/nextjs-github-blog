import ContainerLayout from "@/components/ui/ContainerLayout";
import MarkDownHeadTitle from "@/components/ui/MarkDownHeadTitle";
import SplitLinkTitle from "@/components/ui/SplitLInkTitle";
import { GithubBlogShowPathTypeEnum } from "@/utills/config/config.type";
import getUserConfig from "@/utills/config/get-user.config";
import {nextSlugGeneratePaths, nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import Link from "next/link";
import { Fragment } from "react";



export interface Params {
    params: {
        paths?: string[] | []
    }
}
async function getData(path: string): Promise<{data: string}> {
    const DOMAIN = getUserConfig('domain')
    const url = `${DOMAIN}/api/github/markdown`
    const response = await fetch(url,{
        method: "POST",
        body: JSON.stringify({
            path: path
        })
    });
    const result = await response.json();
    return {
        data: result.content
    }
}

export default async function Page({ params }: Params){
    const path = nextSlugGitContentsPath(params.paths);
    const {data} = await getData(path);
    let title = path.split('/').at(-1);
    if(title?.endsWith(".md")){
        title = title.slice(0,-3);
    }

    return (
        <ContainerLayout
            title={<SplitLinkTitle justify={"flex-end"} paths={nextSlugGeneratePaths(path.split('/')).slice(0,-1)}/>}
        >
            <>
            <MarkDownHeadTitle>
                {title}
            </MarkDownHeadTitle>
            <article
                className={"markdown-body dark"}
                dangerouslySetInnerHTML={{__html: data}}>
            </article>
            </>
        </ContainerLayout>

    )
}