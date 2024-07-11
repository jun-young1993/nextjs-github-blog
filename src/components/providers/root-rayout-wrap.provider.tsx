'use client'

import {ReactNode} from 'react'
import { Screen } from 'juny-react-style';
import Header from "@/components/structs/global/header";
import Footer from "@/components/structs/global/footer";
import { GithubBlogShowPath } from '@/utills/config/config.type';
interface RootLayoutProps {
    children: ReactNode | any
    githubBLogShowPaths: GithubBlogShowPath[]
}
export default function RootLayoutWrapProvider({
    children,
    githubBLogShowPaths
}:RootLayoutProps) {

    return (
        <Screen
            overflow={"auto"}
            footerGap={"1rem"}
        >
            <Header />
            {children}
            <Footer
                githubBlogShowPaths={githubBLogShowPaths} 
            />
        </Screen>
    )
}
