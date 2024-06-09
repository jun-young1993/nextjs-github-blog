'use client'
import {TreeList, TreeListProps, TreeHeader} from "juny-react-style";
import {useRouter} from "next/navigation";
import styled from "styled-components";

interface ContentListProps  {
    paths?: string[] | []
    data: TreeListProps['items']
}
const TitleWrapStyled = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`
function ContentList({paths, items}: ContentListProps){
    const router = useRouter();
    console.log("=>(content-list.tsx:18) paths", paths);
    return <TreeList
        title={(
            <TitleWrapStyled>
                {paths && paths.map((path, index) => {
                    return (
                        <>
                            {(index > 0) && <span>{`\u202F/\u202F`}</span>}
                            <TreeHeader
                                onClick={() => {
                                    router.push(`/contents/${path}`);
                                }}
                            >
                                {path.split('/').at(-1)}
                            </TreeHeader>
                        </>
                    )
                })}
            </TitleWrapStyled>
        )}
        onClick={(item) => {
            router.push(`/contents/${item.userData.path}`)
        }}
        items={items}
    />
}

export default ContentList;