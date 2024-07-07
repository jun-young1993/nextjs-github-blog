'use client'
import { GithubBlogShowPathTypeEnum } from "@/utills/config/config.type";
import { TreeHeader } from "juny-react-style";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import styled from "styled-components";

const TitleWrapStyled = styled.div<SplitLinkTitleProps>`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: ${({justify}) => justify ?? 'flex-start'};
`
interface SplitLinkTitleProps {
	paths?: string[] | []
	justify?: string
}

function SplitLinkTitle({paths, justify}: SplitLinkTitleProps){
	const router = useRouter();
	return (
		<TitleWrapStyled justify={justify}>
			{
				paths &&
				paths.map((path, index) => {
					return (
						<Fragment
							key={path+index}
						>
							{(index > 0) && <span>{`\u202F/\u202F`}</span>}
							<TreeHeader
								onClick={() => {
									router.push(`/${GithubBlogShowPathTypeEnum.CONTENTS}/${path}`);
								}}
							>
								{decodeURIComponent(path.split('/').at(-1) as string)}
							</TreeHeader>
						</Fragment>
					)
				})
			}
		</TitleWrapStyled>
	)
}

export default SplitLinkTitle;