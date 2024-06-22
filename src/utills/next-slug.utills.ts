import getUserConfig from "@/utills/config/get-user.config";

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

export const shouldIgnorePath = (path: string) => {
    const ignorePaths = getUserConfig('ignorePaths');
    if(ignorePaths){
        return ignorePaths.some(regex => regex.test(path));
    }

};