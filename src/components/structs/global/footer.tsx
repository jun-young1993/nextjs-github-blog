'use client'
import {MacMenuBar, MacMenuBarItem} from 'juny-react-style';
import {useRouter} from "next/navigation";
import getUserConfig from "@/utills/config/get-user.config";
import { useGithubUser } from '@/components/providers/git.user.data.provider';
import { GithubBlogShowPath, GithubBlogShowPathSrc } from '@/utills/config/config.type';
import {footerId} from "@/utills/defined/dom-id";

interface FooterProps {
    githubBlogShowPaths: GithubBlogShowPath[]
}
function Footer({githubBlogShowPaths}: FooterProps) {
    
    
    
    const router = useRouter();
    const {userData} = useGithubUser();
    const srcHandler = (src: string | undefined): string | undefined => {
        if(src === GithubBlogShowPathSrc.GIT_AVATAR){
            return userData?.avatar_url;
        }
        return src as string | undefined;
    }
    return (
        <div
            id={footerId}
            style={{
                width: "100%"
            }}
        >
        <MacMenuBar
            
        >
            {githubBlogShowPaths && githubBlogShowPaths.map(({path, type, src, title: configTitle}, index) => {
                const title  = configTitle ?? path.split('/').at(-1) as string | undefined;

                return (
                    <MacMenuBarItem
                        src={srcHandler(src)}
                        key={path+index}
                        onClick={() => {
                            router.push(`/${type}/${path}`)
                        }}
                        title={title || 'no name'}
                    />
                )
            })}

        </MacMenuBar>
        </div>
    )
}
export default Footer;