import { PathsPageParams } from "@/interfaces/root-page.interface";
import dynamic from "next/dynamic";

interface Params extends PathsPageParams{

}

const MarkdownViewer = dynamic(
	() => import('../../contents/[[...paths]]/page'),
	{
		ssr: true
	}
)

export default async function Page({params}: Params) {
	const [repository, ...paths] = params.paths;
	
	return (
		<MarkdownViewer 
			params={{
				paths: paths,
				repository: repository
			}}
		/>
	)
}