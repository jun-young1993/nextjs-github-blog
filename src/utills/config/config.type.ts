export interface AppConfigType {
    SITE_DOMAIN: string
    GIT_HUB_API_URL: string
    GIT_HUB_API_VERSION: string
    GIT_HUB_PERSONAL_ACCESS_TOKEN: string
    GIT_HUB_PERSONAL_REPOSITORY_NAME: string
    GIT_HUB_PERSONAL_REPOSITORY_OWNER: string
    GIT_HUB_API_REQUEST_HEADER: {[key: string]: string}
    GOOGLE_ANALYTICS_SCRIPT_SRC?: string
}

interface GithubBlogShowPath {
    path: string
}

export interface GithubBlogConfigType {
    title: string
    description: string
    domain: string
    githubBlogShowPaths: GithubBlogShowPath[]
    userSitemap: string[] | []
}