'use client'
import MarkDownPreview from '@/components/ui/MarkDownPreview';
import { GithubIssueCommentInterface } from '@/interfaces/github-user.interface';
import {GithubReply, GithubReplyProps} from 'juny-react-style';
import styled from 'styled-components';
import {Fragment} from "react";
interface GithubIssueReplyComponentProps extends GithubReplyProps {
	item: GithubIssueCommentInterface
}
const Header = styled.div`
	text-align: right;
	width: 100%;
`
const DynamicGithubReply = ({item,...props}: GithubIssueReplyComponentProps) => {

	return (
		<GithubReply
			title={<Header>{item.updated_at.toString()}</Header>}
			comment={
					<div id={`${item.id}`}>
						<MarkDownPreview data={item.body_html} isTableOfContent={false} />
					</div>
			}
			{...props} 
		/>
	)
		
}

export default DynamicGithubReply;