import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "환전 애플리케이션",
  description: "실시간 환율을 적용하여 자산을 환전하는 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <main className="w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
