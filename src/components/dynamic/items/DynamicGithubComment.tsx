'user client'
import APP_CONFIG from "@/utills/config/config";
import { GithubComment, GithubCommentProps, ActiveModeType, ActiveMode } from "juny-react-style";
import {  useState } from "react";
interface GithubCommentComponentProps extends GithubCommentProps {
	issueNumber: number
}
const DynamicGithubComment = (props:GithubCommentComponentProps) => {
	const {APP_END_POINT} = APP_CONFIG;
	const [active, setActive] = useState<ActiveModeType>(ActiveMode.WRITE);
	const [markdown, setMarkdown] = useState<undefined | string>();
	const handleClickTab = async function(value: ActiveModeType, comment: string){
		
		const result = await fetch(APP_END_POINT.markdownText(),{
			method: "POST",
			body:JSON.stringify({text: comment})
		})
		const {content} = await result.json();
		setMarkdown(content);
		setActive(value);
	}


	return <GithubComment 
		onClick={handleClickTab}
		active={active}
		preview={            <article
			className={"markdown-body dark"}
			dangerouslySetInnerHTML={{__html: markdown ?? 'Nothing to preview'}}>
		    </article>}
		{...props} 
	/>
}
export default DynamicGithubComment;