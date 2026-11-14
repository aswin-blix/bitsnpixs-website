import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { RouteCurtain } from "@/components/layout/RouteCurtain";
import { ScrollThread } from "@/components/layout/ScrollThread";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThreadCursor } from "@/components/layout/ThreadCursor";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd, rootMetadata } from "@/lib/seo";
import { brand, themeInitScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = { themeColor: brand.primary };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is set by the head script before React hydrates, hence suppressHydrationWarning.
    <html lang="en" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>
          <SkipLink />
          <RouteCurtain />
          <ScrollThread />
          <ThreadCursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
