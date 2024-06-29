import { createIssueComments, getIssueComments, revalidate } from "@/utills/blog-fetch";
import TAGS from "@/utills/defined/tags";
import { constants } from "http2";
import { NextRequest, NextResponse } from "next/server";

type Params = {
	params: {
		issueNumber: number
	}
}
export async function GET(req:NextRequest, {params}: Params): Promise<NextResponse>
{
	const {issueNumber} = params;
	const {response: result} =await getIssueComments(issueNumber);
	return revalidate(req,{
		body: result,
		tag:TAGS.comment
	})
}
export async function POST(req: NextRequest, {params}: Params): Promise<NextResponse>
{
		const {issueNumber} = params;
		const {text } = await req.json();
		await createIssueComments(issueNumber, JSON.stringify({body: text}));

		return revalidate(req,{
			tag: TAGS.comment
		});
}