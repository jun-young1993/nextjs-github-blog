
export const nextSlugGitContentsPath = (slug?: string[] | []): string => {
    return slug ? slug.join('/') : ''
}

export const nextSlugGeneratePaths = (slug?: string[]): string[] | []=>  {
    return slug
    ? slug.reduce<string[]>((acc, current, index) => {
        if (index === 0) {
            acc.push(current);
        } else {
            acc.push(`${acc[index - 1]}/${current}`);
        }
        return acc;
    }, [])
    : []
}