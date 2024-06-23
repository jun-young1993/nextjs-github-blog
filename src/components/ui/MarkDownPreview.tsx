import MarkDownHeadTitle from "@/components/ui/MarkDownHeadTitle";
import {WIKI_LINK} from "@/utills/config/config";
import replaceWikiLink from "@/utills/markdown/wiki-link";

interface MarkDownPreviewProps{
    title?: string | undefined
    data?: string
}
function MarkDownPreview({title, data}:MarkDownPreviewProps){
    if(data){
        data = replaceWikiLink(data)
    }

    return (
        <>
            {title &&
                <MarkDownHeadTitle>
                    {title}
                </MarkDownHeadTitle>}
            <article
                className={"markdown-body dark"}
                dangerouslySetInnerHTML={{__html: data ?? 'not found'}}>
            </article>
        </>
    )
}

export default MarkDownPreview;