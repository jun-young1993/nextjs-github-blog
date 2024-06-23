import {AppConfigType} from "@/utills/config/config.type";
import { getEnv } from "./get-value.config";
import getUserConfig from "./get-user.config";

const GIT_HUB_PERSONAL_ACCESS_TOKEN = getEnv<string>('GIT_HUB_PERSONAL_ACCESS_TOKEN');
const GIT_HUB_API_VERSION = '2022-11-28';
const GIT_HUB_API_URL = 'https://api.github.com';
const SITE_DOMAIN = getUserConfig('domain');
const GIT_HUB_PERSONAL_REPOSITORY_NAME = getUserConfig('git').repository;
const GIT_HUB_PERSONAL_REPOSITORY_OWNER = getUserConfig('git').owner;
export const GOOGLE_AD_SENSE_SCRIPT_SRC = getEnv<null | string>('GOOGLE_AD_SENSE_SCRIPT_SRC',null);
export const GOOGLE_ANALYTICS_G_ID = getEnv<null | string>('GOOGLE_ANALYTICS_G_ID',null);
export const INFOLINKS_AD_PID = getEnv<null | string>('INFOLINKS_AD_PID',null);
export const INFOLINKS_AD_WSID = getEnv<null | string>('INFOLINKS_AD_WSID',null);


export const NEXT_CONFIG:{
    cache: {
        revalidate: number | false
    }
} = {
    cache: {
        revalidate: getUserConfig('nextConfig')?.cache?.revalidate ?? false
    }
}

const APP_CONFIG: AppConfigType = {
    SITE_DOMAIN: SITE_DOMAIN,
    GIT_HUB_API_URL: GIT_HUB_API_URL,
    GIT_HUB_API_VERSION: GIT_HUB_API_VERSION,
    GIT_HUB_PERSONAL_ACCESS_TOKEN: GIT_HUB_PERSONAL_ACCESS_TOKEN,
    GIT_HUB_PERSONAL_REPOSITORY_NAME: GIT_HUB_PERSONAL_REPOSITORY_NAME,
    GIT_HUB_PERSONAL_REPOSITORY_OWNER: GIT_HUB_PERSONAL_REPOSITORY_OWNER,
    GIT_HUB_API_REQUEST_HEADER: {
        'Authorization': `Bearer ${GIT_HUB_PERSONAL_ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': GIT_HUB_API_VERSION
    },
    GIT_HUB_API_END_POINT: {
        repos: {
            contents: (path: string) => {
                return `${GIT_HUB_API_URL}/repos/${GIT_HUB_PERSONAL_REPOSITORY_OWNER}/${GIT_HUB_PERSONAL_REPOSITORY_NAME}/contents/${path}`;
            },
            trees: (treeSha: string) => {
                return `${GIT_HUB_API_URL}/repos/${GIT_HUB_PERSONAL_REPOSITORY_OWNER}/${GIT_HUB_PERSONAL_REPOSITORY_NAME}/git/trees/${treeSha}`;
            },
            readme: (repo: string) => {
                return `${GIT_HUB_API_URL}/repos/${GIT_HUB_PERSONAL_REPOSITORY_OWNER}/${repo}/readme`
            }
        },
        markdown: () => {
            return `${GIT_HUB_API_URL}/markdown`
        },
        user: () => {
            return `${GIT_HUB_API_URL}/user`
        }
    },
    APP_END_POINT: {
        repos: {
            contents: (path: string) => {
                return `${SITE_DOMAIN}/api/github/contents/${path}`;
            },
            trees: (treeSha: string) => {
                return `${SITE_DOMAIN}/api/github/trees/${treeSha}`;
            },
            readme: (repo: string) => {
                return `${SITE_DOMAIN}/api/github/readme/${repo}`
            }
        },
        user: () => {
            return `${SITE_DOMAIN}/api/github/user`
        }
    }

}



export default APP_CONFIG;