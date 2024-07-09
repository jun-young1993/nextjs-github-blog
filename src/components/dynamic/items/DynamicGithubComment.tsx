'use client'
import MarkDownPreview from "@/components/ui/MarkDownPreview";
import APP_CONFIG from "@/utills/config/config";
import { GithubComment, GithubCommentProps, ActiveModeType, ActiveMode } from "juny-react-style";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {footerId} from "@/utills/defined/dom-id";


interface GithubCommentComponentProps extends GithubCommentProps {
	issueNumber: number
}
const DynamicGithubComment = ({issueNumber, ...props}:GithubCommentComponentProps) => {
	const {APP_END_POINT} = APP_CONFIG;
	const router = useRouter();
	const pathname = usePathname();
	const [active, setActive] = useState<ActiveModeType>(ActiveMode.WRITE);
	const [markdown, setMarkdown] = useState<undefined | string>(undefined);
	const [isLoading, setIsLoading] = useState<boolean|undefined>(undefined);
	const handleClickTab = async function(value: ActiveModeType, comment: string){
			console.log(APP_END_POINT.markdownText());
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
		await setIsLoading(true);
		await fetch(APP_END_POINT.repos.comments(issueNumber),{
			method: "POST",
			body:JSON.stringify({text: comment})
		});
		await setIsLoading(false);



		router.refresh();
		// const timer = setTimeout(() => {

		// 	router.replace(`${pathname}/#${footerId}`);
		// 	clearTimeout(timer);
		// },300);
		
	}



	return <GithubComment 
		onClick={handleClickTab}
		onSubmit={async (comment) => {
			await handleSubmit(comment);
			return '';
		}}
		isLoading={isLoading ?? false}
		active={active}
		preview={markdown && <MarkDownPreview data={markdown} isTableOfContent={false} />}
		{...props} 
	/>
}

export default DynamicGithubComment;