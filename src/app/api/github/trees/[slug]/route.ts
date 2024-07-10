import { GithubUserInterface } from "@/interfaces/github-user.interface";
import APP_CONFIG from "@/utills/config/config";
import { constants } from "http2";
import { NextResponse } from "next/server";
import {fetchTreeRecursively} from "@/utills/blog-fetch";
type Params = {
	params: {
		slug: string
	}
}

export async function GET(request: Request, {params}: Params): Promise<Response>{


	try{
		const {
			GIT_HUB_API_REQUEST_HEADER,
			GIT_HUB_API_END_POINT
		    } = APP_CONFIG;
		const url = GIT_HUB_API_END_POINT.repos.trees(params.slug)+'?recursive=1';
		const response = await fetch(url,{
			headers: GIT_HUB_API_REQUEST_HEADER,
			cache: 'no-store'
		});
		const test = await fetchTreeRecursively(params.slug)


		const {status, statusText } = response;


		if(status !== constants.HTTP_STATUS_OK){
			throw new Error(`Request failed with status ${status}: ${statusText}`);
		}
		const result:GithubUserInterface = await response.json();


		return NextResponse.json(result,{
			status: status,
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

