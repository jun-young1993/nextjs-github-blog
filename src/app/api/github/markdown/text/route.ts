import { NextResponse} from "next/server";
import APP_CONFIG, {NEXT_CONFIG} from "@/utills/config/config";
import {constants} from "http2";
import getUserConfig from "@/utills/config/get-user.config";
import { convertToGithubMarkDown } from "@/utills/route-fetch";

export async function POST(req: Request): Promise<Response>
{
    try{

        const {text} = await req.json();
	const response = await convertToGithubMarkDown(text);
        
        const {status, statusText } = response;
        if(status !== constants.HTTP_STATUS_OK){
            throw new Error(`Request failed with status ${status}: ${statusText}`);
        }
        const markdownContent = await response.text();

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