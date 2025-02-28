"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils/client";
import { IconClipboardCopy, IconFileBroken, IconAlertCircle, IconUsers } from "@tabler/icons-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

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
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [providersCount, setProvidersCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total users count (excluding admins)
        const { count: usersCount, error: usersError } = await supabase
          .from("user")
          .select("*", { count: "exact", head: true })
          .neq("userType", "admin");

        if (usersError) console.error("Users Count Error:", usersError);
        console.log("Users Count Response:", usersCount);
        setUsersCount(usersCount ?? 0);

        // Fetch total campaigns count
        const { count: campaignsCount, error: campaignsError } = await supabase
          .from("campaigns")
          .select("*", { count: "exact", head: true });

        if (campaignsError) console.error("Campaigns Count Error:", campaignsError);
        console.log("Campaigns Count Response:", campaignsCount);
        setCampaignsCount(campaignsCount ?? 0);

        // Fetch total providers count
        const { count: providersCount, error: providersError } = await supabase
          .from("provider")
          .select("*", { count: "exact", head: true });

        if (providersError) console.error("Providers Count Error:", providersError);
        console.log("Providers Count Response:", providersCount);

        setProvidersCount(providersCount ?? 0);
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
      title: "Total Providers",
      description: `Total Providers: ${providersCount}`,
      icon: <IconUsers className="h-10 w-10 text-neutral-500" />,
      onClick: () => router.push("/admin/providers"),
    },
    {
      title: "Campaigns",
      description: `Total Campaigns: ${campaignsCount}`,
      icon: <IconAlertCircle className="h-10 w-10 text-neutral-500" />,
      onClick: () => router.push("/admin/campaigns"),
    },
  ];

  // Shadcn Pie Chart Component
  const chartData = [
    { browser: "Doctors", visitors: 3, fill: "var(--color-chrome)" },
    { browser: "Grocery Shopkeeper", visitors: 1, fill: "var(--color-safari)" },
    { browser: "Teacher", visitors: 2, fill: "var(--color-firefox)" },
    { browser: "Pharmacy", visitors: 4, fill: "var(--color-edge)" },
    { browser: "Cook", visitors: 2, fill: "var(--color-other)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Replace "Charts" with the Shadcn Pie Chart component */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/* Render the other cards */}
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