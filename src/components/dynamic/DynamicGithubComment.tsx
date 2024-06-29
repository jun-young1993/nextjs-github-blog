'use client';
import dynamic from "next/dynamic";
const DynamicGithubCommentComponent = dynamic(() => import('./items/DynamicGithubComment'),{
	ssr: true
});
export default DynamicGithubCommentComponent;
