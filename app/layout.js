import { Cormorant_Garamond, Noto_Sans_KR, Song_Myung } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

const songMyung = Song_Myung({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-kr",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display-en",
});

export const metadata = {
  title: "NAM YUL | Actor Portfolio",
  description: "Less Interface, More Actor. 배우 남율의 작품 중심 포트폴리오.",
  openGraph: {
    title: "NAM YUL | Actor Portfolio",
    description: "배우 남율의 작품, 사진, 연락처를 담은 공식 포트폴리오 웹사이트",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${songMyung.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
