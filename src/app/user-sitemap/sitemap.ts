import { MetadataRoute } from 'next'
import APP_CONFIG from "@/utills/config/config";
import getUserConfig from "@/utills/config/get-user.config";


export default function sitemap_(): MetadataRoute.Sitemap {
    const {SITE_DOMAIN} = APP_CONFIG;
    const userSitemap = getUserConfig('userSitemap');
    const result = userSitemap.map((sitemap) => {
        return {
             url: `${SITE_DOMAIN}/${sitemap}`,
             lastModified: new Date(),
             changeFrequency: 'yearly',
             priority: 1,
        }
    });


    return result;
}