import DynamicALertComponent from "@/components/dynamic/DynamicAlert";
import DynamicALertContainerComponent from "@/components/dynamic/DynamicAlertContainer";
import { PathsPageParams } from "@/interfaces/root-page.interface";
import { GithubBlogShowPathTypeEnum } from "@/utills/config/config.type";
import getUserConfig from "@/utills/config/get-user.config";

import dynamic from "next/dynamic";

const MarkdownViewer = dynamic(() => 
  import('./markdown-viewer/[[...paths]]/page'));
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
  const MainComponent = () => {
    switch(userMainPage?.type){

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
  
  return (
    <>
      <MainComponent />
      
      <DynamicALertComponent
        index={1}
      >
        {/* <MarkdownViewer params={pathsPageParams} /> */}
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </DynamicALertComponent>

        
    </>
  )
}
