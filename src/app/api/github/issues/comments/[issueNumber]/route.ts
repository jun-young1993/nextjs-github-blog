import {createIssueComments, getIssueComments, NextBlogFetchResponse, revalidate} from "@/utills/blog-fetch";
import TAGS from "@/utills/defined/tags";
import { constants } from "http2";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	params: {
		issueNumber: number
	}
}

export async function POST(req: NextRequest, {params}: Params): Promise<NextResponse>
{

		const {issueNumber} = params;
		const {text } = await req.json();
		const result = await createIssueComments(issueNumber, JSON.stringify({body: text}));
		return NextBlogFetchResponse(result)




}