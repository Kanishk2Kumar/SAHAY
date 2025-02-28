"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/utils/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Campaign {
  id: string;
  title: string;
  city: string;
  organization: string;
  location: string; // Assuming this is in "latitude,longitude" format
  imageLink: string;
  contact: string;
  category: string;
  description: string;
  Donationstatus: string;
  deadline: string;
}

const IndividualCampaign = () => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCampaign, setEditedCampaign] = useState<Partial<Campaign>>({});
  const { id } = useParams(); // Get the campaign ID from the URL

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        console.log("Fetching campaign with ID:", id);

        // Fetch the campaign from Supabase
        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        if (!data) {
          console.error("Campaign not found");
          return;
        }

        console.log("Fetched campaign data:", data);
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
    setEditedCampaign(campaign || {});
  };

  const handleSave = async () => {
    if (!campaign) return;

    try {
      // Update the campaign in Supabase
      const { error } = await supabase
        .from("campaigns")
        .update(editedCampaign)
        .eq("id", campaign.id);

      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }

      // Update the local state
      setCampaign({ ...campaign, ...editedCampaign });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };

  const redirectToMap = () => {
    // Static latitude and longitude
    const latitude = "18°30'56.0\"N";
    const longitude = "73°51'26.4\"E";
  
    // Construct Google Maps URL
    const mapsUrl = `https://www.google.com/maps/place/${latitude}+${longitude}/`;
  
    // Open in new tab
    window.open(mapsUrl, "_blank");
  };
  

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Campaign Details</h1>
      <div className="space-y-4">
        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.imageLink || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  imageLink: e.target.value,
                })
              }
            />
          ) : (
            <img
              src={campaign.imageLink}
              alt="Campaign"
              className="mt-1 w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.title || ""}
              onChange={(e) =>
                setEditedCampaign({ ...editedCampaign, title: e.target.value })
              }
            />
          ) : (
            <p className="mt-1">{campaign.title}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.city || ""}
              onChange={(e) =>
                setEditedCampaign({ ...editedCampaign, city: e.target.value })
              }
            />
          ) : (
            <p className="mt-1">{campaign.city}</p>
          )}
        </div>

        {/* Organization */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.organization || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  organization: e.target.value,
                })
              }
            />
          ) : (
            <p className="mt-1">{campaign.organization}</p>
          )}
        </div>

        {/* Location */}
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.location || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  location: e.target.value,
                })
              }
              placeholder="Enter latitude,longitude (e.g., 18.51555511382965, 73.85733895003796)"
            />
          ) : (
            <div className="mt-1">
              <p>{campaign.location}</p>
              <Button
                variant="outline"
                onClick={redirectToMap}
                className="mt-2"
              >
                View on Map
              </Button>
            </div>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.contact || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  contact: e.target.value,
                })
              }
            />
          ) : (
            <p className="mt-1">{campaign.contact}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.category || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  category: e.target.value,
                })
              }
            />
          ) : (
            <p className="mt-1">{campaign.category}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.description || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  description: e.target.value,
                })
              }
            />
          ) : (
            <p className="mt-1">{campaign.description}</p>
          )}
        </div>

        {/* Donation Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Donation Status
          </label>
          {editMode ? (
            <Input
              value={editedCampaign.Donationstatus || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  Donationstatus: e.target.value,
                })
              }
            />
          ) : (
            <p className="mt-1">{campaign.Donationstatus}</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          {editMode ? (
            <Input
              type="date"
              value={editedCampaign.deadline || ""}
              onChange={(e) =>
                setEditedCampaign({
                  ...editedCampaign,
                  deadline: e.target.value,
                })
              }
            />
          ) : (
            <p className="mt-1">{campaign.deadline}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {editMode ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={handleEdit}>Edit</Button>
          )}
          <Button variant="outline" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndividualCampaign;
