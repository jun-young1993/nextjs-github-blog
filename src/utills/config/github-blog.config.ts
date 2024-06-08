import {GithubBlogConfigType} from "@/utills/config/config.type";
import userConfig from "../../../github.blog.config";
const GithubBlogConfig = (config: GithubBlogConfigType): GithubBlogConfigType => {
    return config;
}
export const getUserConfig = <K extends keyof GithubBlogConfigType>(key: K): GithubBlogConfigType[K]=> {
    return userConfig[key];
}

export default GithubBlogConfig;