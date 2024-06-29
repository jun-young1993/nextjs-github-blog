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
	const response =await fetch(APP_END_POINT.repos.comments(issueNumber));
	const {body: issues} = await response.json() as {body: GithubIssueCommentInterface[] | []};
	
	
	const resultIssues = await Promise.all(issues.map(async ({body, ...issue}) => {
		const {response: markdownContent} = await convertToGithubMarkDown(body);
		
		return {
			body: markdownContent,
			...issue
		}
	}));
	
	return (

		<ContainerLayout
			{...container}
		>
			<DynamicGithubCommentComponent 
				issueNumber={issueNumber}
			/>
			{resultIssues.map((issue) => {
				return <DynamicGithubReplyComponent 
					key={issue.node_id}
					item={issue}
				/>
			})}
			
		</ContainerLayout>
	)
}