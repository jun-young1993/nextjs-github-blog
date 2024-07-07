import getUserConfig from "@/utills/config/get-user.config";
import {getContents} from "@/utills/blog-fetch";

const footerMenu = async () => {
    const blogShowPaths = getUserConfig('githubBlogShowPaths');
    try{
        const folderPaths = getUserConfig('folderPaths');
        if(folderPaths){
            for(const folderPath of folderPaths){
                const {response:contents} = await getContents('')
console.log("=>(footer-meus.ts:12) contents", contents);
                for(const content of contents){
                    if(content.type === 'dir'){
                        blogShowPaths.push({
                            type: 'contents',
                            path: content.path,
                        })
                    }
                }
            }
        }
    }catch(error){

    }


    return blogShowPaths;
}
export default footerMenu;