"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/client";
import { Button } from "@/components/ui/button";

interface DocumentVerification {
  id: string;
  name: string;
  pancard: string;
  identitycard: string;
  accnobank: string;
  IFSCcode: string;
}

const DocumentVerificationTable = () => {
  const [documents, setDocuments] = useState<DocumentVerification[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data: documentsData, error } = await supabase
          .from("documentverification")
          .select("id, name, pancard, identitycard, accnobank, IFSCcode");

        if (error) throw error;
        setDocuments(documentsData || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleApprove = async (id: string) => {
    console.log("Approved document ID:", id);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("documentverification").delete().eq("id", id);
      if (error) throw error;

      setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Document Verification</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Pan Card</th>
            <th className="border p-2">Identity Card</th>
            <th className="border p-2">Account Number</th>
            <th className="border p-2">IFSC code</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id} className="border">
              <td className="border p-2">{document.id}</td>
              <td className="border p-2">{document.name}</td>
              <td className="border p-2">
                <a href={document.pancard} download className="text-blue-500 underline">
                  <Button>Download Pan Card</Button>
                </a>
              </td>
              <td className="border p-2">
                <a href={document.identitycard} download className="text-blue-500 underline">
                  <Button>Download Identity Card</Button>
                </a>
              </td>
              <td className="border p-2">{document.accnobank}</td>
              <td className="border p-2">{document.IFSCcode}</td>
              <td className="border p-2 flex gap-2">
                <Button onClick={() => handleApprove(document.id)}>
                  Approve
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(document.id)}>
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

export default DocumentVerificationTable;