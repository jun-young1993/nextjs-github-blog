import { GithubBlogShowPathSrc } from "@/utills/config/config.type";
import GithubBlogConfig from "@/utills/config/github-blog.config";
const userConfig = GithubBlogConfig({
    // site domain
    domain: 'http://localhost:3000',
    // domain: 'https://nextjs-github-blog.vercel.app',

    // site metadata
    title: 'nextjs-github-blog',
    dynamicTitle: true,
    description: 'Generated by create next app',
    webSiteImage: 'https://avatars.githubusercontent.com/u/102360897?v=4',

    git: {
        repository: 'Obsidian',
        owner: 'jun-young1993'
    },
    headerMenus: [{
        type: 'markdown-viewer',
        path: '/',
        title: 'About Me'
    }],
    mainPage: {
        type: 'markdown-viewer',
        path: 'blog/docs/nextjs-github-blog/readme.md',
    },
    githubBlogShowPaths:[{
        type: 'profile',
        src: GithubBlogShowPathSrc.GIT_AVATAR,
        path: 'jun-young1993' // git repository name
    },{
        type: 'contents',
        path: 'blog/docs'
    },{
        type: 'issue',
        path: '/',
        title: 'Issue'
    }],
    userSitemap: [
        'ads.txt'
    ],
    ignorePaths: [
        /^Gemiso(\/.*)?$/,     // 'Private' 또는 'Private/*'
        /^(\/.*)Private(\/.*)?$/,     // 'Private' 또는 'Private/*'
    ],

    nextConfig: {
        cache: {
            revalidate : 1
        }
    },


    // We use wikiLinks such as [[path]] and ![[test.png]]. Please enter the repository's path.
    wikiLink: 'images',

    // Whether to use table of contents. The default value is true
    tableOfContents: true,
    // This specifies the heading tag number as a string for the table of contents.
    // The default value is up to h3, and it can be spcified up to '6'
    tableOfContentsMaxLevel: '3'
});
export default userConfig;