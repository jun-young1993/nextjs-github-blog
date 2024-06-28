import ContainerLayout from "@/components/ui/ContainerLayout";
import MarkDownHeadTitle from "@/components/ui/MarkDownHeadTitle";
import SplitLinkTitle from "@/components/ui/SplitLInkTitle";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import getUserConfig from "@/utills/config/get-user.config";
import {nextSlugGeneratePaths, nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import APP_CONFIG, {NEXT_CONFIG} from "@/utills/config/config";
import MarkDownPreview from "@/components/ui/MarkDownPreview";
import { Metadata, ResolvingMetadata } from "next";
import {convertToGithubMarkDownByContent, getContent} from "@/utills/blog-fetch";


export interface Params extends PathsPageParams {
    
}

export async function generateMetadata(
    { params }: Params,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {paths} = params;
    const path = nextSlugGitContentsPath(paths);
    const title = Array.from<string>(path.split('/')).at(-1) as string | undefined;
    const parentMetadata = await parent ?? {};
    const metadata = Promise.resolve(Object.assign({},parentMetadata,{
        title: title,
    })) as Promise<Metadata>;

    return metadata;
}

export default async function Page({ params }: Params){
    try{
        const {paths, container} = params;
        const path = nextSlugGitContentsPath(paths);
        
        let title = Array.from<string>(path.split('/')).at(-1) as string | undefined;
        if(title && title?.endsWith(".md")){
            title = title.slice(0,-3);
        }
        const {response: data} = await convertToGithubMarkDownByContent(path);
        return (
            <ContainerLayout
                {...container}
                header={{
                    title:<SplitLinkTitle justify={"flex-end"} paths={nextSlugGeneratePaths(path.split('/')).slice(0,-1)}/>,
                    ...{...container?.header}
                }}
            >
                <MarkDownPreview
                    title={title}
                    data={data}
                />

            </ContainerLayout>

        )
    }catch(error){
        return <div></div>
    }

}