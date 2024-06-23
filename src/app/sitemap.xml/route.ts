import getUserConfig from "@/utills/config/get-user.config";
import APP_CONFIG from "@/utills/config/config";
import { generateSitemaps } from "../sitemap/sitemap";

const generateSitemapLink = (url: string) =>
    `<sitemap><loc>${url}</loc></sitemap>`;

export async function GET(){
    const sitemaps = await generateSitemaps();

    const {SITE_DOMAIN} = APP_CONFIG;
    const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps.map(({id}) => {
            return generateSitemapLink(`${SITE_DOMAIN}/sitemap/sitemap.xml/${id}`)
        })}
    </sitemapindex>`;
    return new Response(sitemapIndexXML, {
        headers: { 'Content-Type': 'text/xml' },
    });

}