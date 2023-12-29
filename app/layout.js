"use client";

import { Rubik } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../context/AuthContext";
import { metadata } from "../util/metadata";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={metadata.description} />
            <title>{metadata.title}</title>
          </head>
          <body className={`${rubik.className} bg-[#f5f6fa] `}>{children}</body>
        </html>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
