import APP_CONFIG from "@/utills/config/config";
import { generateSitemaps } from "../sitemap/sitemap";

const generateSitemapLink = (url: string) =>
    `<sitemap><loc>${url}</loc></sitemap>`;

export async function GET(){
    const sitemaps = await generateSitemaps();
  
    // console.log(sitemaps.map(({id}) => {
    //     return generateSitemapLink(process.env.NODE_ENV === 'development' ? `${SITE_DOMAIN}/sitemap/sitemap.xml/${id}`:`${SITE_DOMAIN}/sitemap/sitemap/${id}.xml`)
    // }));
    const {SITE_DOMAIN} = APP_CONFIG;
    const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps.map(({id}) => {
            return generateSitemapLink(process.env.NODE_ENV === 'development' ? `${SITE_DOMAIN}/sitemap/sitemap.xml/${id}`:`${SITE_DOMAIN}/sitemap/sitemap/${id}.xml`)
        }).join('')}
    </sitemapindex>`;
    return new Response(sitemapIndexXML, {
        headers: { 'Content-Type': 'text/xml' },
    });

}