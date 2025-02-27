"use client"
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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [location, setLocation] = useState("");

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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="max-w-6xl mx-auto p-1 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-ibm-plex-sans">
            Welcome Abroad
          </CardTitle>
          <CardDescription>
            Create an Account to Create Campaigns and Donate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Kanishk Kumar" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <select id="gender" className="border rounded-md p-2" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="1234567890" required />
              </div>
              <div className="col-span-2 grid gap-2">
                <Label>Location</Label>
                <Button type="button" onClick={fetchLocation} className="w-full">
                  Fetch Current Location
                </Button>
                {location && <p className="text-sm text-gray-600">{location}</p>}
              </div>
              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="text-center text-sm mt-4">
              Want to be a Provider? Sign up as {" "}
              <a href="/sign-up-Provider" className="underline underline-offset-4">
                Provider
              </a>
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
