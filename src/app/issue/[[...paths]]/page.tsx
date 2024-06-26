import DynamicGithubCommentComponent from "@/components/dynamic/DynamicGithubComment";
import DynamicGithubReplyComponent from "@/components/dynamic/DynamicGithubReply";
import ContainerLayout from "@/components/ui/ContainerLayout";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import APP_CONFIG from "@/utills/config/config";
import { nextSlugGitContentsPath } from "@/utills/next-slug.utills";
interface Params extends PathsPageParams{

}
async function createCache(path: string){
	const {APP_END_POINT} = APP_CONFIG;
    	const url = APP_END_POINT.repos.contents(path);
	const response = await fetch(url,{
		method: "PUT",
		body:JSON.stringify({
			test: 'body'
		})
	})
	console.log(await response.json());
}
export default async function Page({ params }:Params){
	const {paths:pathArray, container} = params;
	const path = nextSlugGitContentsPath(pathArray);
	await createCache(path);
	return (

		<ContainerLayout
			{...container}
		>
			<DynamicGithubCommentComponent />
			<DynamicGithubReplyComponent />
		</ContainerLayout>
	)
}