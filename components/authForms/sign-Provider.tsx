"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/utils/client"; // Import supabase from client.ts
import { redirect } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
          );
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation("Unable to fetch location");
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: Sign up the user using Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      // Step 2: Get the authenticated user's ID
      const user = authData.user;
      if (!user) {
        throw new Error("User registration failed. Please try again.");
      }

      // Step 3: Insert additional user details into the `provider` table
      const { data: providerData, error: providerError } = await supabase
        .from("provider")
        .insert([
          {
            providerid: user.id, // Link to the authenticated user's ID
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            phonenumber: formData.phone,
            location: location,
            Type: formData.type,
            rating: 5, // Default rating
          },
        ]);

      if (providerError) {
        throw providerError;
      }

      alert("Sign-up successful! You are now registered as a provider.");
      redirect("/shopkeeper");
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="max-w-6xl mx-auto p-2 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-ibm-plex-sans">
            Welcome Abroad
          </CardTitle>
          <CardDescription>
            Create an Account and work as a Provider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Kanishk Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="border rounded-md p-2"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="border rounded-md p-2"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Shopkeepers">Shopkeepers</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Doctors">Doctors</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Caretaker">Caretaker</option>
                  <option value="Cook">Cook</option>
                </select>
              </div>
              <div className="col-span-2 grid gap-2">
                <Label>Location</Label>
                <Button type="button" onClick={fetchLocation} className="w-full">
                  Fetch Current Location
                </Button>
                {location && <p className="text-sm text-gray-600">{location}</p>}
              </div>
              <div className="col-span-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="text-center text-sm mt-4">
              Want to be a Donator? Sign up as{" "}
              <a href="/sign-up-User" className="underline underline-offset-4">
                User
              </a>{" "}
            </div>
            <div className="text-center text-sm mt-1">
              Already have an Account?{" "}
              <a href="/sign-in" className="underline underline-offset-4">
                Sign-In
              </a>{" "}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}