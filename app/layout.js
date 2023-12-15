import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interactive Comments Section",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-[#f5f6fa] `}>{children}</body>
    </html>
  );
}
