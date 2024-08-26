import React from "react";
import SideBar from "../(site)/components/sidebar/SideBar";

export default async function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideBar>
      <div className='h-full'>{children}</div>
    </SideBar>
  );
}
