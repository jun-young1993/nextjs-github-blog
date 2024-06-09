import {MacMenuBar, MacMenuBarItem} from 'juny-react-style';
import {useRouter} from "next/navigation";
import getUserConfig from "@/utills/config/get-user.config";

function Footer() {
    const githubBlogShowPaths = getUserConfig('githubBlogShowPaths');
    const router = useRouter();
    return (
        <MacMenuBar
        >
            {githubBlogShowPaths.map(({path,index}) => {
                const title = path.split('/').at(-1);
                return (
                    <MacMenuBarItem
                        key={path+index}
                        onClick={() => {
                            router.push(`/contents/${path}`)
                        }}
                        // src={"https://avatars.githubusercontent.com/u/102360897?v=4"}
                        title={title}
                    />
                )
            })}

        </MacMenuBar>
    )
}
export default Footer;