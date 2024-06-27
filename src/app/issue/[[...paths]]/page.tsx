import DynamicGithubCommentComponent from "@/components/dynamic/DynamicGithubComment";
import DynamicGithubReplyComponent from "@/components/dynamic/DynamicGithubReply";
import ContainerLayout from "@/components/ui/ContainerLayout";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import { createOrUpdateContent } from "@/utills/blog-fetch";
import APP_CONFIG from "@/utills/config/config";
import { nextSlugGitContentsPath } from "@/utills/next-slug.utills";
interface Params extends PathsPageParams{

}

export default async function Page({ params }:Params){
	const {paths:pathArray, container} = params;
	const path = nextSlugGitContentsPath(pathArray);
	const {response: result} = await createOrUpdateContent(path, JSON.stringify({
		test: 'hi'
	}));
	console.log(result);
	return (

		<ContainerLayout
			{...container}
		>
			<DynamicGithubCommentComponent />
			<DynamicGithubReplyComponent />
		</ContainerLayout>
	)
}