import getUserConfig from "@/utills/config/get-user.config";
import Head from "next/head";

export default function OpenGraph(){
	return (
		<Head>
			<meta property="og:url" content={getUserConfig('domain')} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={getUserConfig('title')} />
			<meta property="og:description" content={getUserConfig('description')} />
			<meta property="og:image" content={getUserConfig('webSiteImage')} />
		</Head>
	)
}