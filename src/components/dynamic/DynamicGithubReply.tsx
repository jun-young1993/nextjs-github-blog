
import dynamic from "next/dynamic";



const DynamicGithubReplyComponent = dynamic(() => import("./items/DynamicGithubReply"),{
	ssr: true
});
export default DynamicGithubReplyComponent;
