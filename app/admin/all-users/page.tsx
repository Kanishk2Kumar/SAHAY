"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/client";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface Provider {
  id: string;
  name: string;
  email: string;
  phonenumber: string;
  rating: number;
}

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: usersData, error: usersError } = await supabase
          .from("user")
          .select("id, name, email, phoneNumber");
        const { data: providersData, error: providersError } = await supabase
          .from("provider")
          .select("id, name, email, phonenumber, rating");

        if (usersError) throw usersError;
        if (providersError) throw providersError;

        setUsers(usersData || []);
        setProviders(providersData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id: string, type: "user" | "provider") => {
    try {
      if (type === "user") {
        const { error: dbError } = await supabase.from("user").delete().eq("id", id);
        if (dbError) throw dbError;

        const { error: authError } = await supabase.auth.admin.deleteUser(id);
        if (authError) throw authError;

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        const { error: dbError } = await supabase.from("provider").delete().eq("id", id);
        if (dbError) throw dbError;

        setProviders((prevProviders) => prevProviders.filter((provider) => provider.id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full border border-gray-200 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phoneNumber}</td>
              <td className="border p-2">
                <Button variant="destructive" onClick={() => handleDeleteUser(user.id, "user")}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-2xl font-bold mb-4">All Providers</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, index) => (
            <tr key={provider.id} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{provider.name}</td>
              <td className="border p-2">{provider.email}</td>
              <td className="border p-2">{provider.phonenumber}</td>
              <td className="border p-2">{provider.rating}</td>
              <td className="border p-2">
                <Button variant="destructive" onClick={() => handleDeleteUser(provider.id, "provider")}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
