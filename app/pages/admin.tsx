"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, Eye, EyeOff, Save, CheckCircle, AlertCircle, Upload, X, Image, Video, Type } from "lucide-react";

const ADMIN_PIN = "4444";
const GUMROAD_URL_KEY = "xylo_gumroad_url";
const PRODUCT_IMAGE_KEY = "xylo_product_image";
const PRODUCT_VIDEO_KEY = "xylo_product_video";
const SALES_COPY_KEY = "xylo_sales_copy";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [gumroadUrl, setGumroadUrl] = useState("");
  const [productImage, setProductImage] = useState<string>("");
  const [productVideo, setProductVideo] = useState<string>("");
  const [salesCopy, setSalesCopy] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("xylo_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      const storedUrl = localStorage.getItem(GUMROAD_URL_KEY);
      const storedImage = localStorage.getItem(PRODUCT_IMAGE_KEY);
      const storedVideo = localStorage.getItem(PRODUCT_VIDEO_KEY);
      const storedSalesCopy = localStorage.getItem(SALES_COPY_KEY);
      if (storedUrl) setGumroadUrl(storedUrl);
      if (storedImage) setProductImage(storedImage);
      if (storedVideo) setProductVideo(storedVideo);
      if (storedSalesCopy) setSalesCopy(storedSalesCopy);
    }
    setLoading(false);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProductImage(base64);
        localStorage.setItem(PRODUCT_IMAGE_KEY, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProductVideo(base64);
        localStorage.setItem(PRODUCT_VIDEO_KEY, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalesCopyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSalesCopy(value);
    localStorage.setItem(SALES_COPY_KEY, value);
  };

  const removeImage = () => {
    setProductImage("");
    localStorage.removeItem(PRODUCT_IMAGE_KEY);
  };

  const removeVideo = () => {
    setProductVideo("");
    localStorage.removeItem(PRODUCT_VIDEO_KEY);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("xylo_admin_auth", "true");
      setError("");
    } else {
      setError("Invalid PIN");
      setPin("");
    }
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gumroadUrl.trim()) {
      setError("Please enter a Gumroad URL");
      return;
    }
    if (!gumroadUrl.includes("gumroad.com")) {
      setError("Please enter a valid Gumroad URL");
      return;
    }
    localStorage.setItem(GUMROAD_URL_KEY, gumroadUrl.trim());
    setSaved(true);
    setError("");
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("xylo_admin_auth");
    setPin("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Enter your PIN to access</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                maxLength={4}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your store settings</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Sales Copy */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Type size={20} className="text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Sales Copy</h2>
              <p className="text-gray-400 text-sm">Write a compelling description for your product</p>
            </div>
          </div>

          <textarea
            value={salesCopy}
            onChange={handleSalesCopyChange}
            placeholder="Enter your sales copy here... Describe your product and why people should buy it!"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 h-32 resize-none"
          />
          <p className="text-gray-500 text-xs mt-2">
            This will appear under the title on the homepage.
          </p>
        </div>

        {/* Gumroad Configuration */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <Lock size={20} className="text-pink-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Gumroad Configuration</h2>
              <p className="text-gray-400 text-sm">Set your product link</p>
            </div>
          </div>

          <form onSubmit={handleSaveUrl} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Gumroad Product URL
              </label>
              <input
                type="url"
                value={gumroadUrl}
                onChange={(e) => setGumroadUrl(e.target.value)}
                placeholder="https://gumroad.com/l/your-product"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {saved && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                URL saved successfully!
              </div>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#FF689D] to-[#FF8A65] hover:from-[#FF8A65] hover:to-[#FF689D] text-white rounded-xl font-semibold transition-all"
            >
              <Save size={20} />
              Save Configuration
            </button>
          </form>
        </div>

        {/* Product Image Upload */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Image size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Product Image</h2>
              <p className="text-gray-400 text-sm">Upload a cover image for your product</p>
            </div>
          </div>

          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
            id="image-upload"
          />

          {productImage ? (
            <div className="relative">
              <img 
                src={productImage} 
                alt="Product" 
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="image-upload"
              className="w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-indigo-500/50 transition-colors flex flex-col items-center gap-3 cursor-pointer"
            >
              <Upload size={32} className="text-gray-400" />
              <span className="text-gray-400">Click to upload product image</span>
            </label>
          )}
        </div>

        {/* Product Video Upload - REQUIRED for Homepage */}
        <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Video size={20} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Product Video</h2>
              <p className="text-gray-400 text-sm">REQUIRED - This displays on homepage</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Option 1: File Upload */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Option 1: Upload video file</p>
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoUpload}
                accept="video/*"
                className="hidden"
                id="video-upload"
              />

              {productVideo ? (
                <div className="relative">
                  <video 
                    src={productVideo} 
                    controls 
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    onClick={removeVideo}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="video-upload"
                  className="w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 transition-colors flex flex-col items-center gap-3 cursor-pointer"
                >
                  <Upload size={32} className="text-gray-400" />
                  <span className="text-gray-400">Click to upload product video</span>
                </label>
              )}
            </div>

            {/* Option 2: Video URL */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-2">Option 2: Or enter video URL</p>
              <input
                type="url"
                placeholder="https://example.com/video.mp4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                onChange={(e) => {
                  if (e.target.value) {
                    setProductVideo(e.target.value);
                    localStorage.setItem(PRODUCT_VIDEO_KEY, e.target.value);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
          <p className="text-indigo-300 text-sm">
            <strong>Note:</strong> All changes are saved automatically. Users will see your sales copy, product image/video on the homepage.
          </p>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← View Public Page
          </a>
        </div>
      </div>
    </div>
  );
}
