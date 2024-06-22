import ContainerLayout, { ContainerLayoutProps } from "@/components/ui/ContainerLayout";
import APP_CONFIG from "@/utills/config/config";
type Params = {
	params: {
		path: string
		container?: ContainerLayoutProps
	}
}

async function getData(path: string){
	const {APP_END_POINT} = APP_CONFIG;

	const response = await fetch(APP_END_POINT.repos.readme(path));
	const result = await response.json();
	return {
		data: result
	}
}
export default async function Page({params}: Params){
	const {path, container} = params;
	const {data} = await getData(path);
	const {content} = data;

	return(
		<ContainerLayout
			{...container}
		>
			<article
				dangerouslySetInnerHTML={{__html: content ?? 'undefined'}}
			>
			</article>
		</ContainerLayout>
	)
}