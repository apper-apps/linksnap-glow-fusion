import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import { shortenURL } from "@/services/api/urlService";

const URLShortener = ({ onURLShortened }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validation
    const newErrors = {};
    
    if (!originalUrl.trim()) {
      newErrors.originalUrl = "URL is required";
    } else if (!validateUrl(originalUrl)) {
      newErrors.originalUrl = "Please enter a valid URL";
    }
    
    if (customAlias && customAlias.length < 3) {
      newErrors.customAlias = "Custom alias must be at least 3 characters";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      const shortLink = await shortenURL(originalUrl, customAlias || null);
      toast.success("URL shortened successfully!");
      onURLShortened(shortLink);
      
      // Reset form
      setOriginalUrl("");
      setCustomAlias("");
    } catch (error) {
      toast.error(error.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Shorten Your URL
        </h2>
        <p className="text-gray-600">
          Transform long URLs into short, shareable links instantly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="originalUrl"
          label="Enter your long URL"
          placeholder="https://example.com/very-long-url-that-needs-shortening"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          error={errors.originalUrl}
          required
        />

        <FormField
          id="customAlias"
          label="Custom alias (optional)"
          placeholder="my-custom-link"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
          error={errors.customAlias}
        />

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                Shortening...
              </>
            ) : (
              <>
                <ApperIcon name="Zap" size={20} className="mr-2" />
                Shorten URL
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Shield" size={16} className="text-primary-500" />
          <span>Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Zap" size={16} className="text-primary-500" />
          <span>Instant</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="BarChart3" size={16} className="text-primary-500" />
          <span>Analytics</span>
        </div>
      </div>
    </Card>
  );
};

export default URLShortener;