import React from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <Card className="p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 max-w-md">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Error;