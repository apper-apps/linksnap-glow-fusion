import React, { useState } from "react";
import { motion } from "framer-motion";
import URLShortener from "@/components/organisms/URLShortener";
import ShortLinkResult from "@/components/organisms/ShortLinkResult";
import RecentLinks from "@/components/organisms/RecentLinks";
import StatsBar from "@/components/organisms/StatsBar";

const HomePage = () => {
  const [currentShortLink, setCurrentShortLink] = useState(null);

  const handleURLShortened = (shortLink) => {
    setCurrentShortLink(shortLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="text-center py-8">
            <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
              <span className="gradient-text">Shorten</span> your links,{" "}
              <span className="gradient-text">amplify</span> your reach
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform long, unwieldy URLs into clean, shareable links with advanced 
              analytics and QR code generation - all in seconds.
            </p>
          </div>

          {/* Stats Bar */}
          <StatsBar />

          {/* URL Shortener */}
          <URLShortener onURLShortened={handleURLShortened} />

          {/* Short Link Result */}
          {currentShortLink && (
            <ShortLinkResult shortLink={currentShortLink} />
          )}

          {/* Recent Links */}
          <RecentLinks />

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-8 border-t border-gray-200"
          >
            <p className="text-gray-500 text-sm">
              Made with ❤️ for faster link sharing. Secure, reliable, and lightning fast.
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;