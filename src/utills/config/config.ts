import {AppConfigType} from "@/utills/config/config.type";
import { getEnv } from "./get-value.config";

const GIT_HUB_PERSONAL_ACCESS_TOKEN = getEnv('GIT_HUB_PERSONAL_ACCESS_TOKEN');
const GIT_HUB_API_VERSION = '2022-11-28';
const APP_CONFIG: AppConfigType = {
    GIT_HUB_API_URL: 'https://api.github.com',
    GIT_HUB_API_VERSION: GIT_HUB_API_VERSION,
    GIT_HUB_PERSONAL_ACCESS_TOKEN: GIT_HUB_PERSONAL_ACCESS_TOKEN,
    GIT_HUB_API_REQUEST_HEADER: {
        'Authorization': `Bearer ${GIT_HUB_PERSONAL_ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': GIT_HUB_API_VERSION
    }
}

export default APP_CONFIG;