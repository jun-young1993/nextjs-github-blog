import {GithubBlogConfigType} from "@/utills/config/config.type";
import userConfig from "../../../github.blog.config";

const getUserConfig = <K extends keyof GithubBlogConfigType>(key: K, defaultValue?: K): GithubBlogConfigType[K]=> {
    return userConfig[key] ?? defaultValue;

}
export default getUserConfig;