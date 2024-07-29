import {GithubBlogConfigType} from "@/utills/config/config.type";
import userConfig from "@root/github.blog.config";

const getUserConfig = <K extends keyof GithubBlogConfigType>(key: K): GithubBlogConfigType[K]=> {
    return userConfig[key];
}

export default getUserConfig;