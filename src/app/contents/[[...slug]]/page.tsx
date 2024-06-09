import {nextSlugGeneratePaths, nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import getUserConfig from "@/utills/config/get-user.config";
import ContainerLayout from "@/components/ui/ContainerLayout";
import ContentList from "@/components/structs/contents/content-list";
import TreeHeaderLink from "@/components/ui/tree-header-link";

interface Params {
    params: {
        slug?: string[] | []
    }
}
async function getData(path: string): Promise<any> {
    const DOMAIN = getUserConfig('domain')
    const url = `${DOMAIN}/api/github/contents/${path}`;

    const response = await fetch(url);
    const result = await response.json();
    return {
        data: result
    }
}
export default async function Page({ params }:Params) {
    const path = nextSlugGitContentsPath(params.slug);
    const {data} = await getData(path);
    const paths = nextSlugGeneratePaths(params.slug);
    return (
        <ContainerLayout>
            <ContentList
                paths={paths}
                // title={
                //     // <TreeHeaderLink href={path}>{path}</TreeHeaderLink>
                // }
                items={data.map((item) => {
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