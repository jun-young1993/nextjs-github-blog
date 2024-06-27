import { getGithubUser } from "@/utills/blog-fetch";
import { constants } from "http2";
import { NextResponse } from "next/server";

export async function GET(){
	const response = await getGithubUser();
		
	return NextResponse.json(response,{
		status: response.status,
		headers: {
			'Content-Type': 'application/json',
			
		}
	})
}

