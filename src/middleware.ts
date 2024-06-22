import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {shouldIgnorePath} from "@/utills/next-slug.utills";

export function middleware(request: NextRequest){

    const ignorePath = shouldIgnorePath(request.nextUrl.pathname);
    if(ignorePath){
        return new NextResponse(`should ignore path: ${request.nextUrl.pathname}`, { status: 401 });
    }
    return NextResponse.next();



}

export const config = {

}