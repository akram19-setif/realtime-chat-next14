import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


import ToasterContext from "./context/ToastContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "a best app to real time messaging",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ToasterContext /> {children}
      </body>
    </html>
  );
}
