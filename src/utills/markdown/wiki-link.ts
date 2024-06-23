import APP_CONFIG, {WIKI_LINK} from "@/utills/config/config";

export default function replaceWikiLink(content: string){
    const wikiLinkImageRegex = /!\[\[(.*?)\]\]/g;
    const wikiLinkBackLinkTitleRegex = /\[\[([^|\]]+)\s*\|\s*([^\]]+)\]\]/g;
    const WikiLinkBackLinkNoTitleRegex = /\[\[([^\|\]]+)\]\]/g;
    const {APP_END_POINT, SITE_DOMAIN} =APP_CONFIG;

    if(WIKI_LINK){
        content = content.replace(wikiLinkImageRegex,(searchValue, replaceValue) => {
            const imageUrl = `${WIKI_LINK}/${replaceValue}`;
            return `
            <a target="_blank" rel="noopener noreferrer" href="${APP_END_POINT.images(imageUrl)}">
                <img 
                    width="100%" 
                    alt="${replaceValue}" 
                    src="${APP_END_POINT.images(imageUrl)}" 
                    style="max-width: 95%;"
                >
            </a>
        `;
        });
    }

    content = content.replace(wikiLinkBackLinkTitleRegex, (searchValue, path, title) => {

        return `<a href="${SITE_DOMAIN}/contents/${path}">${title}</a>`;
    });
    content = content.replace(WikiLinkBackLinkNoTitleRegex, (searchValue, path) => {
        return `<a href="${SITE_DOMAIN}/contents/${path}">${path}</a>`;
    });




    return content;

}