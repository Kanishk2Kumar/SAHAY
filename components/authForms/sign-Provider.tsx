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
import { supabase } from "@/lib/utils/client";
import { useRouter } from "next/navigation";

export function SignInProviderForm({
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
  const router = useRouter();

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
          setLocation(loc);
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
      return;
    }

    await supabase.from("provider").insert({
      providerid: data.user?.id,
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      phoneNumber: formData.phone,
      Type: formData.type,
      rating: 5,
    });

    setLoading(false);
    router.push("/shopkeeper");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="max-w-6xl mx-auto p-1 shadow-lg">
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
                <Input id="name" type="text" placeholder="Kanishk Kumar" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <select id="gender" className="border rounded-md p-2" required onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="1234567890" required onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <select id="type" className="border rounded-md p-2" required onChange={handleChange}>
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}