'use client'
import {TreeList, TreeListProps, TreeHeader} from "juny-react-style";
import {useRouter} from "next/navigation";
import styled from "styled-components";
import {GithubContentInterface} from "@/interfaces/github-user.interface";
import {Fragment} from "react";

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
            <TitleWrapStyled>
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
                                        router.push(`/contents/${path}`);
                                    }}
                                >
                                    {path.split('/').at(-1)}
                                </TreeHeader>
                            </Fragment>
                        )
                    })
                }
            </TitleWrapStyled>
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