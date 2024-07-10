import { SITE_DOMAIN } from "@/utills/config/config";
import { userAgent } from "next/server";

export default function robots(){
	return {
		rules: [
			{
				userAgent: '*'
			}
		],
		sitemap: `${SITE_DOMAIN}/sitemap.xml`,
		host: SITE_DOMAIN
	}
}