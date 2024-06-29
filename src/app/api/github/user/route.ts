import { getGithubUser } from "@/utills/blog-fetch";
import { constants } from "http2";
import { NextResponse } from "next/server";

export async function GET(){
	try{
		const response = await getGithubUser();
		
		return NextResponse.json(response,{
			status: response.status,
			headers: {
				'Content-Type': 'application/json',
				
			}
		})
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



