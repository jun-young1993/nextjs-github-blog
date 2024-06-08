export interface AppConfigType {
    SITE_DOMAIN: string
    GIT_HUB_API_URL: string
    GIT_HUB_API_VERSION: string
    GIT_HUB_PERSONAL_ACCESS_TOKEN: string
    GIT_HUB_PERSONAL_REPOSITORY_NAME: string
    GIT_HUB_PERSONAL_REPOSITORY_OWNER: string
    GIT_HUB_API_REQUEST_HEADER: {[key: string]: string}
}

interface GithubBlogShowPath {
    path: string
}

export interface GithubBlogConfigType {
    domain: string
    githubBlogShowPaths: GithubBlogShowPath[]
}