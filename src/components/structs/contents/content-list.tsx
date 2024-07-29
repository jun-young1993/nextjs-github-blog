'use client'
import {TreeList, TreeListProps, TreeHeader} from "juny-react-style";
import {useRouter} from "next/navigation";
import styled from "styled-components";
import {GithubContentInterface} from "@/interfaces/github-user.interface";
import SplitLinkTitle from "@/components/ui/SplitLInkTitle";
import {GithubBlogShowPathTypeEnum} from "@/utills/config/config.type";

interface ContentListProps  {
    paths?: string[] | [] | undefined
    data: TreeListProps<GithubContentInterface>['items'],
    repository?: string
}
const TitleWrapStyled = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`
function ContentList({paths, data, repository}: ContentListProps){
    const router = useRouter();

    return <TreeList
        title={(
            <SplitLinkTitle paths={paths} repository={repository} />
        )}
        onClick={(item) => {
            if(item.userData){
                if(item.userData.type === 'file') {
                    router.push(`/${repository ? 'repository-markdown-viewer/'+repository : 'markdown-viewer'}/${item.userData.path}`)
                }else{
                    router.push(`/${repository ? GithubBlogShowPathTypeEnum.REPOSITORY_CONTENTS+'/'+repository : 'contents'}/${item.userData.path}`)
                }

            }else{
                throw new Error('not found path');
            }

        }}
        items={data}
    />
}

export default ContentList;