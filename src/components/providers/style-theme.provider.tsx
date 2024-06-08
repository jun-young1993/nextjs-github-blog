'use client';
import ThemeProvider from "@/components/providers/theme.provider";
import {ReactNode} from "react";
import {StyleThemeContextProvider} from 'juny-react-style';

export default function StyleThemeProvider({children}:{children: ReactNode}){
    return (
        <StyleThemeContextProvider>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </StyleThemeContextProvider>
    )
}