import { GithubBlogShowPath, GithubBlogShowPathType, GithubBlogShowPathTypeEnum } from "@/utills/config/config.type";
import getUserConfig from "@/utills/config/get-user.config";
import dynamic from "next/dynamic";


export default function Home() {
  const userMainPage = getUserConfig('mainPage');
  switch(userMainPage?.type){

    case GithubBlogShowPathTypeEnum.CONTENTS:
      const ContentsComponent = dynamic(() => 
        import('./contents/[[...paths]]/page'));
      return <ContentsComponent params={{
        paths: userMainPage.path.split('/'),
   
        
      }} />

    case GithubBlogShowPathTypeEnum.MARKDOWN:
      const MarkdownViewer = dynamic(() => 
        import('./markdown-viewer/[[...paths]]/page'));
      return <MarkdownViewer params={{
        paths: userMainPage.path.split('/'),
        container:{
          header:{
            showClose: false,
            showHidden: false,
            showMinimize: false
          }
        }
      }} />

    default:
      return null;
  }
}
