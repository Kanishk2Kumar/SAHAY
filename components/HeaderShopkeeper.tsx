"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { supabase } from "../lib/utils/client";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

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
    setHasMounted(true);
  }, []);

  const getInitial = () => {
    if (user?.user_metadata?.username) {
      return user.user_metadata.username.charAt(0).toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <header className="my-6 flex justify-between gap-5">
        <Link href="/">
          <Image src="/images/Logo.png" alt="logo" width={140} height={60} />
        </Link>
        <ul className="flex flex-row items-center gap-4">
          <li className="relative group">
            <Link href="/shopkeeper/accepted-requests">
              <button className="text-base cursor-pointer capitalize text-gray-500">
                Accepted Requests
              </button>
            </Link>
          </li>
          <li className="relative group">
            <Link href="/shopkeeper/nearby-requests">
              <button className="text-base cursor-pointer capitalize text-gray-500">
                Nearby Requests
              </button>
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            {isSignedIn ? (
              <Link href="/shopkeeper/profile">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="/path-to-user-avatar.jpg"
                    alt="User Avatar"
                  />
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