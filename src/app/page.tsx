import { PathsPageParams } from "@/interfaces/root-page.interface";
import { GithubBlogShowPathTypeEnum } from "@/utills/config/config.type";
import getUserConfig from "@/utills/config/get-user.config";
import dynamic from "next/dynamic";


export default function Home() {
  const userMainPage = getUserConfig('mainPage');
  const pathsPageParams: PathsPageParams['params'] = {
    paths: userMainPage?.path.split('/') ?? [],
    container:{
      header:{
        title: userMainPage?.path.split('/').at(-1),
        showClose: false,
        showHidden: false,
        showMinimize: false
      }
    }
  }
  
  switch(userMainPage?.type){

    case GithubBlogShowPathTypeEnum.CONTENTS:
      const ContentsComponent = dynamic(() => 
        import('./contents/[[...paths]]/page'));
      return <ContentsComponent params={pathsPageParams} />

    case GithubBlogShowPathTypeEnum.MARKDOWN:
      const MarkdownViewer = dynamic(() => 
        import('./markdown-viewer/[[...paths]]/page'));
      return <MarkdownViewer params={pathsPageParams} />

    default:
      return null;
  }
}
