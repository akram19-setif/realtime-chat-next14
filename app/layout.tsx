import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "./context/ToastContext";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";

import "./globals.css";

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "a best app to real time messaging",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext /> {children}
          <ActiveStatus />
        </AuthContext>
      </body>
    </html>
  );
}
