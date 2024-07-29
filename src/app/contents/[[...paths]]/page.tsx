import {nextSlugGeneratePaths, nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import ContainerLayout from "@/components/ui/ContainerLayout";
import ContentList from "@/components/structs/contents/content-list";
import {redirect} from "next/navigation";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import {getContents} from "@/utills/blog-fetch";



interface Params extends PathsPageParams{

}

export default async function Page({ params }:Params) {
    const {paths:pathArray, container, repository} = params;

    const path = nextSlugGitContentsPath(pathArray);
    const paths = nextSlugGeneratePaths(pathArray);

    const {response:data} = await getContents({
        path: path,
        repository: repository
    });

    if(!Array.isArray(data)){
        redirect(`/markdown-viewer/${path}`);
    }

    return (
        <ContainerLayout
            {...container}
        >
            {Array.isArray(data) &&
            <ContentList
                paths={paths}
                data={data.map((item) => {
                    return {
                        userData: item,
                        title: item.name
                    }
                })}
                repository={repository}
            />}
        </ContainerLayout>
    )


}