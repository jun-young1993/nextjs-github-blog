import { MetadataRoute } from 'next'
import APP_CONFIG from "@/utills/config/config";
import getUserConfig from "@/utills/config/get-user.config";
import { constants } from 'http2';
import { GithubContentInterface } from '@/interfaces/github-user.interface';

interface SiteMapGenerateType {id: number};
export const dynamic = 'force-dynamic';
export async function generateSitemaps(){
    const githubBlogShowPaths = getUserConfig('githubBlogShowPaths');
    const init:SiteMapGenerateType[] = [{
        id: 0,
    }];
    let githubBlogSitemapStartNumber = 1;
    for(let index=githubBlogSitemapStartNumber; githubBlogShowPaths.length>=index; index++){
        init.push({
            id: index
        })
       
    }
    return init;

}
export default async function sitemap({
    id
}:{id: number}): Promise<MetadataRoute.Sitemap> {
    
    try{
        const {SITE_DOMAIN, APP_END_POINT} = APP_CONFIG;
        let result: MetadataRoute.Sitemap = [];
        
        if(id === 0){
            const userSitemap = getUserConfig('userSitemap');
            if(userSitemap){
                result = userSitemap.map((sitemap) => ({
                    url: `${SITE_DOMAIN}/${sitemap}`,
                    lastModified: new Date(),
                    changeFrequency: 'yearly' as 'yearly',
                    priority: 1,
                }));
            }

        }else{
            const {type, path} = getUserConfig('githubBlogShowPaths')[id-1]
            
            if(type === 'contents'){
                
                const contentsResponse = await fetch(APP_END_POINT.repos.contents(path));
                const contentsResult:GithubContentInterface[] = await contentsResponse.json();
                const {status: contentStatus, statusText: contentStatusText} = contentsResponse;
                if(contentStatus !== constants.HTTP_STATUS_OK){
                    throw new Error(`Request failed with status ${contentStatus}: ${contentStatusText}`);
                }
                console.log("=>(sitemap.ts:55) contentsResult", contentsResult);
                for(let index=0; contentsResult.length>index; index++){
                    const {sha, type: gitFileType, path: gitFolderPath, name: gitContentName} = contentsResult[index];
                    if(gitFileType === 'dir'){
                        
                        const treeResponse = await fetch(APP_END_POINT.repos.trees(sha)+'?recursive=true');
                        const treeResult:{tree: {path: string}[]} = await treeResponse.json();
                        const {status:treeStatus, statusText: treeStatusText} = treeResponse;
                        if(treeStatus !== constants.HTTP_STATUS_OK){
                            throw new Error(`Request failed with status ${treeStatus}: ${treeStatusText}`);
                        }       
                        for(let treeIndex=0; treeResult.tree.length> treeIndex; treeIndex++){
                            const {path: gitContentName} = treeResult.tree[treeIndex];
                            result.push({
                                url: `${SITE_DOMAIN}/${type}/${gitFolderPath}/${gitContentName}`,
                                lastModified: new Date(),
                                changeFrequency: 'yearly' as 'yearly',
                                priority: 1,
                            })
                        }
                    }else{
                        result.push({
                            url: `${SITE_DOMAIN}/${type}/${gitFolderPath}/${gitContentName}`,
                            lastModified: new Date(),
                            changeFrequency: 'yearly' as 'yearly',
                            priority: 1,
                        })
                    }
                }
            }
        }
        return result;
    }catch(error){
        return [];
    }

}