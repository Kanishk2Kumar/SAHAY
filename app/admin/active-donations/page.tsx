"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Campaign {
  id: string;
  title: string;
  city: string;
  organization: string;
  contact: string;
}

const ActiveDonations = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editedCampaign, setEditedCampaign] = useState<Partial<Campaign>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select("id, title, city, organization, contact");

        if (error) throw error;
        setCampaigns(data || []);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleEdit = (campaign: Campaign) => {
    setEditId(campaign.id);
    setEditedCampaign(campaign);
  };

  const handleSave = async () => {
    if (!editId) return;

    try {
      const { error } = await supabase
        .from("campaigns")
        .update(editedCampaign)
        .eq("id", editId);

      if (error) throw error;

      setCampaigns((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...editedCampaign } : item
        )
      );

      setEditId(null);
      setEditedCampaign({});
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("campaigns").delete().eq("id", id);
      if (error) throw error;

      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Active Donations</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Organization</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border">
              <td className="border p-2">
                {editId === campaign.id ? (
                  <Input
                    value={editedCampaign.title || ""}
                    onChange={(e) =>
                      setEditedCampaign({
                        ...editedCampaign,
                        title: e.target.value,
                      })
                    }
                  />
                ) : (
                  campaign.title
                )}
              </td>
              <td className="border p-2">
                {editId === campaign.id ? (
                  <Input
                    value={editedCampaign.city || ""}
                    onChange={(e) =>
                      setEditedCampaign({
                        ...editedCampaign,
                        city: e.target.value,
                      })
                    }
                  />
                ) : (
                  campaign.city
                )}
              </td>
              <td className="border p-2">
                {editId === campaign.id ? (
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
                  campaign.organization
                )}
              </td>
              <td className="border p-2">
                {editId === campaign.id ? (
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
                  campaign.contact
                )}
              </td>
              <td className="border p-2 flex gap-2">
                {editId === campaign.id ? (
                  <Button onClick={handleSave}>Save</Button>
                ) : (
                  <Button onClick={() => handleEdit(campaign)}>Edit</Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(campaign.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/admin/active-donations/${campaign.id}`)
                  } // Pass the ID
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveDonations;
