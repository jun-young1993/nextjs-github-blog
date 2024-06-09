'use client'

import {ReactNode} from 'react'
import { Screen } from 'juny-react-style';
import Header from "@/components/structs/global/header";
import Footer from "@/components/structs/global/footer";

export default function RootLayoutWrapProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
      <Screen
          footerGap={"1rem"}
      >
        <Header

        />
        {children}
        <Footer />
      </Screen>
  )
}
