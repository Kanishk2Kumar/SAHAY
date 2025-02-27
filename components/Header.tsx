"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { supabase } from "../lib/utils/client";

const Header = () => {
  const [user, setUser] = useState<any>(null); // Store the user object
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Fetch the user session
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    };

    fetchSession();
  }, []);

  // Get the first letter of the user's username or email
  const getInitial = () => {
    if (user?.user_metadata?.username) {
      return user.user_metadata.username.charAt(0).toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div>
      <header className="my-6 flex justify-between gap-5">
        <Link href="/">
          <Image src="/images/Logo.png" alt="logo" width={140} height={60} />
        </Link>
        <ul className="flex flex-row items-center gap-4">
          <li className="relative group">
            <Link href="/all-campaigns">
            <button className="text-base cursor-pointer capitalize text-gray-500">
              All Campaigns
            </button>
            </Link>
          </li>
          <li className="relative group">
            <button className="text-base cursor-pointer capitalize text-gray-500">
              My Campaigns
            </button>
            <ul className="absolute hidden group-hover:block min-w-52 z-[100] border border-gray-500 p-2 rounded shadow-lg">
              <li className="hover:underline">
                <Link href="/my-campaigns/create-campaign">Create Campaign</Link>
              </li>
              <li className="hover:underline mt-2">
                <Link href="/my-campaigns">Open Requests</Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
          <Link href="/impact-score">
            <button className="text-base cursor-pointer capitalize text-gray-500">
              Impact Score
            </button>
          </Link>
          </li><li className="relative group">
            <Link href="/tax-benifits">
            <button className="text-base cursor-pointer capitalize text-gray-500">
              Tax Benifits
            </button>
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            {isSignedIn ? (
              <Link href="/profile">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/path-to-user-avatar.jpg" alt="User Avatar" />
                  <AvatarFallback>{getInitial()}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            )}
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;