import ContainerLayout, { ContainerLayoutProps } from "@/components/ui/ContainerLayout";
import APP_CONFIG from "@/utills/config/config";
type Params = {
	params: {
		repo: string
		container?: ContainerLayoutProps
	}
}
async function getData(repo: string){
	const {APP_END_POINT} = APP_CONFIG;
	const response = await fetch(APP_END_POINT.repos.readme(repo));
	const result = await response.json();
	return {
		data: result
	}
}
export default async function Page({params}: Params){
	const {repo, container} = params;
	const {data} = await getData(repo);
	const {content} = data;

	return(
		<ContainerLayout
			{...container}
		>
			<article
				dangerouslySetInnerHTML={{__html: content}}>
			</article>
		</ContainerLayout>
	)
}