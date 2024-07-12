
import { PathsPageParams } from "@/interfaces/root-page.interface";
import {GithubBlogShowPath, GithubBlogShowPathTypeEnum} from "@/utills/config/config.type";
import getUserConfig from "@/utills/config/get-user.config";
import dynamic from "next/dynamic";


const MarkdownViewer = dynamic(() => 
  import('./markdown-viewer/[[...paths]]/page'));
const separator: string | RegExp = '/';
const MainComponent = ({mainPage}: {mainPage : GithubBlogShowPath | undefined}) => {
  const pathsPageParams: PathsPageParams['params'] = {
    paths: mainPage?.path.split(separator) ?? [],
    container:{
      header:{
        title: mainPage?.path.split(separator).at(-1),
        showClose: false,
        showHidden: false,
        showMinimize: false
      }
    }
  }
  switch(mainPage?.type){

    case GithubBlogShowPathTypeEnum.CONTENTS:
      const ContentsComponent = dynamic(() =>
          import('./contents/[[...paths]]/page'));
      return <ContentsComponent params={pathsPageParams} />

    case GithubBlogShowPathTypeEnum.MARKDOWN:
      return <MarkdownViewer params={pathsPageParams} />

    default:
      return null;
  }
}
export default function Home() {
  const userMainPage = getUserConfig('mainPage');


  
  return (
    <>
      <MainComponent mainPage={userMainPage} />
           
    </>
  )
}
