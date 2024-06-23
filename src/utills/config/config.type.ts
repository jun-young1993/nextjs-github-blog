import {AlertProps} from "juny-react-style";

export interface AppConfigType {
    SITE_DOMAIN: string
    GIT_HUB_API_URL: string
    GIT_HUB_API_VERSION: string
    GIT_HUB_PERSONAL_ACCESS_TOKEN: string
    GIT_HUB_PERSONAL_REPOSITORY_NAME: string
    GIT_HUB_PERSONAL_REPOSITORY_OWNER: string
    GIT_HUB_API_REQUEST_HEADER: {[key: string]: string}
    GOOGLE_ANALYTICS_SCRIPT_SRC?: string
    GIT_HUB_API_END_POINT: {
        repos: {
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
            readme: (repo: string) => string
        },
        user: () => string,
        images: (path: string) => string

    }
}
export const GithubBlogShowPathTypeEnum  = {
    CONTENTS: 'contents',
    PROFILE:'profile',
    MARKDOWN: 'markdown-viewer'
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
    path: string
    alert?: AlertsType[]
    alertLevel?: AlertProps['level']
}

export interface BlogHeaderMenu extends GithubBlogShowPath {
    title: string
}

export interface GithubBlogConfigType {
    title: string
    description: string
    domain: string
    webSiteImage?: string
    headerMenus?:BlogHeaderMenu[]
    mainPage?: GithubBlogShowPath,
    git: {
        repository: string,
        owner: string,
        branch?: string
    },
    githubBlogShowPaths: GithubBlogShowPath[]
    userSitemap: string[] | []
    ignorePaths?:RegExp[]

    nextConfig?: {
        cache?: {
            revalidate?: number | false
        }
    }

    wikiLink?: string


}