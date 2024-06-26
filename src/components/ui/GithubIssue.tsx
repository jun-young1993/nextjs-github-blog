
import DynamicGithubCommentComponent from "../dynamic/DynamicGithubComment";
import DynamicGithubReplyComponent from "../dynamic/DynamicGithubReply";
import ContainerLayout from "./ContainerLayout";

export default function GithubIssue(){
	return (
		<>
		<ContainerLayout>
			
		</ContainerLayout>
		<DynamicGithubCommentComponent />
		<DynamicGithubReplyComponent />
		</>
	)
}