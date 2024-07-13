import { MetadataRoute } from 'next'
import APP_CONFIG from "@/utills/config/config";
import getUserConfig from "@/utills/config/get-user.config";
import { constants } from 'http2';
import { GithubContentInterface } from '@/interfaces/github-user.interface';
import {fetchContentRecursively, fetchTreeRecursively} from "@/utills/blog-fetch";
import getGithubBlogShowPaths from '@/utills/config/get-git-blog-show-path';
import {GithubBlogShowPathTypeEnum} from "@/utills/config/config.type";

interface SiteMapGenerateType {id: number};
export const dynamic = 'force-dynamic';
function decodeUriComponents(url: string) {
    return url.split('/').map(part => encodeURIComponent(part)).join('/');
}

export async function generateSitemaps(){
    const githubBlogShowPaths = await getGithubBlogShowPaths();
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

            if(type === GithubBlogShowPathTypeEnum.CONTENTS){
                const redirectContentType = 'markdown-viewer';
                const contentsResponse = await fetch(APP_END_POINT.repos.contents(path));
                const contentsResult:GithubContentInterface[] = await contentsResponse.json();
                const {status: contentStatus, statusText: contentStatusText} = contentsResponse;

                if(contentStatus !== constants.HTTP_STATUS_OK){
                    throw new Error(`Request failed with status ${contentStatus}: ${contentStatusText}`);
                }

                for(let index=0; contentsResult.length>index; index++){
                    const {sha, type: gitFileType, path: gitFolderPath, name: gitContentName} = contentsResult[index];

                    if(gitFileType === 'dir'){

                        const dirContents = await fetchContentRecursively(gitFolderPath);
                        for(const githubContent of dirContents){
                            if(githubContent.type === 'tree') {
                                const treeFiles = await fetchTreeRecursively(sha);
                                if(treeFiles) {
                                    for(const {path: childrenPath, type: childrenType} of treeFiles){
                                        const encodingPath = decodeUriComponents(`${gitFolderPath}/${childrenPath}`);
                                        result.push({
                                            url: `${SITE_DOMAIN}/${redirectContentType}/${encodingPath}`,
                                            lastModified: new Date(),
                                            changeFrequency: 'yearly' as 'yearly',
                                            priority: 1,
                                        })

                                    }
                                }
                            }
                            else{
                                const encodingPath = decodeUriComponents(`${githubContent.path}`);
                                result.push({
                                    url: `${SITE_DOMAIN}/${redirectContentType}/${encodingPath}`,
                                    lastModified: new Date(),
                                    changeFrequency: 'yearly' as 'yearly',
                                    priority: 1,
                                })
                            }
                        }

                    }else{
                        const encodingPath = decodeUriComponents(`${gitFolderPath}`);
                        result.push({
                            url: `${SITE_DOMAIN}/${redirectContentType}/${encodingPath}`,
                            lastModified: new Date(),
                            changeFrequency: 'yearly' as 'yearly',
                            priority: 1,
                        })
                    }
                }
            }
            if(type === GithubBlogShowPathTypeEnum.REPOSITORY_CONTENTS){
``
                const [repository] = path.split('/')
                const redirectContentType = `repository-markdown-viewer/${repository}`;

                const contentsResponse = await fetch(APP_END_POINT.repos.repositoryContents(path));
                const contentsResult:GithubContentInterface[] = await contentsResponse.json();
                const {status: contentStatus, statusText: contentStatusText} = contentsResponse;
                if(contentStatus !== constants.HTTP_STATUS_OK){
                    throw new Error(`Request failed with status ${contentStatus}: ${contentStatusText}`);
                }
                // console.log("=>(sitemap.ts:119) contentsResult", contentsResult);
                for(let index=0; contentsResult.length>index; index++) {
                    const {sha, type: gitFileType, path: gitFolderPath, name: gitContentName} = contentsResult[index];
                    console.log("=>(sitemap.ts:121) gitFileType", gitFileType);
                    if(gitFileType === 'dir'){

                    }else{
                        const encodingPath = decodeUriComponents(`${gitFolderPath}`);
                        result.push({
                            url: `${SITE_DOMAIN}/${redirectContentType}/${encodingPath}`,
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