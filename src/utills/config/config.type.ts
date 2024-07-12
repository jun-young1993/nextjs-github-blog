import {AlertProps} from "juny-react-style";
import { HeadingToc } from "../markdown/heading";

export interface AppConfigType {
    SITE_DOMAIN: string
    GIT_HUB_API_URL: string
    GIT_HUB_API_VERSION: string
    GIT_HUB_PERSONAL_ACCESS_TOKEN: string | null
    GIT_HUB_PERSONAL_REPOSITORY_NAME: string
    GIT_HUB_PERSONAL_REPOSITORY_OWNER: string
    GIT_HUB_API_REQUEST_HEADER: HeadersInit
    GIT_HUB_API_REQUEST_MARKDOWN_HEADER: HeadersInit
    GIT_HUB_API_REQUEST_TEXT_MATCH_HEADER: HeadersInit,
    GOOGLE_ANALYTICS_SCRIPT_SRC?: string
    GIT_HUB_API_END_POINT: {
        repos: {
            issues: (issueNumber?: number) => string
            comments: (issueNumber: number) => string
            cacheContent: (path: string) => string
            contents: (path: string) => string
            trees: (treeSha: string) => string
            readme: (repo: string) => string,
            images: (path: string) => string
        },
        markdown: () => string
        user: () => string
    }
    APP_END_POINT: {
        repos: {
            contents: (path: string) => string
            trees: (treeSha: string) => string
            readme: (repo: string) => string,
            comments: (issueNumber: number) => string
        },
        user: () => string,
        images: (path: string) => string
        markdown: () => string
        markdownText: () => string
    }
}
export const GithubBlogShowPathTypeEnum  = {
    CONTENTS: 'contents',
    PROFILE:'profile',
    MARKDOWN: 'markdown-viewer',
    ISSUE: 'issue',
    DIRECTORIES: 'directories',
    REPOSITORY_CONTENTS: 'repository-contents',
} as const;
export type GithubBlogShowPathType = typeof GithubBlogShowPathTypeEnum [keyof typeof GithubBlogShowPathTypeEnum];
export enum GithubBlogShowPathSrc {
    GIT_AVATAR = 'GIT_AVATAR'
}

export interface AlertsType extends AlertProps{
    githubBlogShowPath: GithubBlogShowPath
}

export interface GithubBlogShowPath {
    src?: string | GithubBlogShowPathSrc
    type: GithubBlogShowPathType
    title?: string
    path: string
    // alert?: AlertsType[]
    // alertLevel?: AlertProps['level']
}

export interface BlogHeaderMenu extends GithubBlogShowPath {
    title: string
}

export interface GithubBlogConfigType {
    title: string
    dynamicTitle?: boolean
    description: string
    domain: string
    webSiteImage?: string
    tableOfContents?: boolean
    tableOfContentsMaxLevel?: HeadingToc['level']
    headerMenus?:BlogHeaderMenu[]
    mainPage?: GithubBlogShowPath,
    git: {
        repository: string,
        owner: string,
        branch?: string
    },
    githubBlogShowPaths: GithubBlogShowPath[]
    userSitemap?: string[] | []
    ignorePaths?:RegExp[]

    nextConfig?: {
        cache?: {
            revalidate?: number | false
        }
    }

    wikiLink?: string


}