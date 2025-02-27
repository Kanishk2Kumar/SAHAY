"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/utils/client";

interface UserContextType {
  user: User | null;
  userDetails: any | null;
  session: any | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);

  useEffect(() => {
    const getUserDetails = async (userId: string) => {
      let { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("userid", userId)
        .single();

      if (!data) {
        let { data: providerData, error: providerError } = await supabase
          .from("provider")
          .select("*")
          .eq("providerid", userId)
          .single();

        if (providerData) {
          setUserDetails(providerData);
        } else {
          setUser(null);
          setUserDetails(null);
        }
      } else {
        setUserDetails(data);
      }
    };

    const getCurrentSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setSession(session);
        getUserDetails(session.user.id);
      } else {
        setUser(null);
        setUserDetails(null);
        setSession(null);
      }
    };

    getCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        if (session?.user) {
          setUser(session.user);
          setSession(session);
          getUserDetails(session.user.id);
        } else {
          setUser(null);
          setUserDetails(null);
          setSession(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, userDetails, session }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};