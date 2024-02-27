"use client";
import { signOut } from "next-auth/react";
import React from "react";

function page() {
  return (
    <div>
      Users
      <button
        onClick={() => {
          signOut();
        }}
      >
        logout
      </button>
    </div>
  );
}

export default page;
