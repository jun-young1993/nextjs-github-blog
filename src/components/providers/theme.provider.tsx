'use client';
import {ReactNode, useEffect, useRef} from "react";
import {StyleThemeProvider, useTheme} from "juny-react-style";

export default function ThemeProvider({
  children
}:{
    children: ReactNode
}){
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        if(typeof window === 'object'){
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(isDarkMode ? 'dark' : 'light');
        }
    }, [setTheme])

    return (
        <StyleThemeProvider
            mode={theme}
        >
            {children}
        </StyleThemeProvider>
    )
}