import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import CopyButton from "@/components/molecules/CopyButton";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { getAllShortLinks } from "@/services/api/urlService";
import { formatDistanceToNow } from "date-fns";

const RecentLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLinks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await getAllShortLinks();
      setLinks(data.slice(0, 10)); // Show only last 10
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadLinks} />;
  }

  if (links.length === 0) {
    return (
      <Empty
        title="No links yet"
        description="Shorten your first URL to see it appear here."
        actionLabel="Shorten URL"
        icon="Link"
      />
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-gray-900">
          Recent Links
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <ApperIcon name="Clock" size={16} />
          <span>Last 10 links</span>
        </div>
      </div>

      <div className="space-y-3">
        {links.map((link, index) => (
          <motion.div
            key={link.Id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                        <ApperIcon name="Link" size={14} className="text-white" />
                      </div>
                      <span className="font-medium text-primary-600">
                        lnk.snap/{link.shortCode}
                      </span>
                    </div>
                    {link.customAlias && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        Custom
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2" title={link.originalUrl}>
                    {link.originalUrl}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="MousePointer" size={12} />
                      <span>{link.clicks} clicks</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Clock" size={12} />
                      <span>{formatDistanceToNow(new Date(link.createdAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <CopyButton
                    text={`https://lnk.snap/${link.shortCode}`}
                    variant="outline"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default RecentLinks;