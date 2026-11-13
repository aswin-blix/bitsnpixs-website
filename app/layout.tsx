import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { RouteCurtain } from "@/components/layout/RouteCurtain";
import { ScrollThread } from "@/components/layout/ScrollThread";
import { SkipLink } from "@/components/layout/SkipLink";
import { fontVariables } from "@/lib/fonts";
import { rootMetadata } from "@/lib/seo";
import { brand } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = { themeColor: brand.primary };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body>
        <Providers>
          <SkipLink />
          <RouteCurtain />
          <ScrollThread />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
