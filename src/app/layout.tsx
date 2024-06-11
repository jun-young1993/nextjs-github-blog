import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './github-markdown.css';
import "./globals.css";

import RootLayoutWrapProvider from "@/components/providers/root-rayout-wrap.provider";
import StyleThemeProvider from "@/components/providers/style-theme.provider";
import {ReactNode} from "react";
import UserDataProvider from "@/components/providers/git.user.data.provider";
import getUserConfig from "@/utills/config/get-user.config";
import {GOOGLE_AD_SENSE_SCRIPT_SRC, GOOGLE_ANALYTICS_G_ID} from "@/utills/config/config";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: getUserConfig('title'),
  description: getUserConfig('description'),
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <UserDataProvider>
            <StyleThemeProvider>
              <RootLayoutWrapProvider>
                {children}
              </RootLayoutWrapProvider>
            </StyleThemeProvider>
          </UserDataProvider>
      </body>
      {GOOGLE_ANALYTICS_G_ID &&
          <GoogleAnalytics gaId={GOOGLE_ANALYTICS_G_ID}/>}
      {GOOGLE_AD_SENSE_SCRIPT_SRC &&
          <Script async
                  src={GOOGLE_AD_SENSE_SCRIPT_SRC}
                  crossOrigin="anonymous" />
      }
    </html>
  );
}
