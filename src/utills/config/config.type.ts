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
            readme: (repo: string) => string
        },
        markdown: () => string
        user: () => string
    }
    APP_END_POINT: {
        repos: {
            contents: (path: string) => string
            trees: (treeSha: string) => string
            readme: (repo: string) => string
        }
    }
}
type GithubBlogShowPathType = 'contents' | 'profile';
export enum GithubBlogShowPathSrc {
    GIT_AVATAR = 'GIT_AVATAR'
}
export interface GithubBlogShowPath {
    src?: string | GithubBlogShowPathSrc
    type: GithubBlogShowPathType
    path: string
}

export interface GithubBlogConfigType {
    title: string
    description: string
    domain: string
    mainPage?: GithubBlogShowPath,
    git: {
        repository: string,
        owner: string
    },
    githubBlogShowPaths: GithubBlogShowPath[]
    userSitemap: string[] | []
}