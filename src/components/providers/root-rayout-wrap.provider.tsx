'use client'

import {ReactNode, useEffect, useRef, useState} from 'react'
import { usePathname } from 'next/navigation'
import {StyleThemeProvider, Screen } from 'juny-react-style';
import Header from "@/components/structs/global/header";
import Footer from "@/components/structs/global/footer";

export default function RootLayoutWrapProvider({
  children,
}: {
  children: ReactNode
}) {
  const [ theme, setTheme ] = useState<'dark' | 'light'>('light');
  
  let isSystemDark = useRef(false);
  const pathname = usePathname();
  const isRoot: boolean = pathname === '/';
  useEffect(() => {

    if(typeof window === 'object'){
      isSystemDark.current = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isSystemDark.current ? 'dark' : 'light');
    }

  }, [setTheme])
  
  return (
    <StyleThemeProvider
      mode={theme}
    >
      <Screen
          footerGap={"1rem"}
      >
        <Header
          initMode={theme === 'dark' ? true : false}
          onClick={(mode) => {
            if(mode === 'dark' || mode === 'light'){
              setTheme(mode);
            }
          }}
        />
        <main>{children}</main>
        <Footer />
      </Screen>
  </StyleThemeProvider>
  )
}
