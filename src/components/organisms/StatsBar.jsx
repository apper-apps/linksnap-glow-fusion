import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { getAllShortLinks } from "@/services/api/urlService";

const StatsBar = () => {
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    todayLinks: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const links = await getAllShortLinks();
        const today = new Date().toDateString();
        
        const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
        const todayLinks = links.filter(link => 
          new Date(link.createdAt).toDateString() === today
        ).length;

        setStats({
          totalLinks: links.length,
          totalClicks,
          todayLinks,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    loadStats();
  }, []);

  const statItems = [
    {
      label: "Total Links",
      value: stats.totalLinks,
      icon: "Link",
      color: "text-primary-600",
      bgColor: "bg-primary-100",
    },
    {
      label: "Total Clicks",
      value: stats.totalClicks,
      icon: "MousePointer",
      color: "text-accent-600",
      bgColor: "bg-accent-100",
    },
    {
      label: "Today",
      value: stats.todayLinks,
      icon: "Calendar",
      color: "text-success",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-6 text-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <ApperIcon name={stat.icon} size={24} className={stat.color} />
            </div>
            <div className="text-3xl font-display font-bold text-gray-900 mb-2">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {stat.label}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsBar;