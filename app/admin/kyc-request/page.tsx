"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/client";
import { Button } from "@/components/ui/button";

interface KYCRequest {
  id: string;
  fname: string;
  email: string;
  mobile: string;
  adharno: string;
  govregno: string;
  address: string;
  addressproof: string;
  consent: string;
  tandc: string;
  aml: string;
  providerId: string;
  providerName: string;
}

const KYCRequestTable = () => {
  const [kycRequests, setKYCRequests] = useState<KYCRequest[]>([]);

  useEffect(() => {
    const fetchKYCRequests = async () => {
      try {
        const { data: kycData, error } = await supabase
          .from("kyc")
          .select("*");

        if (error) throw error;
        setKYCRequests(kycData || []);
      } catch (error) {
        console.error("Error fetching KYC requests:", error);
      }
    };

    fetchKYCRequests();
  }, []);

  const handleApprove = async (id: string) => {
    console.log("Approved KYC request ID:", id);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("kyc").delete().eq("id", id);
      if (error) throw error;

      setKYCRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error deleting KYC request:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">KYC Requests</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Aadhar Number</th>
            <th className="border p-2">Gov Reg No</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Consent</th>
            <th className="border p-2">T&C</th>
            <th className="border p-2">AML</th>
            <th className="border p-2">Address Proof</th>
            <th className="border p-2">Provider Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kycRequests.map((request) => (
            <tr key={request.id} className="border">
              <td className="border p-2">{request.id}</td>
              <td className="border p-2">{request.fname}</td>
              <td className="border p-2">{request.email}</td>
              <td className="border p-2">{request.mobile}</td>
              <td className="border p-2">{request.adharno}</td>
              <td className="border p-2">{request.govregno}</td>
              <td className="border p-2">{request.address}</td>
              <td className="border p-2">
                <a href={request.consent} download className="text-blue-500 underline">
                  <Button>Download Consent</Button>
                </a>
              </td>
              <td className="border p-2">
                <a href={request.tandc} download className="text-blue-500 underline">
                  <Button>Download T&C</Button>
                </a>
              </td>
              <td className="border p-2">
                <a href={request.aml} download className="text-blue-500 underline">
                  <Button>Download AML</Button>
                </a>
              </td>
              <td className="border p-2">
                <a href={request.addressproof} download className="text-blue-500 underline">
                  <Button>Download Address Proof</Button>
                </a>
              </td>
              <td className="border p-2">{request.providerName}</td>
              <td className="border p-2 flex gap-2">
                <Button onClick={() => handleApprove(request.id)}>Approve</Button>
                <Button variant="destructive" onClick={() => handleDelete(request.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KYCRequestTable;