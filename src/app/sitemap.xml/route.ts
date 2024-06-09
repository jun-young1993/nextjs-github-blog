import getUserConfig from "@/utills/config/get-user.config";
import APP_CONFIG from "@/utills/config/config";

const generateSitemapLink = (url: string) =>
    `<sitemap><loc>${url}</loc></sitemap>`;

export async function GET(){
    const addSitemap = getUserConfig('userSitemap')
    const {SITE_DOMAIN} = APP_CONFIG;
    const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${(addSitemap && addSitemap.length > 0) &&
            generateSitemapLink(`${SITE_DOMAIN}/user-sitemap/sitemap.xml`)
        }
    </sitemapindex>`;
    return new Response(sitemapIndexXML, {
        headers: { 'Content-Type': 'text/xml' },
    });

}