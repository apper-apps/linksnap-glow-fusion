import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <ApperIcon name="Link" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                LinkSnap
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Lightning fast URL shortener
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" size={16} className="text-primary-500" />
                <span>Instant shortening</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="QrCode" size={16} className="text-primary-500" />
                <span>QR codes</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="BarChart3" size={16} className="text-primary-500" />
                <span>Click tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;