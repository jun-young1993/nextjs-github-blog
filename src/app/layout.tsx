import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './github-markdown.css';
import "./globals.css";

import RootLayoutWrapProvider from "@/components/providers/root-rayout-wrap.provider";
import StyleThemeProvider from "@/components/providers/style-theme.provider";

import UserDataProvider from "@/components/providers/git.user.data.provider";
import getUserConfig from "@/utills/config/get-user.config";
import {GOOGLE_AD_SENSE_SCRIPT_SRC, GOOGLE_ANALYTICS_G_ID} from "@/utills/config/config";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
import {ReactNode, Suspense} from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: getUserConfig('title'),
  description: getUserConfig('description'),
  openGraph: {
    url: getUserConfig('domain'),
    type: "website",
    title: getUserConfig('title'),
    description: getUserConfig('description'),
    images: getUserConfig('webSiteImage')
  }
};



export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body className={inter.className}>
            <Suspense fallback={<p>Loading feed...</p>}>
              <UserDataProvider>
                <StyleThemeProvider>
                      <RootLayoutWrapProvider>

                            {children}

                      </RootLayoutWrapProvider>
                </StyleThemeProvider>
              </UserDataProvider>
          </Suspense>
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
