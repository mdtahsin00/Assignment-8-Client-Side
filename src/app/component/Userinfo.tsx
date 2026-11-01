"use client"
import Link from "next/link";
import React from "react";
import { authClient } from "../lib/auth-client";

const Userinfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async()=>{
    await authClient.signOut();
  }

  return (
    <div>
      {user ? (
        <div className="flex gap-5 items-center">
          <div className="avatar">
            <div className="w-15 rounded-full">
              <img
                alt="Tailwind-CSS-Avatar-component"
                src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
              />
            </div>
          </div>
          <button onClick={handleSignOut} className="btn btn-soft btn-secondary">Sign-Out</button>
        </div>
      ) : (
        <div className="flex gap-5">
          <Link href="/signUp">
            <button className="btn btn-soft btn-primary">Sign-Up</button>
          </Link>

          <Link href="/signIn">
            <button className="btn btn-soft btn-secondary">Sign-In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
