import { GithubUserInterface } from "@/interfaces/github-user.interface";
import APP_CONFIG from "@/utills/config/config";
import { constants } from "http2";
import { NextResponse } from "next/server";


export async function GET(): Promise<Response>{
	try{
		const {GIT_HUB_API_END_POINT} = APP_CONFIG;

		const response = await fetch(GIT_HUB_API_END_POINT.user(),{
			headers: APP_CONFIG.GIT_HUB_API_REQUEST_HEADER
		});
		const {status, statusText } = response;
		if(status !== constants.HTTP_STATUS_OK){
			throw new Error(`Request failed with status ${status}: ${statusText}`);
		}
		const result:GithubUserInterface = await response.json();
		return NextResponse.json(result,{
			status: status
		})
	}catch(error){
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json({
			error: errorMessage
		}, {
			status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
		});
	}
}

