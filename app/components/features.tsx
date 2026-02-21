"use client";

import React from "react";
import { CheckCircle, Zap, Shield, BarChart, Clock, Layers } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Zap size={28} />,
    title: "Instant Access",
    description: "Get immediate access to your digital product after purchase. No waiting, no delays - start using it right away.",
  },
  {
    icon: <Shield size={28} />,
    title: "Secure Downloads",
    description: "Your files are protected with enterprise-grade security. Download with confidence knowing your data is safe.",
  },
  {
    icon: <BarChart size={28} />,
    title: "Professional Quality",
    description: "Every product is crafted with attention to detail. Premium solutions designed to meet professional standards.",
  },
  {
    icon: <Clock size={28} />,
    title: "Lifetime Updates",
    description: "Get free lifetime updates to your purchased products. Stay current with the latest improvements and features.",
  },
  {
    icon: <Layers size={28} />,
    title: "Easy Integration",
    description: "Simple setup process with clear documentation. Get started in minutes, not hours.",
  },
  {
    icon: <CheckCircle size={28} />,
    title: "Dedicated Support",
    description: "Get expert help when you need it. Our team is here to assist you with any questions or issues.",
  },
];

export default function Features() {
  return (
    <>
      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Digital Products
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We deliver premium solutions that help you solve real problems. Every product is built with quality and usability in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Solutions That Actually
              <span className="text-indigo-400"> Work</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Stop wasting time with complicated setups and poorly designed products. Our digital solutions are built to deliver results from day one.
            </p>
            <ul className="space-y-5">
              {[
                "Save hours of setup time with our easy-to-follow guides",
                "Get professional results without any prior experience",
                "Access premium features that rival expensive alternatives",
                "Enjoy seamless updates and improvements for free",
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full">
            <div className="relative">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-pink-600/20 rounded-3xl blur-2xl" />
              
              {/* Card */}
              <div className="relative bg-[#111] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Premium Quality</h4>
                    <p className="text-gray-500 text-sm">Professional grade solution</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-full rounded-full" />
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-4/5 rounded-full" />
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-orange-500 w-3/4 rounded-full" />
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-sm">
                  <span className="text-gray-500">Users satisfied</span>
                  <span className="text-green-400 font-semibold">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
