import { notoSans } from "@/config";
import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@/components/layout/app-layout";
import AppProvider from "./app-provider";


export const metadata: Metadata = {
  title: {
    template: "%s | Pinsplash",
    default: "Beautiful free images and photos | Pinsplash"
  },
  description: "Beautiful free images and photos that you can download and use for all your projects. Better than royalty-free or stock photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased`}
      >
        <AppProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
