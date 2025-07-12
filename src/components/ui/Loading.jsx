import React from "react";
import Card from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* URL Form Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
        </div>
      </Card>

      {/* Result Card Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="flex items-center justify-between">
            <div className="h-10 bg-gray-200 rounded flex-1 mr-4"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded-lg w-32 mx-auto"></div>
        </div>
      </Card>

      {/* Recent Links Skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Loading;