'use client'
import {TreeList, TreeListProps, TreeHeader} from "juny-react-style";
import {useRouter} from "next/navigation";
import styled from "styled-components";
import {GithubContentInterface} from "@/interfaces/github-user.interface";
import SplitLinkTitle from "@/components/ui/SplitLInkTitle";

interface ContentListProps  {
    paths?: string[] | []
    data: TreeListProps<GithubContentInterface>['items']
}
const TitleWrapStyled = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`
function ContentList({paths, data}: ContentListProps){
    const router = useRouter();

    return <TreeList
        title={(
            <SplitLinkTitle paths={paths} />
        )}
        onClick={(item) => {
            if(item.userData){
                router.push(`/contents/${item.userData.path}`)
            }else{
                throw new Error('not found path');
            }

        }}
        items={data}
    />
}

export default ContentList;