import GithubBlogConfig from "@/utills/config/github-blog.config";
const userConfig = GithubBlogConfig({
    domain: 'localhost:3000',
    githubBlogShowPaths:[{
        path: 'blog'
    }]
});
export default userConfig;