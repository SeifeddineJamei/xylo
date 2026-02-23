"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Lock, X, Play, Star, CheckCircle, Shield, Zap, Download, HeadphonesIcon } from "lucide-react";
import Features from "../components/features";

// Testimonial type
interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  avatar?: string;
  productName?: string;
  date?: string;
}

export default function LandingPage() {
  const [gumroadUrl, setGumroadUrl] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productVideo, setProductVideo] = useState<string | null>(null);
  const [salesCopy, setSalesCopy] = useState<string>("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Fetch product from Redis API
    fetch('/api/product')
      .then(res => res.json())
      .then(data => {
        setGumroadUrl(data.gumroadUrl || null);
        setProductImage(data.productImage || null);
        setProductVideo(data.productVideo || null);
        setSalesCopy(data.salesCopy || "");
        setTestimonials(data.testimonials || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
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
    const baseUrl = gumroadUrl.includes('?') ? gumroadUrl : `${gumroadUrl}?`;
    return `${baseUrl}&embed=1`;
  };

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
          />
        ))}
      </div>
    );
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
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">
              Reviews
            </a>
            <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">
              How It Works
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
          
          {/* Title and Description - shows default or custom from admin */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              {salesCopy || "Stop Overengineering. Start Earning. 🚀"}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto">
              {salesCopy || "Are you a developer trapped in the Technician's Trap? You spend weeks optimizing code for a perfect product that never sees a single user. Maybe you're paralyzed by the fear of high backend costs before you've even made your first dollar. It's time to stop being just a Code Writer and become a Solution Provider."}
            </p>
          </div>

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

          {/* 5 Yellow Stars - Displayed under product and before buy button */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={28} 
                className="text-yellow-400 fill-yellow-400" 
              />
            ))}
          </div>

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

      {/* --- FULLSCREEN PAYMENT MODAL --- */}
      {showPaymentModal && gumroadUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/95"
            onClick={closePayment}
          />
          <div className="relative z-10 w-full h-full max-w-2xl mx-4 my-8 flex flex-col">
            <button 
              onClick={closePayment}
              className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 text-white hover:text-red-400 transition-colors"
            >
              <X size={24} />
              <span className="text-sm">Close</span>
            </button>
            <div className="bg-[#111] border border-white/20 rounded-t-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF689D] to-[#FF8A65] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Complete Purchase</h3>
                <p className="text-gray-400">Your digital product is ready</p>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-b-2xl overflow-hidden">
              <iframe
                src={getGumroadEmbedUrl()}
                style={{ border: 'none', width: '100%', height: '500px', backgroundColor: '#ffffff' }}
                allow="payment"
                title="Gumroad Checkout"
              />
            </div>
            <div className="text-center text-gray-500 text-sm mt-4">
              Secure payment powered by Gumroad • <button onClick={closePayment} className="hover:text-white">Back to page</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TRUST BADGES --- */}
      <section className="py-16 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Secure Payment", desc: "256-bit SSL encryption" },
              { icon: Download, title: "Instant Access", desc: "Download immediately after purchase" },
              { icon: CheckCircle, title: "30-Day Guarantee", desc: "Money-back guarantee" },
              { icon: HeadphonesIcon, title: "24/7 Support", desc: "We're here to help anytime" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={24} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get your digital product in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Browse & Select", desc: "Explore our collection of premium digital products and find the perfect one for your needs." },
              { step: "02", title: "Secure Checkout", desc: "Complete your purchase securely through Gumroad with instant access to your product." },
              { step: "03", title: "Download & Use", desc: "Get instant access to your files and start using them immediately. No waiting required!" }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/30 transition-all group">
                <span className="text-6xl font-bold text-white/10 absolute top-4 right-6">{item.step}</span>
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={28} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ENHANCED SOCIAL PROOF --- */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10,000+</div>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">4.9/5</div>
              <p className="text-gray-400">Average Rating</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">$2M+</div>
              <p className="text-gray-400">Products Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS / REVIEWS --- */}
      <section id="testimonials" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their digital product needs
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={24} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-white font-semibold ml-2">5.0 out of 5</span>
              <span className="text-gray-500">based on {testimonials.length}+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-yellow-500/30 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.review}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    {testimonial.productName && (
                      <p className="text-gray-500 text-sm">{testimonial.productName}</p>
                    )}
                  </div>
                </div>
                {testimonial.date && (
                  <p className="text-gray-600 text-xs mt-3">{testimonial.date}</p>
                )}
              </div>
            )) : (
              // Fallback testimonials when none in database
              <>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-1 mb-4">
                    <StarRating rating={5} />
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"This product exceeded my expectations! The quality is amazing and the support team is incredibly responsive. I've already recommended it to my colleagues."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                    <div>
                      <p className="text-white font-medium">Sarah Mitchell</p>
                      <p className="text-gray-500 text-sm">Premium Digital Bundle</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-1 mb-4">
                    <StarRating rating={5} />
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"I've purchased many digital products before, but this one stands out. The attention to detail and practical features make it worth every penny."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">J</div>
                    <div>
                      <p className="text-white font-medium">James Rodriguez</p>
                      <p className="text-gray-500 text-sm">Pro Toolkit</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-1 mb-4">
                    <StarRating rating={5} />
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"Fantastic value for money! The instant download worked perfectly and the documentation is so well written. Five stars!"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">E</div>
                    <div>
                      <p className="text-white font-medium">Emily Chen</p>
                      <p className="text-gray-500 text-sm">Starter Pack</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Social Proof - Companies */}
          <div className="mt-16 pt-16 border-t border-white/5">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
                Trusted by professionals at leading companies
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
              <span className="text-xl font-bold font-mono text-white">GOOGLE</span>
              <span className="text-xl font-bold font-mono text-white">MICROSOFT</span>
              <span className="text-xl font-bold font-mono text-white">AMAZON</span>
              <span className="text-xl font-bold font-mono text-white">STRIPE</span>
              <span className="text-xl font-bold font-mono text-white">NOTION</span>
            </div>
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
