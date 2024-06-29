import MarkDownHeadTitle from "@/components/ui/MarkDownHeadTitle";
import {TABLE_OF_CONTENTS, WIKI_LINK} from "@/utills/config/config";
import replaceWikiLink from "@/utills/markdown/wiki-link";
import DynamicAlertWrapComponent from "../dynamic/DynamicAlertWrap";
import replaceHeadings, { HeadingToc } from "@/utills/markdown/heading";
interface MarkDownPreviewProps{
    title?: string | undefined
    data?: string
    isTableOfContent?: boolean
}
function MarkDownPreview({
    title, 
    data,
    isTableOfContent = true
}:MarkDownPreviewProps){
    let tableOfContents:HeadingToc[] | []  = []
    if(data){
        data = replaceWikiLink(data)   
    }

    if(data){
        const [result, toc] = replaceHeadings(data);
        data = result;
        tableOfContents= toc;
    }
    
    return (
        <>
            {title &&
                <MarkDownHeadTitle>
                    {decodeURIComponent(title)}
                </MarkDownHeadTitle>}
            <article
                className={"markdown-body dark"}
                dangerouslySetInnerHTML={{__html: data ?? 'not found'}}>
            </article>
            {isTableOfContent && (TABLE_OF_CONTENTS && (tableOfContents.length > 0)) &&
                <DynamicAlertWrapComponent
                    position={undefined} 
                    index={0} 
                    gap={""}
                >
                    <ul>
                            {tableOfContents.map(({ id, title, level }) => {
                                return <li
                                    key={`${id}`}
                                    style={{
                                        marginLeft: `${parseInt(level) - 1}rem`
                                    }}>
                                    <a style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }} href={`#${id}`}>{title}</a>
                                </li>;
                            })}
                        </ul>
                </DynamicAlertWrapComponent>
                    
                
            }
        </>
    )
}

export default MarkDownPreview;