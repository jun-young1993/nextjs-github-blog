import { NextResponse} from "next/server";
import {constants} from "http2";
import { convertToGithubMarkDown } from "@/utills/blog-fetch";

/**
 * client 에서 사용하는건 api 다시 뽑음.. 토큰 노출됨
 * 
 * @param req 
 * @returns 
 */
export async function POST(req: Request): Promise<Response>
{
    try{
        
        const {text} = await req.json();
	    const {response: markdownContent} = await convertToGithubMarkDown(text);
        
    
        return NextResponse.json({
            content: markdownContent,
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            error: errorMessage
        }, {
            status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
    }

}