'use server'

import { cookies } from 'next/headers'
import {firstVisit} from "@/utills/defined/cookie";
import {ReactNode} from "react";

interface RootLayoutServerActionProps{
    children: ReactNode
}
export async function RootLayoutServerAction({children}:RootLayoutServerActionProps) {

    const cookieStore = cookies();
    if(!cookieStore.has(firstVisit)){
        cookieStore.set(firstVisit, 'true', { maxAge: 3600*24 })
    }
    return (
        <>
            {children}
        </>
    )

}