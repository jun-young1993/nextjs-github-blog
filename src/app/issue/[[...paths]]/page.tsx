import DynamicGithubCommentComponent from "@/components/dynamic/DynamicGithubComment";
import DynamicGithubReplyComponent from "@/components/dynamic/DynamicGithubReply";
import ContainerLayout from "@/components/ui/ContainerLayout";
import { GithubIssueCommentInterface } from "@/interfaces/github-user.interface";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import {convertToGithubMarkDown, createIssues, createOrUpdateCache, getCacheData, getIssueComments} from "@/utills/blog-fetch";
import APP_CONFIG from "@/utills/config/config";
import { nextSlugGitContentsPath } from "@/utills/next-slug.utills";
interface Params extends PathsPageParams{

}

export default async function Page({ params }:Params){
	const {paths:pathArray, container} = params;
	const {APP_END_POINT} = APP_CONFIG;
	const path = nextSlugGitContentsPath(pathArray);

	const cache = await getCacheData(path);


	if(!cache.issueNumber){
		const {response: createIssue} = await createIssues(path);
		const {number} = createIssue;
		cache.issueNumber = number;
		await createOrUpdateCache(path, JSON.stringify(cache))
	}

	const {issueNumber} = cache;
	const {response: issues} =await getIssueComments(issueNumber);


	return (

		<ContainerLayout
			{...container}
		>
			<DynamicGithubCommentComponent 
				issueNumber={issueNumber}
			/>
			{issues.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime() ).map((issue) => {
				return <DynamicGithubReplyComponent 
					key={issue.node_id}
					item={issue}
				/>
			})}
			
		</ContainerLayout>
	)
}