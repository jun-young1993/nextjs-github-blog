import { getContents } from "../blog-fetch";
import { shouldIgnorePath } from "../next-slug.utills";
import { GithubBlogShowPathTypeEnum } from "./config.type";
import getUserConfig from "./get-user.config";

async function getGithubBlogShowPaths(){
	const result = getUserConfig('githubBlogShowPaths');
	
	for(const pathConfig of result){
		if(pathConfig.type === GithubBlogShowPathTypeEnum.DIRECTORIES){
			const {response: directoriePaths} = await getContents(pathConfig.path);
			
			
			for(const directoriePath of directoriePaths){
				if(directoriePath.type === 'dir'){
					if(!shouldIgnorePath(directoriePath.path)){
						result.push({
							type: 'contents',
							path: directoriePath.path,
							title: directoriePath.name
						});
					}
				}
				
			}
			
			
			
			continue;
		}
	}
	return result;
}
export default getGithubBlogShowPaths;