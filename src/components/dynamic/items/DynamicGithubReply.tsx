'use client'
import MarkDownPreview from '@/components/ui/MarkDownPreview';
import { GithubIssueCommentInterface } from '@/interfaces/github-user.interface';
import {GithubReply, GithubReplyProps} from 'juny-react-style';
import styled from 'styled-components';
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
			comment={<MarkDownPreview data={item.body} isTableOfContent={false} />}
			{...props} 
		/>
	)
		
}

export default DynamicGithubReply;