import {nextSlugGitContentsPath} from "@/utills/next-slug.utills";
import userConfig from "../../../../github.blog.config";
import {getUserConfig} from "@/utills/config/github-blog.config";

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
    console.log("=>(page.tsx:20) data", data);
    return <div>hi bye</div>
}