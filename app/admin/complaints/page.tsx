"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Complaint {
  id: string;
  name: string;
  contact: string;
  description: string;
  created_at: string;
}

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editedComplaint, setEditedComplaint] = useState<Partial<Complaint>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data, error } = await supabase
          .from("complaints")
          .select("id, name, contact, description, created_at");

        if (error) throw error;
        setComplaints(data || []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleEdit = (complaint: Complaint) => {
    setEditId(complaint.id);
    setEditedComplaint(complaint);
  };

  const handleSave = async () => {
    if (!editId) return;

    try {
      const { error } = await supabase
        .from("complaints")
        .update(editedComplaint)
        .eq("id", editId);

      if (error) throw error;

      setComplaints((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...editedComplaint } : item
        )
      );

      setEditId(null);
      setEditedComplaint({});
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("complaints").delete().eq("id", id);
      if (error) throw error;

      setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id} className="border">
              <td className="border p-2">
                {editId === complaint.id ? (
                  <Input
                    value={editedComplaint.name || ""}
                    onChange={(e) =>
                      setEditedComplaint({
                        ...editedComplaint,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  complaint.name
                )}
              </td>
              <td className="border p-2">{complaint.contact}</td>
              <td className="border p-2">
                {editId === complaint.id ? (
                  <Input
                    value={editedComplaint.description || ""}
                    onChange={(e) =>
                      setEditedComplaint({
                        ...editedComplaint,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  complaint.description
                )}
              </td>
              <td className="border p-2">{complaint.created_at}</td>
              <td className="border p-2 flex gap-2">
                {editId === complaint.id ? (
                  <Button onClick={handleSave}>Save</Button>
                ) : (
                  <Button onClick={() => handleEdit(complaint)}>Resolve</Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(complaint.id)}
                >
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

export default ComplaintsList;