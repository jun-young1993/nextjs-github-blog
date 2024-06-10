import ContainerLayout from "@/components/ui/ContainerLayout";
import getUserConfig from "@/utills/config/get-user.config";
import {nextSlugGitContentsPath} from "@/utills/next-slug.utills";

interface Params {
    params: {
        slug?: string[] | []
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
    const path = nextSlugGitContentsPath(params.slug);
    const {data} = await getData(path);


    return (
        <ContainerLayout
        >
            <article
                className={"markdown-body dark"}
                dangerouslySetInnerHTML={{__html: data}}>
            </article>
        </ContainerLayout>

    )
}