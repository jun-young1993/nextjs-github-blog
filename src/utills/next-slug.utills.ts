
export const nextSlugGitContentsPath = (slug: string[] | []): string => {
    return slug ? slug.join('/') : ''
}