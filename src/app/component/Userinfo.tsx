"use client";
import Link from "next/link";
import React from "react";
import { authClient } from "../lib/auth-client";

const Userinfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div className="flex gap-5 items-center">
          <div className="dropdown dropdown-end">
            {/* Avatar */}
            <div tabIndex={0} role="button" className="avatar cursor-pointer">
              <div className="w-12 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-lg border border-gray-200"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link href="/add-studio">Add New Studio</Link>
              </li>

              <li>
                <Link href="/my-listings">My Studio Listings</Link>
              </li>

              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
            </ul>
          </div>
          <button
            onClick={handleSignOut}
            className="btn btn-soft btn-secondary"
          >
            Sign-Out
          </button>
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
