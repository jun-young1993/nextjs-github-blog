import {AppConfigType} from "@/utills/config/config.type";
import { getEnv } from "./get-value.config";

const GIT_HUB_PERSONAL_ACCESS_TOKEN = getEnv<string>('GIT_HUB_PERSONAL_ACCESS_TOKEN');
const GIT_HUB_API_VERSION = '2022-11-28';
const SITE_DOMAIN = getEnv<string>('SITE_DOMAIN');
const GIT_HUB_PERSONAL_REPOSITORY_NAME = getEnv<string>('GIT_HUB_PERSONAL_REPOSITORY_NAME');
const GIT_HUB_PERSONAL_REPOSITORY_OWNER = getEnv<string>('GIT_HUB_PERSONAL_REPOSITORY_OWNER');
export const GOOGLE_AD_SENSE_SCRIPT_SRC = getEnv<null>('GOOGLE_AD_SENSE_SCRIPT_SRC',null);
export const GOOGLE_ANALYTICS_G_ID = getEnv<null>('GOOGLE_ANALYTICS_G_ID',null);
const APP_CONFIG: AppConfigType = {
    SITE_DOMAIN: SITE_DOMAIN,
    GIT_HUB_API_URL: 'https://api.github.com',
    GIT_HUB_API_VERSION: GIT_HUB_API_VERSION,
    GIT_HUB_PERSONAL_ACCESS_TOKEN: GIT_HUB_PERSONAL_ACCESS_TOKEN,
    GIT_HUB_PERSONAL_REPOSITORY_NAME: GIT_HUB_PERSONAL_REPOSITORY_NAME,
    GIT_HUB_PERSONAL_REPOSITORY_OWNER: GIT_HUB_PERSONAL_REPOSITORY_OWNER,
    GIT_HUB_API_REQUEST_HEADER: {
        'Authorization': `Bearer ${GIT_HUB_PERSONAL_ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': GIT_HUB_API_VERSION
    }
}

export default APP_CONFIG;