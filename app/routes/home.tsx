"use client";

import { useState, useEffect } from "react";
import { CreditCard, Lock, X, Play, Star, CheckCircle, Shield, Zap, Download, HeadphonesIcon, Clock, Timer, Flame, Eye, FileText, Mail, Loader2 } from "lucide-react";
import Features from "../components/features";

interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  avatar?: string;
  productName?: string;
  date?: string;
}

interface Pricing {
  originalPrice?: number;
  salePrice?: number;
  couponEnabled?: boolean;
  couponCode?: string;
  couponExpiry?: string | null;
}

interface PreviewPdf {
  data?: string;
  pageCount?: number;
}

const DEMO_MODE = true;

function getDefaultExpiry(): string {
  const date = new Date();
  date.setHours(date.getHours() + 24);
  return date.toISOString();
}

export default function LandingPage() {
  const [gumroadUrl, setGumroadUrl] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productVideo, setProductVideo] = useState<string | null>(null);
  const [salesCopy, setSalesCopy] = useState<string>("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [previewPdf, setPreviewPdf] = useState<PreviewPdf | null>(null);
  
  const [pricing, setPricing] = useState<Pricing>({
    originalPrice: 15,
    salePrice: 9.99,
    couponEnabled: DEMO_MODE,
    couponCode: "FLASH24",
    couponExpiry: DEMO_MODE ? getDefaultExpiry() : null
  });
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showFlashBanner, setShowFlashBanner] = useState(true);
  const [gumroadLoaded, setGumroadLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  
  // PDF Preview modal
  const [showPdfModal, setShowPdfModal] = useState(false);
  
  // Email popup state
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  const [timeLeft, setTimeLeft] = useState<{hours: number; minutes: number; seconds: number}>({
    hours: 24, minutes: 0, seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  // Check if user already subscribed
  useEffect(() => {
    const hasSubscribed = localStorage.getItem("xylo_email_subscribed");
    if (hasSubscribed) {
      return;
    }

    const timer = setTimeout(() => {
      setShowEmailPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeEmailPopup = () => {
    setShowEmailPopup(false);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setEmailLoading(true);
    setEmailError("");
    
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) {
        throw new Error('Failed to subscribe');
      }
      
      localStorage.setItem("xylo_email_subscribed", "true");
      localStorage.setItem("xylo_subscriber_email", email);
      
      setEmailSuccess(true);
      setTimeout(() => {
        setShowEmailPopup(false);
      }, 2000);
      
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    if (!pricing.couponEnabled || !pricing.couponExpiry) {
      if (!DEMO_MODE) { setIsExpired(true); return; }
    }
    const expiryDate = new Date(pricing.couponExpiry || getDefaultExpiry()).getTime();
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = expiryDate - now;
      if (difference <= 0) { setIsExpired(true); return { hours: 0, minutes: 0, seconds: 0 }; }
      return { hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)), seconds: Math.floor((difference % (1000 * 60)) / 1000) };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => { const newTime = calculateTimeLeft(); setTimeLeft(newTime); if (newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) { setIsExpired(true); clearInterval(timer); } }, 1000);
    return () => clearInterval(timer);
  }, [pricing.couponEnabled, pricing.couponExpiry]);

  useEffect(() => {
    fetch('/api/product')
      .then(res => res.json())
      .then(data => {
        setGumroadUrl(data.gumroadUrl || null);
        setProductImage(data.productImage || null);
        setProductVideo(data.productVideo || null);
        setSalesCopy(data.salesCopy || "");
        setTestimonials(data.testimonials || []);
        
        if (data.previewPdf) {
          if (typeof data.previewPdf === 'string') {
            setPreviewPdf({ data: data.previewPdf, pageCount: 7 });
          } else if (data.previewPdf.data) {
            setPreviewPdf(data.previewPdf);
          }
        } else {
          setPreviewPdf(null);
        }
        
        if (data.pricing && Object.keys(data.pricing).length > 0) {
          if (data.pricing.couponEnabled && data.pricing.couponExpiry) setPricing(data.pricing);
          else if (!DEMO_MODE) setPricing(data.pricing);
        }
        setLoading(false);
      })
      .catch(error => { console.error("Error fetching product:", error); setLoading(false); });
  }, []);

  const openPayment = () => { if (gumroadUrl) { setGumroadLoaded(false); setIframeKey((prev: number) => prev + 1); setShowPaymentModal(true); } };
  const closePayment = () => setShowPaymentModal(false);

  const openPdfPreview = () => { if (previewPdf?.data) setShowPdfModal(true); };
  const closePdfPreview = () => setShowPdfModal(false);

  const downloadPdf = () => {
    if (previewPdf?.data) {
      const link = document.createElement('a');
      link.href = previewPdf.data;
      link.download = 'preview.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getGumroadEmbedUrl = () => {
    if (!gumroadUrl) return "";
    const baseUrl = gumroadUrl.includes('?') ? gumroadUrl : gumroadUrl;
    return baseUrl.includes('wanted=true') ? baseUrl : `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}wanted=true`;
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} size={18} className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />))}</div>
  );

  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  const isFlashSaleActive = pricing.couponEnabled && !isExpired;

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-indigo-500/30">
      {/* EMAIL POPUP */}
      {showEmailPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeEmailPopup} />
          <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/20 rounded-2xl p-8 shadow-2xl">
            <button onClick={closeEmailPopup} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
            
            {emailSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're In! 🎉</h3>
                <p className="text-gray-300">Thanks for subscribing. Check your inbox for exclusive offers.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Wait! Don't Miss Out</h3>
                  <p className="text-gray-400">Join 10,000+ developers getting exclusive deals, tips, and early access to new products.</p>
                </div>
                
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {emailError && <p className="text-red-400 text-sm mt-2">{emailError}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {emailLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Get Exclusive Access
                      </>
                    )}
                  </button>
                </form>
                
                <p className="text-gray-500 text-xs text-center mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
                
                <button 
                  onClick={closeEmailPopup}
                  className="block w-full text-center text-gray-500 text-sm mt-3 hover:text-white transition-colors"
                >
                  No thanks, I'll pass
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showFlashBanner && isFlashSaleActive && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-white"><Flame size={20} className="animate-bounce" /><span className="font-bold">FLASH SALE</span><span className="text-white/90">- Get {pricing.couponCode} for</span><span className="font-bold text-green-300">${pricing.salePrice?.toFixed(2)}</span></div>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full"><Timer size={16} className="text-white" /><span className="text-white font-mono font-bold">{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}</span></div>
            <button onClick={() => setShowFlashBanner(false)} className="absolute right-4 text-white/80 hover:text-white"><X size={18} /></button>
          </div>
        </div>
      )}

      <nav className={`fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md ${isFlashSaleActive ? 'mt-10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2"><img src="/xylo-logo.png" alt="Xylo" className="w-[50px] h-[50px] rounded-lg mt-[25px]" /><span className="text-white font-semibold text-lg mt-[25px]">Xylo</span></div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-indigo-400">Features</a>
            <a href="#testimonials" className="hover:text-indigo-400"> Reviews</a>
            <a href="#how-it-works" className="hover:text-indigo-400">How It Works</a>
            <a href="#pricing" className="hover:text-indigo-400">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm hover:text-white">Log in</a>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">Get Started</button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-indigo-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />v2.0 is now live
            </div>
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">{salesCopy || "Stop Overengineering. Start Earning. 🚀"}</h1>
              <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto">{salesCopy || "Are you a developer trapped in the Technician's Trap?"}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              {productVideo && (
                <div className="mb-6">
                  {!showVideo ? (
                    <div className="relative cursor-pointer group mx-auto" onClick={() => setShowVideo(true)}>
                      {productImage ? <img src={productImage} alt="Product" className="w-full h-80 object-cover rounded-2xl shadow-lg" /> : <div className="w-full h-80 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl flex items-center justify-center"><Play size={64} className="text-white/80" /></div>}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 rounded-2xl"><div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center"><Play size={40} className="text-white ml-1" /></div></div>
                    </div>
                  ) : (
                    <div className="relative mx-auto"><video src={productVideo} controls autoPlay className="w-full h-80 object-cover rounded-2xl" /><button onClick={() => setShowVideo(false)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg"><X size={20} /></button></div>
                  )}
                </div>
              )}
              {productImage && !productVideo && <div className="mb-6"><img src={productImage} alt="Product" className="w-full h-80 object-cover rounded-2xl shadow-lg" /></div>}

              <div className="flex items-center justify-center gap-1 mb-6">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={28} className="text-yellow-400 fill-yellow-400" />)}</div>

              {gumroadUrl ? (
                <div className="mt-6">
                  {isFlashSaleActive && <div className="mb-4 flex justify-center"><div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/40 px-3 py-1 rounded-full"><Clock size={14} className="text-orange-400" /><span className="text-orange-400 text-sm font-medium">⚡ {formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m left!</span></div></div>}
                  <button onClick={openPayment} className={`px-10 py-5 rounded-2xl font-semibold text-xl transition-all shadow-lg flex items-center gap-3 mx-auto w-full justify-center ${isFlashSaleActive ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-[#FF689D] to-[#FF8A65] text-white'}`}>
                    <CreditCard size={28} />{isFlashSaleActive ? <><span className="line-through text-white/60">${pricing.originalPrice?.toFixed(2)}</span><span>Buy Now - ${pricing.salePrice?.toFixed(2)}</span></> : <>Buy Now - ${pricing.salePrice?.toFixed(2)}</>}
                  </button>
                  {isFlashSaleActive && <p className="text-green-400 text-sm mt-2 text-center">🎉 Save ${((pricing.originalPrice || 0) - (pricing.salePrice || 0)).toFixed(2)}!</p>}
                  <p className="text-gray-500 text-sm mt-2 text-center">Secure payment powered by Gumroad</p>
                </div>
              ) : (
                <div className="mt-6 p-8 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center"><Lock size={32} className="text-amber-400" /></div>
                    <div><p className="text-white font-medium text-lg mb-1">Store Not Configured</p><a href="/admin" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Admin Setup</a></div>
                  </div>
                </div>
              )}
            </div>

            {previewPdf?.data && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-red-500/50 transition-all" onClick={openPdfPreview}>
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={24} className="text-red-400" />
                  <h3 className="text-xl font-semibold text-white">Digital Product</h3>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <FileText size={32} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Preview PDF</p>
                      <p className="text-gray-400 text-sm">~{previewPdf.pageCount || 7} pages</p>
                    </div>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); downloadPdf(); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl transition-colors">
                  <Download size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {showPdfModal && previewPdf?.data && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/95" onClick={closePdfPreview} />
          <div className="relative z-10 w-full h-full max-w-4xl mx-4 my-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">PDF Preview</span>
              <button onClick={closePdfPreview} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg">
                <X size={18} /> Close
              </button>
            </div>
            <div className="flex-1 bg-white rounded-lg overflow-hidden">
              <iframe src={previewPdf.data} className="w-full h-full" title="PDF Preview" />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={downloadPdf} className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg">
                <Download size={18} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/95" onClick={closePayment} />
          <div className="relative z-10 w-full h-full max-w-2xl mx-4 my-8 flex flex-col">
            <button onClick={closePayment} className="absolute -top-12 right-0 flex items-center gap-2 text-white hover:text-red-400"><X size={24} /><span className="text-sm">Close</span></button>
            <div className="bg-[#111] border border-white/20 rounded-t-2xl p-8">
              <div className="text-center">
                {gumroadUrl ? <><div className="w-16 h-16 bg-gradient-to-r from-[#FF689D] to-[#FF8A65] rounded-full flex items-center justify-center mx-auto mb-4"><CreditCard size={32} className="text-white" /></div><h3 className="text-2xl font-bold text-white mb-2">Complete Purchase</h3><p className="text-gray-400">Your digital product is ready</p></> : <><div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"><CreditCard size={32} className="text-white" /></div><h3 className="text-2xl font-bold text-white mb-2">Demo Mode</h3><p className="text-gray-400">Configure in admin</p></>}
                {isFlashSaleActive && <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 px-4 py-2 rounded-full"><span className="text-yellow-400 font-bold">Use Coupon:</span><span className="text-yellow-300 font-bold text-xl">{pricing.couponCode}</span></div>}
              </div>
            </div>
            {gumroadUrl ? (
              <div className="flex-1 bg-white rounded-b-2xl overflow-hidden min-h-[500px]">
                {!gumroadLoaded && <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10"><div className="w-10 h-10 border-3 border-gray-200 border-t-[#FF689D] rounded-full animate-spin mx-auto mb-3"></div></div>}
                <iframe key={iframeKey} src={getGumroadEmbedUrl()} style={{ border: 'none', width: '100%', height: '600px' }} allow="payment" title="Gumroad Checkout" onLoad={() => setGumroadLoaded(true)} />
              </div>
            ) : <div className="flex-1 bg-gray-100 rounded-b-2xl p-8 text-center"><p className="text-gray-500">Please provide a valid Gumroad URL</p></div>}
            <div className="text-center text-gray-500 text-sm mt-4">{gumroadUrl ? <>Secure payment powered by Gumroad • <button onClick={closePayment} className="hover:text-white">Back</button></> : <button onClick={closePayment} className="hover:text-white">Back</button>}</div>
          </div>
        </div>
      )}

      <section className="py-16 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ icon: Shield, title: "Secure Payment", desc: "256-bit SSL encryption" }, { icon: Download, title: "Instant Access", desc: "Download immediately" }, { icon: CheckCircle, title: "30-Day Guarantee", desc: "Money-back guarantee" }, { icon: HeadphonesIcon, title: "24/7 Support", desc: "We're here to help" }].map((item, i) => (<div key={i} className="flex items-center gap-4"><div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center"><item.icon size={24} className="text-indigo-400" /></div><div><p className="text-white font-medium text-sm">{item.title}</p><p className="text-gray-500 text-xs">{item.desc}</p></div></div>))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2><p className="text-gray-400">Get your digital product in three simple steps</p></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ step: "01", title: "Browse & Select", desc: "Explore our premium digital products." }, { step: "02", title: "Secure Checkout", desc: "Complete purchase through Gumroad." }, { step: "03", title: "Download & Use", desc: "Get instant access to your files." }].map((item, i) => (<div key={i} className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/30"><span className="text-6xl font-bold text-white/10 absolute top-4 right-6">{item.step}</span><div className="w-14 h-14 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6"><Zap size={28} /></div><h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3><p className="text-gray-400">{item.desc}</p></div>))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div><div className="text-4xl md:text-5xl font-bold text-white mb-2">10,000+</div><p className="text-gray-400">Happy Customers</p></div>
            <div><div className="text-4xl md:text-5xl font-bold text-white mb-2">4.9/5</div><p className="text-gray-400">Average Rating</p></div>
            <div><div className="text-4xl md:text-5xl font-bold text-white mb-2">$2M+</div><p className="text-gray-400">Products Sold</p></div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2 mt-4"><div className="flex">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={24} className="text-yellow-400 fill-yellow-400" />)}</div><span className="text-white font-semibold ml-2">5.0 out of 5</span></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? testimonials.map((item) => (<div key={item.id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/30 transition-all"><div className="flex items-center gap-1 mb-4"><StarRating rating={item.rating} /></div><p className="text-gray-300 mb-6">"{item.review}"</p><div className="flex items-center gap-4">{item.avatar ? <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover" /> : <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">{item.name.charAt(0)}</div>}<div><p className="text-white font-medium">{item.name}</p>{item.productName && <p className="text-gray-500 text-sm">{item.productName}</p>}</div></div></div>)) : <><div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/30 transition-all"><div className="flex gap-1 mb-4"><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /></div><p className="text-gray-300 mb-6">"This product exceeded my expectations! The quality is amazing and the support team is incredibly responsive."</p><div className="flex items-center gap-4"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Sarah Mitchell" className="w-12 h-12 rounded-full object-cover" /><div><p className="text-white font-medium">Sarah Mitchell</p><p className="text-gray-500 text-sm">Premium Digital Bundle</p></div></div></div><div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/30 transition-all"><div className="flex gap-1 mb-4"><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /></div><p className="text-gray-300 mb-6">"I've purchased many digital products before, but this one stands out. The attention to detail is incredible."</p><div className="flex items-center gap-4"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="James Rodriguez" className="w-12 h-12 rounded-full object-cover" /><div><p className="text-white font-medium">James Rodriguez</p><p className="text-gray-500 text-sm">Pro Toolkit</p></div></div></div><div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/30 transition-all"><div className="flex gap-1 mb-4"><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /><Star size={18} className="text-yellow-400 fill-yellow-400" /></div><p className="text-gray-300 mb-6">"Fantastic value for money! The instant download worked perfectly and the documentation is excellent."</p><div className="flex items-center gap-4"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Emily Chen" className="w-12 h-12 rounded-full object-cover" /><div><p className="text-white font-medium">Emily Chen</p><p className="text-gray-500 text-sm">Starter Pack</p></div></div></div></>}
          </div>
        </div>
      </section>

      <Features />

      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, One-Time Pricing</h2><p className="text-gray-400">Pay once, own forever.</p></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col"><h3 className="text-xl font-semibold text-white">Basic</h3><div className="text-3xl font-bold text-white mt-4 mb-2">$19</div><p className="text-gray-500 text-sm mb-6">Perfect for individuals</p><ul className="space-y-3 text-sm text-gray-400 mb-8 flex-1"><li className="flex gap-2">✓ Single License</li><li className="flex gap-2">✓ Source Files</li></ul><button onClick={openPayment} className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/5">Buy Now</button></div>
            <div className="p-8 rounded-2xl border border-indigo-500 bg-[#111] relative flex flex-col shadow-xl shadow-indigo-900/20"><div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">BEST VALUE</div><h3 className="text-xl font-semibold text-white">Professional</h3><div className="text-3xl font-bold text-white mt-4 mb-2">$49</div><p className="text-gray-500 text-sm mb-6">For professionals</p><ul className="space-y-3 text-sm text-gray-300 mb-8 flex-1"><li className="flex gap-2">✓ Commercial License</li><li className="flex gap-2">✓ Full Source Code</li><li className="flex gap-2">✓ Priority Support</li></ul><button onClick={openPayment} className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-semibold">Buy Now</button></div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col"><h3 className="text-xl font-semibold text-white">Enterprise</h3><div className="text-3xl font-bold text-white mt-4 mb-2">$199</div><p className="text-gray-500 text-sm mb-6">For agencies</p><ul className="space-y-3 text-sm text-gray-400 mb-8 flex-1"><li className="flex gap-2">✓ Extended License</li><li className="flex gap-2">✓ Custom Integration</li><li className="flex gap-2">✓ Dedicated Support</li></ul><button onClick={openPayment} className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/5">Contact Sales</button></div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2"><img src="/xylo-logo.png" alt="Xylo" className="w-[50px] h-[50px] rounded-lg" /><span className="text-white font-semibold text-lg">Xylo</span></div>
          <div className="text-sm text-gray-500">© 2026 Xylo. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="/Contact-Us" className="text-gray-500 hover:text-white text-sm">Contact Us</a>
            <a href="/terms-and-conditions" className="text-gray-500 hover:text-white text-sm">Terms</a>
            <a href="/privacy-policy" className="text-gray-500 hover:text-white text-sm">Privacy</a>
            <a href="/refund-policy" className="text-gray-500 hover:text-white text-sm">Refund</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
