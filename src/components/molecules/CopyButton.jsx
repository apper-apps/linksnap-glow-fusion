import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const CopyButton = ({ text, children, className, variant = "outline", size = "sm" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={className}
    >
      <ApperIcon 
        name={copied ? "Check" : "Copy"} 
        size={16} 
        className={`mr-2 ${copied ? "text-success" : ""}`}
      />
      {children || (copied ? "Copied!" : "Copy")}
    </Button>
  );
};

export default CopyButton;