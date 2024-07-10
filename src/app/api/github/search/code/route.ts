import {getGithubUser, NextBlogFetchResponse, searchCode} from "@/utills/blog-fetch";
import { constants } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest)
//: Promise<Response>
{
	try{
	        const text = req.nextUrl.searchParams.get('text');
		if(text){
			const response = await searchCode(text);
			
			return NextResponse.json(response);
		}
		return NextResponse.json({
			items: []
		});
	}catch(error){

		
		return NextResponse.json(error, {
		    status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
		    headers: {
			'Content-Type': 'application/json',
			
		    }
		});
	}
}



