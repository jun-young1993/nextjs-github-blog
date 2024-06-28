import DynamicGithubCommentComponent from "@/components/dynamic/DynamicGithubComment";
import DynamicGithubReplyComponent from "@/components/dynamic/DynamicGithubReply";
import ContainerLayout from "@/components/ui/ContainerLayout";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import {createIssues, createOrUpdateCache, getCache, getCacheData} from "@/utills/blog-fetch";
import { nextSlugGitContentsPath } from "@/utills/next-slug.utills";
interface Params extends PathsPageParams{

}

export default async function Page({ params }:Params){
	const {paths:pathArray, container} = params;

	const path = nextSlugGitContentsPath(pathArray);

	const cache = await getCacheData(path);


	if(!cache.issueNumber){
		const {response: createIssue} = await createIssues(path);
		const {number} = createIssue;
		cache.issueNumber = number;
		await createOrUpdateCache(path, JSON.stringify(cache))
	}

	const {issueNumber} = cache;


	return (

		<ContainerLayout
			{...container}
		>
			<DynamicGithubCommentComponent />
			<DynamicGithubReplyComponent />
		</ContainerLayout>
	)
}