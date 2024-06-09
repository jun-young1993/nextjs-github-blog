import { MetadataRoute } from 'next'
import APP_CONFIG from "@/utills/config/config";
import getUserConfig from "@/utills/config/get-user.config";
const generateSitemapLink = (url: string) =>
    `<sitemap><loc>${url}</loc></sitemap>`;

export default function sitemap_(): MetadataRoute.Sitemap {
    const {SITE_DOMAIN} = APP_CONFIG;
    const result = [
        generateSitemapLink('https://test')
    ]
    // const githubBlogShowPaths = getUserConfig('githubBlogShowPaths');
    // const addSitemap = getUserConfig('addSitemap');
    // console.log("=>(sitemap_.ts:9) githubBlogShowPaths", githubBlogShowPaths);
    // const result = [];
    // addSitemap.forEach((addSite) => {
    //     result.push({
    //         url: `${SITE_DOMAIN}/${addSite}`,
    //         lastModified: new Date(),
    //         changeFrequency: 'yearly',
    //         priority: 1,
    //     })
    // })

    return result;
}