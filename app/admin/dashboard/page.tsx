"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils/client";
import { IconClipboardCopy, IconFileBroken, IconAlertCircle } from "@tabler/icons-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedGridLayout />
    </div>
  );
}

export function EnhancedGridLayout() {
  const router = useRouter();
  const [usersCount, setUsersCount] = useState(0);
  const [donationsCount, setDonationsCount] = useState(0);
  const [complaintsCount, setComplaintsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { count: usersCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .neq("userType", "admin");
        setUsersCount(usersCount || 0);

        const { count: donationsCount } = await supabase
          .from("donations")
          .select("*", { count: "exact", head: true });
        setDonationsCount(donationsCount || 0);

        const { count: complaintsCount } = await supabase
          .from("complaints")
          .select("*", { count: "exact", head: true });
        setComplaintsCount(complaintsCount || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const items = [
    {
      title: "All Users",
      description: `Total Users: ${usersCount}`,
      icon: <IconFileBroken className="h-10 w-10 text-neutral-500" />, 
      onClick: () => router.push("/admin/all-users"),
    },
    {
      title: "Active Donations",
      description: `Total Donations: ${donationsCount}`,
      icon: <IconClipboardCopy className="h-10 w-10 text-neutral-500" />,
      onClick: () => router.push("/admin/active-donations"),
    },
    {
      title: "Complaints",
      description: `Total Complaints: ${complaintsCount}`,
      icon: <IconAlertCircle className="h-10 w-10 text-neutral-500" />,
      onClick: () => router.push("/admin/complaints"),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            onClick={item.onClick}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <GridItem
              title={item.title}
              description={item.description}
              icon={item.icon}
              className="h-56"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface GridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const GridItem: React.FC<GridItemProps> = ({ title, description, icon, className }) => {
  return (
    <div>
      <div className="flex min-h-96 justify-center items-center ">
        <h1>Charts</h1>
      </div>
    <div
      className={cn(
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-extrabold">{title}</div>
        {icon}
      </div>
      <div className="text-xl text-neutral-600 dark:text-neutral-400">
        {description}
      </div>
    </div>
    </div>
  );
};