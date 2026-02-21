"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Lock, X, Play } from "lucide-react";
import Features from "../components/features";

const GUMROAD_URL_KEY = "xylo_gumroad_url";
const PRODUCT_IMAGE_KEY = "xylo_product_image";
const PRODUCT_VIDEO_KEY = "xylo_product_video";
const SALES_COPY_KEY = "xylo_sales_copy";

export default function LandingPage() {
  const [gumroadUrl, setGumroadUrl] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productVideo, setProductVideo] = useState<string | null>(null);
  const [salesCopy, setSalesCopy] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const storedUrl = localStorage.getItem(GUMROAD_URL_KEY);
    const storedImage = localStorage.getItem(PRODUCT_IMAGE_KEY);
    const storedVideo = localStorage.getItem(PRODUCT_VIDEO_KEY);
    const storedSalesCopy = localStorage.getItem(SALES_COPY_KEY);
    setGumroadUrl(storedUrl);
    setProductImage(storedImage);
    setProductVideo(storedVideo);
    setSalesCopy(storedSalesCopy || "");
    setLoading(false);
  }, []);

  const openPayment = () => {
    if (gumroadUrl) {
      setShowPaymentModal(true);
    }
  };

  const closePayment = () => {
    setShowPaymentModal(false);
  };

  // Build Gumroad embed URL - show product page first, then checkout
  const getGumroadEmbedUrl = () => {
    if (!gumroadUrl) return "";
    // Use the original URL with embed=1 to show product page inline
    // User sees the product, then clicks to buy, then checkout
    const baseUrl = gumroadUrl.includes('?') ? gumroadUrl : `${gumroadUrl}?`;
    return `${baseUrl}&embed=1`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-indigo-500/30">
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              {"</>"}
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Xylo
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="/documentation" className="hover:text-indigo-400 transition-colors">
              Documentation
            </a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm hover:text-white transition-colors">
              Log in
            </a>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-indigo-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            v2.0 is now live
          </div>
          
          {/* Sales Copy from Admin - Show if available */}
          {salesCopy ? (
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                {salesCopy}
              </h1>
            </div>
          ) : (
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Sell Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Digital Products
              </span>
            </h1>
          )}
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium digital products. Secure payments via Gumroad.
          </p>

          {/* Product Video Display - with play button overlay */}
          {productVideo && (
            <div className="mb-8">
              {!showVideo ? (
                <div 
                  className="relative cursor-pointer group mx-auto max-w-2xl"
                  onClick={() => setShowVideo(true)}
                >
                  {productImage ? (
                    <img 
                      src={productImage} 
                      alt="Product Preview" 
                      className="w-full h-80 object-cover rounded-2xl shadow-lg shadow-pink-500/20"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-lg shadow-pink-500/20 flex items-center justify-center">
                      <Play size={64} className="text-white/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors rounded-2xl">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={40} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative mx-auto max-w-2xl">
                  <video 
                    src={productVideo} 
                    controls 
                    autoPlay
                    className="w-full h-80 object-cover rounded-2xl shadow-lg shadow-pink-500/20"
                  />
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Product Image Display (only if no video) */}
          {productImage && !productVideo && (
            <div className="mb-8">
              <img 
                src={productImage} 
                alt="Product" 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg shadow-pink-500/20"
              />
            </div>
          )}

          {/* Show Buy Button if URL is configured */}
          {gumroadUrl ? (
            <div className="mt-8">
              <button 
                onClick={openPayment}
                className="px-10 py-5 bg-gradient-to-r from-[#FF689D] to-[#FF8A65] hover:from-[#FF8A65] hover:to-[#FF689D] text-white rounded-2xl font-semibold text-xl transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 flex items-center gap-3 mx-auto"
              >
                <CreditCard size={28} />
                Buy Now - $9.99
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Secure payment powered by Gumroad
              </p>
            </div>
          ) : (
            <div className="mt-8 p-8 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Lock size={32} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-lg mb-1">
                    Store Not Configured
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    The admin hasn't set up the product link yet.
                  </p>
                  <a 
                    href="/admin" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Lock size={16} />
                    Admin Setup
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- FULLSCREEN PAYMENT MODAL - Custom Header + Gumroad --- */}
      {showPaymentModal && gumroadUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/95"
            onClick={closePayment}
          />
          <div className="relative z-10 w-full h-full max-w-2xl mx-4 my-8 flex flex-col">
            {/* Close Button */}
            <button 
              onClick={closePayment}
              className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 text-white hover:text-red-400 transition-colors"
            >
              <X size={24} />
              <span className="text-sm">Close</span>
            </button>

            {/* Custom Header - "Complete Purchase / Your digital product is ready" */}
            <div className="bg-[#111] border border-white/20 rounded-t-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF689D] to-[#FF8A65] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Complete Purchase</h3>
                <p className="text-gray-400">Your digital product is ready</p>
              </div>
            </div>

            {/* Gumroad Checkout Embed */}
            <div className="flex-1 bg-white rounded-b-2xl overflow-hidden">
              <iframe
                src={getGumroadEmbedUrl()}
                style={{ 
                  border: 'none', 
                  width: '100%', 
                  height: '500px',
                  backgroundColor: '#ffffff'
                }}
                allow="payment"
                title="Gumroad Checkout"
              />
            </div>

            {/* Helper text */}
            <div className="text-center text-gray-500 text-sm mt-4">
              Secure payment powered by Gumroad • <button onClick={closePayment} className="hover:text-white">Back to page</button>
            </div>
          </div>
        </div>
      )}

      {/* --- SOCIAL PROOF --- */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 mb-8 uppercase tracking-widest font-medium">
            Trusted by engineering teams at
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <span className="text-xl font-bold font-mono text-white">ACME CORP</span>
            <span className="text-xl font-bold font-mono text-white">STRATUS</span>
            <span className="text-xl font-bold font-mono text-white">HASHNODE</span>
            <span className="text-xl font-bold font-mono text-white">VERCEL</span>
            <span className="text-xl font-bold font-mono text-white">GITLAB</span>
          </div>
        </div>
      </section>

      {/* --- FEATURES COMPONENT --- */}
      <Features />

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, One-Time Pricing
            </h2>
            <p className="text-gray-400">
              Pay once, own forever. No subscriptions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col">
              <h3 className="text-xl font-semibold text-white">Basic</h3>
              <div className="text-3xl font-bold text-white mt-4 mb-2">$19</div>
              <p className="text-gray-500 text-sm mb-6">Perfect for individuals</p>
              <ul className="space-y-3 text-sm text-gray-400 mb-8 flex-1">
                <li className="flex gap-2">✓ Single Product License</li>
                <li className="flex gap-2">✓ Source Files Included</li>
                <li className="flex gap-2">✓ Basic Documentation</li>
                <li className="flex gap-2">✓ Email Support</li>
              </ul>
              <button onClick={openPayment} className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors">
                Buy Now
              </button>
            </div>

            <div className="p-8 rounded-2xl border border-indigo-500 bg-[#111] relative flex flex-col shadow-xl shadow-indigo-900/20">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                BEST VALUE
              </div>
              <h3 className="text-xl font-semibold text-white">Professional</h3>
              <div className="text-3xl font-bold text-white mt-4 mb-2">$49</div>
              <p className="text-gray-500 text-sm mb-6">For professionals & freelancers</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8 flex-1">
                <li className="flex gap-2">✓ Commercial License</li>
                <li className="flex gap-2">✓ Full Source Code</li>
                <li className="flex gap-2">✓ Extended Documentation</li>
                <li className="flex gap-2">✓ Priority Support</li>
                <li className="flex gap-2">✓ Lifetime Updates</li>
              </ul>
              <button onClick={openPayment} className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors font-semibold">
                Buy Now
              </button>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col">
              <h3 className="text-xl font-semibold text-white">Enterprise</h3>
              <div className="text-3xl font-bold text-white mt-4 mb-2">$199</div>
              <p className="text-gray-500 text-sm mb-6">For agencies & businesses</p>
              <ul className="space-y-3 text-sm text-gray-400 mb-8 flex-1">
                <li className="flex gap-2">✓ Extended Commercial License</li>
                <li className="flex gap-2">✓ Full Source Code</li>
                <li className="flex gap-2">✓ Custom Integration</li>
                <li className="flex gap-2">✓ Dedicated Support</li>
                <li className="flex gap-2">✓ Lifetime Updates</li>
                <li className="flex gap-2">✓ White-label Rights</li>
              </ul>
              <button onClick={openPayment} className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-sm font-medium">30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-xs font-bold">
              {"</>"}
            </div>
            <span className="text-white font-semibold">Xylo</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 Xylo. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
           
            <a href="/Contact-Us" className="text-gray-500 hover:text-white transition-colors text-sm">
              Contact Us
            </a>
            <a href="/terms-and-conditions" className="text-gray-500 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="/refund-policy" className="text-gray-500 hover:text-white transition-colors text-sm">
              Refund Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
