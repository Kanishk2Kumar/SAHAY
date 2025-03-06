"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/UserContext";
import { supabase } from "@/lib/utils/client";
import { Star } from "lucide-react";

const Profile = () => {
  const { user, userDetails, session, userType } = useAuth();
  const router = useRouter();
  const [city, setCity] = useState<string | null>(
    userDetails?.location || null
  );
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(userDetails?.rating || 0);

  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }
  }, [session, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (data.address) {
        return (
          data.address.village ||
          data.address.city ||
          "Unknown City"
        );
      } else {
        throw new Error("City not found in response.");
      }
    } catch (err) {
      console.error("Error reverse geocoding:", err);
      throw err;
    }
  };

  const updateLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const cityName = await reverseGeocode(latitude, longitude);

          const { error } = await supabase
            .from("provider")
            .update({
              location: cityName,
              latitude: latitude,
              longitude: longitude,
            })
            .eq("providerid", user?.id);

          if (error) {
            throw error;
          }

          setCity(cityName);
          alert("Location updated successfully.");
        } catch (err) {
          console.error("Error updating location:", err);
          alert("Failed to update location. Please try again.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to fetch location. Please try again.");
        setLoadingLocation(false);
      }
    );
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-4xl font-bebas-neue">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <Card className="px-48">
        <CardHeader>
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src="/path-to-user-avatar.jpg" alt="User Avatar" />
            <AvatarFallback className="text-4xl">
              {userDetails?.name.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-center mt-4">
            {userDetails?.name || "User"}
          </CardTitle>
          <CardDescription className="text-center text-sm text-gray-500">
            {userDetails?.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Phone Number:</h3>
            <p className="text-gray-700">{userDetails?.phoneNumber}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Location:</h3>
            <p className="text-gray-700">{city || "Location not set"}</p>
          </div>
          {userType === "provider" && (
            <div>
              <h3 className="text-lg font-semibold">Rating:</h3>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Button
              onClick={updateLocation}
              className="w-full "
              disabled={loadingLocation}
            >
              {loadingLocation
                ? "Updating Location..."
                : "Update Current Location"}
            </Button>
            <Button onClick={handleSignOut} className="w-full">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
