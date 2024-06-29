'use client'
import MarkDownPreview from "@/components/ui/MarkDownPreview";
import APP_CONFIG from "@/utills/config/config";
import { GithubComment, GithubCommentProps, ActiveModeType, ActiveMode } from "juny-react-style";
import { useRouter } from "next/navigation";
import {  useState } from "react";

interface GithubCommentComponentProps extends GithubCommentProps {
	issueNumber: number
}
const DynamicGithubComment = ({issueNumber, ...props}:GithubCommentComponentProps) => {
	const {APP_END_POINT} = APP_CONFIG;
	const router = useRouter();
	const [active, setActive] = useState<ActiveModeType>(ActiveMode.WRITE);
	const [markdown, setMarkdown] = useState<undefined | string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleClickTab = async function(value: ActiveModeType, comment: string){
		const result = await fetch(APP_END_POINT.markdownText(),{
			method: "POST",
			body:JSON.stringify({text: comment})
		})
		const {content} = await result.json();
		setMarkdown(content);
		setActive(value);
		
	}
	
	const handleSubmit = async function(comment: string)
	{
		setIsLoading(true);
		fetch(APP_END_POINT.repos.comments(issueNumber),{
			method: "POST",
			body:JSON.stringify({text: comment})
		}).then(()=>{
			setIsLoading(false);
			router.refresh()
		})
		.catch(() => {
			setIsLoading(false);
		})
		
		
	}
	return <GithubComment 
		onClick={handleClickTab}
		onSubmit={(comment) => {
			handleSubmit(comment);
		}}
		isLoading={isLoading}
		active={active}
		preview={<MarkDownPreview data={markdown} isTableOfContent={false} />}
		{...props} 
	/>
}
export default DynamicGithubComment;