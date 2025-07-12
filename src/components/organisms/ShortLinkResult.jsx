import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import CopyButton from "@/components/molecules/CopyButton";
import ApperIcon from "@/components/ApperIcon";
import QRCode from "qrcode";

const ShortLinkResult = ({ shortLink }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  const shortUrl = `https://lnk.snap/${shortLink.shortCode}`;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrDataUrl = await QRCode.toDataURL(shortUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: "#5B21B6",
            light: "#FFFFFF",
          },
        });
        setQrCodeUrl(qrDataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [shortUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CheckCircle" size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
            Your Short Link is Ready!
          </h3>
          <p className="text-gray-600">
            Share this link anywhere and track its performance
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original URL
            </label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 truncate" title={shortLink.originalUrl}>
                {shortLink.originalUrl}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short URL
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1 p-3 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-primary-600 font-medium">{shortUrl}</p>
              </div>
              <CopyButton text={shortUrl} variant="primary" size="md">
                Copy Link
              </CopyButton>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <ApperIcon name="MousePointer" size={16} />
                <span>{shortLink.clicks} clicks</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" size={16} />
                <span>Created {new Date(shortLink.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ApperIcon name="QrCode" size={16} />
              <span className="text-sm font-medium">
                {showQR ? "Hide" : "Show"} QR Code
              </span>
            </button>
          </div>

          {showQR && qrCodeUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center pt-4"
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                <p className="text-center text-sm text-gray-500 mt-2">
                  Scan to open link
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ShortLinkResult;