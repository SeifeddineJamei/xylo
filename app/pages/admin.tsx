"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, Eye, EyeOff, Save, CheckCircle, AlertCircle, Upload, X, Image, Video, Type, DollarSign, Clock, Zap, FileText, Users, Download, Mail } from "lucide-react";

const ADMIN_PIN = "4444";

interface Subscriber {
  email: string;
  subscribedAt: string;
}

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
  
  const [originalPrice, setOriginalPrice] = useState<number>(15);
  const [salePrice, setSalePrice] = useState<number>(9.99);
  const [couponEnabled, setCouponEnabled] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("FLASH24");
  const [couponHours, setCouponHours] = useState<number>(24);
  
  const [previewPdf, setPreviewPdf] = useState<string>("");
  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subscribersLoading, setSubscribersLoading] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const previewPdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("xylo_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      fetch('/api/product')
        .then(res => res.json())
        .then(data => {
          if (data.gumroadUrl) setGumroadUrl(data.gumroadUrl);
          if (data.productImage) setProductImage(data.productImage);
          if (data.productVideo) setProductVideo(data.productVideo);
          if (data.salesCopy) setSalesCopy(data.salesCopy);
          if (data.previewPdf) {
            if (typeof data.previewPdf === 'string') {
              setPreviewPdf(data.previewPdf);
              setPdfPageCount(7);
            } else if (data.previewPdf.data) {
              setPreviewPdf(data.previewPdf.data);
              setPdfPageCount(data.previewPdf.pageCount || 7);
            }
          }
          if (data.pricing) {
            if (data.pricing.originalPrice) setOriginalPrice(data.pricing.originalPrice);
            if (data.pricing.salePrice) setSalePrice(data.pricing.salePrice);
            if (data.pricing.couponEnabled !== undefined) setCouponEnabled(data.pricing.couponEnabled);
            if (data.pricing.couponCode) setCouponCode(data.pricing.couponCode);
            if (data.pricing.couponExpiry) {
              const expiryDate = new Date(data.pricing.couponExpiry);
              const now = new Date();
              const hoursLeft = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
              setCouponHours(hoursLeft);
            }
          }
        })
        .catch(console.error);
      
      fetchSubscribers();
    }
    setLoading(false);
  }, []);

  const fetchSubscribers = async () => {
    setSubscribersLoading(true);
    try {
      const res = await fetch('/api/subscribers');
      const data = await res.json();
      if (data.subscribers) setSubscribers(data.subscribers);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    }
    setSubscribersLoading(false);
  };

  const downloadSubscribersCSV = () => {
    if (subscribers.length === 0) return;
    const csvHeader = "Email,Subscribed At\n";
    const csvRows = subscribers.map(sub => {
      const date = new Date(sub.subscribedAt).toLocaleString();
      return `${sub.email},${date}`;
    }).join("\n");
    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductVideo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewPdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const estimatedPages = Math.min(7, Math.ceil(file.size / 50000));
        setPreviewPdf(base64);
        setPdfPageCount(estimatedPages);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleSalesCopyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSalesCopy(e.target.value);
  };

  const saveToRedis = async () => {
    try {
      let couponExpiry: string | null = null;
      if (couponEnabled) {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + couponHours);
        couponExpiry = expiryDate.toISOString();
      }
      
      const pricing = { originalPrice, salePrice, couponEnabled, couponCode, couponExpiry };
      const formData = new FormData();
      if (gumroadUrl) formData.append("gumroadUrl", gumroadUrl);
      if (productImage) formData.append("productImage", productImage);
      if (productVideo) formData.append("productVideo", productVideo);
      if (salesCopy) formData.append("salesCopy", salesCopy);
      if (previewPdf) formData.append("previewPdf", JSON.stringify({ data: previewPdf, pageCount: pdfPageCount }));
      formData.append("pricing", JSON.stringify(pricing));

      const res = await fetch('/api/product', { method: 'POST', body: formData });
      
      if (res.ok) {
        setSaved(true);
        setError("");
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError("Failed to save to database");
      }
    } catch (err) {
      console.error("Error saving:", err);
      setError("Failed to save to database");
    }
  };

  const removeImage = () => setProductImage("");
  const removeVideo = () => setProductVideo("");
  const removePreviewPdf = () => { setPreviewPdf(""); setPdfPageCount(0); };

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
    if (!gumroadUrl.trim()) { setError("Please enter a Gumroad URL"); return; }
    if (!gumroadUrl.includes("gumroad.com")) { setError("Please enter a valid Gumroad URL"); return; }
    saveToRedis();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("xylo_admin_auth");
    setPin("");
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><Lock size={32} className="text-white" /></div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Enter your PIN to access</p>
        </div>
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <div className="relative">
            <input type={showPin ? "text" : "password"} value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" maxLength={4} />
            <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{showPin ? <EyeOff size={20} /> : <Eye size={20} />}</button>
          </div>
          {error && <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} />{error}</div>}
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors">Access Dashboard</button>
        </form>
        <div className="mt-8 text-center"><a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">← Back to Home</a></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-bold text-white">Admin Dashboard</h1><p className="text-gray-400 mt-1">Manage your store settings</p></div>
          <button onClick={handleLogout} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">Logout</button>
        </div>

        {/* Subscribers Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"><Users size={20} className="text-blue-400" /></div>
              <div><h2 className="text-xl font-semibold text-white">Email Subscribers</h2><p className="text-gray-400 text-sm">{subscribers.length} subscribers</p></div>
            </div>
            <button onClick={downloadSubscribersCSV} disabled={subscribers.length === 0 || subscribersLoading} className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm transition-colors disabled:opacity-50">
              <Download size={16} />Download CSV
            </button>
          </div>
          {subscribersLoading ? <div className="text-gray-400 text-sm">Loading...</div> : subscribers.length > 0 ? (
            <div className="max-h-48 overflow-y-auto space-y-2">
              {subscribers.map((sub, i) => (<div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"><Mail size={14} className="text-blue-400" /></div><span className="text-white text-sm">{sub.email}</span></div>
                <span className="text-gray-500 text-xs">{new Date(sub.subscribedAt).toLocaleDateString()}</span>
              </div>))}
            </div>
          ) : <div className="text-gray-500 text-sm">No subscribers yet.</div>}
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center"><Zap size={20} className="text-white" /></div><div><h2 className="text-xl font-semibold text-white">Flash Sale & Pricing</h2><p className="text-gray-400 text-sm">Configure your exclusive offer</p></div></div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-gray-400 text-sm mb-2"><DollarSign size={14} className="inline mr-1" />Original Price</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)} className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" /></div></div>
            <div><label className="block text-gray-400 text-sm mb-2"><DollarSign size={14} className="inline mr-1" />Sale Price</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" step="0.01" value={salePrice} onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)} className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" /></div></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-gray-400 text-sm mb-2">Coupon Code</label><input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white uppercase" /></div>
            <div><label className="block text-gray-400 text-sm mb-2"><Clock size={14} className="inline mr-1" />Duration (Hours)</label><input type="number" min="1" max="168" value={couponHours} onChange={(e) => setCouponHours(parseInt(e.target.value) || 24)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" /></div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div><p className="text-white font-medium">Enable Flash Sale</p><p className="text-gray-500 text-sm">Show countdown timer</p></div>
            <button onClick={() => setCouponEnabled(!couponEnabled)} className={`relative w-14 h-8 rounded-full transition-colors ${couponEnabled ? 'bg-green-500' : 'bg-gray-600'}`}><span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${couponEnabled ? 'translate-x-7' : 'translate-x-1'}`} /></button>
          </div>
        </div>

        {/* Sales Copy */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center"><Type size={20} className="text-green-400" /></div><div><h2 className="text-xl font-semibold text-white">Sales Copy</h2><p className="text-gray-400 text-sm">Write a description</p></div></div>
          <textarea value={salesCopy} onChange={handleSalesCopyChange} placeholder="Enter your sales copy..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white h-32 resize-none" />
        </div>

        {/* Gumroad */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center"><Lock size={20} className="text-pink-400" /></div><div><h2 className="text-xl font-semibold text-white">Gumroad Configuration</h2><p className="text-gray-400 text-sm">Set your product link</p></div></div>
          <form onSubmit={handleSaveUrl} className="space-y-4">
            <div><label className="block text-gray-400 text-sm mb-2">Gumroad Product URL</label><input type="url" value={gumroadUrl} onChange={(e) => setGumroadUrl(e.target.value)} placeholder="https://gumroad.com/l/your-product" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" /></div>
            {error && <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} />{error}</div>}
            {saved && <div className="flex items-center gap-2 text-green-400 text-sm"><CheckCircle size={16} />URL saved successfully!</div>}
          </form>
        </div>

        {/* Product Image */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"><Image size={20} className="text-blue-400" /></div><div><h2 className="text-xl font-semibold text-white">Product Image</h2><p className="text-gray-400 text-sm">Upload a cover image</p></div></div>
          <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" id="image-upload" />
          {productImage ? (<div className="relative"><img src={productImage} alt="Product" className="w-full h-48 object-cover rounded-xl" /><button onClick={removeImage} className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-lg"><X size={16} /></button></div>) : (<label htmlFor="image-upload" className="w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-indigo-500/50 transition-colors flex flex-col items-center gap-3 cursor-pointer"><Upload size={32} className="text-gray-400" /><span className="text-gray-400">Click to upload</span></label>)}
        </div>

        {/* Product Video */}
        <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center"><Video size={20} className="text-purple-400" /></div><div><h2 className="text-xl font-semibold text-white">Product Video</h2><p className="text-gray-400 text-sm">Displays on homepage</p></div></div>
          <input type="file" ref={videoInputRef} onChange={handleVideoUpload} accept="video/*" className="hidden" id="video-upload" />
          {productVideo ? (<div className="relative"><video src={productVideo} controls className="w-full h-48 object-cover rounded-xl" /><button onClick={removeVideo} className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-lg"><X size={16} /></button></div>) : (<label htmlFor="video-upload" className="w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 transition-colors flex flex-col items-center gap-3 cursor-pointer"><Upload size={32} className="text-gray-400" /><span className="text-gray-400">Click to upload video</span></label>)}
        </div>

        {/* Preview PDF */}
        <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center"><FileText size={20} className="text-red-400" /></div><div><h2 className="text-xl font-semibold text-white">Preview PDF</h2><p className="text-gray-400 text-sm">Upload PDF preview (max 7 pages)</p></div></div>
          <input type="file" ref={previewPdfInputRef} onChange={handlePreviewPdfUpload} accept="application/pdf" className="hidden" id="preview-pdf-upload" />
          {previewPdf ? (<div><div className="bg-white/10 rounded-xl p-6 border border-white/10 mb-4"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center"><FileText size={32} className="text-red-400" /></div><div className="flex-1"><p className="text-white font-medium">PDF Preview Uploaded</p><p className="text-gray-400 text-sm">Approximately {pdfPageCount} pages</p></div><div className="flex gap-2"><button type="button" onClick={() => { const w = window.open('', '_blank'); if (w) w.document.write(`<iframe src="${previewPdf}" style="width:100%;height:100vh;border:none;"></iframe>`); }} className="p-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg"><Eye size={16} /></button><button onClick={removePreviewPdf} className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg"><X size={16} /></button></div></div></div><label htmlFor="preview-pdf-upload" className="w-full p-4 border-2 border-dashed border-red-500/30 rounded-xl hover:border-red-400 transition-colors flex flex-col items-center gap-2 cursor-pointer"><Upload size={24} className="text-red-400" /><span className="text-red-400 text-sm">Replace PDF</span></label></div>) : (<label htmlFor="preview-pdf-upload" className="w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-red-500/50 transition-colors flex flex-col items-center gap-3 cursor-pointer"><Upload size={32} className="text-gray-400" /><span className="text-gray-400">Click to upload PDF preview</span><span className="text-gray-500 text-xs">Upload a PDF file (max 7 pages)</span></label>)}
          <p className="text-gray-500 text-xs mt-4">This PDF will be shown as preview on the homepage.</p>
        </div>

        {/* Save Button */}
        <div className="mt-6"><button onClick={saveToRedis} className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#FF689D] to-[#FF8A65] hover:from-[#FF8A65] hover:to-[#FF689D] text-white rounded-xl font-semibold transition-all"><Save size={20} />Save All Changes</button></div>
        <div className="mt-4 text-center"><a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">← View Public Page</a></div>
      </div>
    </div>
  );
}
