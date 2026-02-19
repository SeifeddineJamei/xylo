"use client";

import React, { useState } from "react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("install");

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
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
            Ship faster with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              modular architecture
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop rebuilding the wheel. Integrate flexible, pre-optimized components into your workflow in under 5 minutes.
          </p>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-left shadow-2xl shadow-indigo-500/10 max-w-2xl mx-auto mb-10">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="font-mono text-sm md:text-base">
              <p className="text-gray-500"># Initialize your project</p>
              <p className="text-purple-400">npm create</p>{" "}
              <span className="text-yellow-300">@Xylo/app</span>{" "}
              <span className="text-gray-300">--template=enterprise</span>
              <br />
              <p className="text-gray-500 mt-2"># Install dependencies</p>
              <p className="text-blue-400">npm install</p>
              <br />
              <p className="text-gray-500"># Start the engine</p>
              <span className="text-green-400">npm run dev</span>{" "}
              <span className="text-gray-500">➜ Local: http://localhost:3000/</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-indigo-500/25 w-full sm:w-auto">
              Download Starter Kit
            </button>
            <button className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all w-full sm:w-auto">
              Read Documentation
            </button>
          </div>
        </div>
      </section>

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

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to scale
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Focus on your business logic. We handle the infrastructure, security, and deployment headaches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Type-Safe by Default",
                desc: "End-to-end type safety out of the box. No more `any` types or runtime errors.",
                icon: "⚡",
              },
              {
                title: "API-First Design",
                desc: "Full programmatic control. Manage your entire data structure via REST or GraphQL.",
                icon: "🔌",
              },
              {
                title: "Global Edge Network",
                desc: "Deploy to 35+ regions automatically. Latency less than 50ms anywhere.",
                icon: "🌍",
              },
              {
                title: "Zero Config",
                desc: "Sensible defaults that work. Override only when you need to.",
                icon: "⚙️",
              },
              {
                title: "Real-time Sync",
                desc: "Websockets enabled by default. Keep your clients in sync effortlessly.",
                icon: "🔄",
              },
              {
                title: "Plugin System",
                desc: "Extend core functionality with our robust community-driven plugin ecosystem.",
                icon: "🧩",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/30 transition-colors group"
              >
                <div className="text-3xl mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CODE DEMO SECTION --- */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Less boilerplate.
              <br />
              <span className="text-indigo-400">More logic.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Writing backend code shouldn't feel like a chore. Our declarative syntax reduces 100 lines of spaghetti code into 10 lines of clarity.
            </p>
            <ul className="space-y-4">
              {[
                "Automatic validation",
                "Built-in authentication",
                "Database migrations",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-red-400 font-semibold">
                  The Old Way
                </p>
                <div className="bg-[#111] p-5 rounded-xl border border-white/10 text-sm font-mono text-gray-400">
                  <div className="text-gray-600">// 50 lines of config</div>
                  <br />
                  <span className="text-purple-400">const</span> db ={" "}
                  <span className="text-blue-400">connect</span>(url);
                  <br />
                  <span className="text-purple-400">const</span> user ={" "}
                  <span className="text-blue-400">await</span> db.query(
                  <span className="text-green-300">"SELECT..."</span>);
                  <br />
                  <span className="text-purple-400">if</span> (!user){" "}
                  <span className="text-blue-400">throw</span>{" "}
                  <span className="text-green-300">Error</span>();
                  <br />
                  <span className="text-blue-400">await</span> saveToCache(user);
                  <br />
                  <span className="text-blue-400">return</span> user;
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-green-400 font-semibold">
                  With Xylo
                </p>
                <div className="bg-[#111] p-5 rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/10 text-sm font-mono text-gray-300">
                  <div className="text-gray-600">// 1 line of code</div>
                  <br />
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-red-300">{"{ Handler }"}</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-300">'@Xylo/core'</span>;
                  <br />
                  <br />
                  <span className="text-purple-400">const</span> user ={" "}
                  <span className="text-blue-400">await</span> Handler.getUser(
                  <span className="text-green-300">id</span>);
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-400">
              No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col">
              <h3 className="text-xl font-semibold text-white">Hobby</h3>
              <div className="text-3xl font-bold text-white mt-4 mb-2">$0</div>
              <p className="text-gray-500 text-sm mb-6">Perfect for side projects</p>
              <ul className="space-y-3 text-sm text-gray-400 mb-8 flex-1">
                <li className="flex gap-2">✓ 1 Project</li>
                <li className="flex gap-2">✓ Community Support</li>
                <li className="flex gap-2">✓ 1GB Storage</li>
              </ul>
              <button className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors">
                Start for Free
              </button>
            </div>

            <div className="p-8 rounded-2xl border border-indigo-500 bg-[#111] relative flex flex-col shadow-xl shadow-indigo-900/20">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <div className="text-3xl font-bold text-white mt-4 mb-2">$29</div>
              <p className="text-gray-500 text-sm mb-6">For serious developers</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-8 flex-1">
                <li className="flex gap-2">✓ Unlimited Projects</li>
                <li className="flex gap-2">✓ Priority Email Support</li>
                <li className="flex gap-2">✓ 100GB Storage</li>
                <li className="flex gap-2">✓ Advanced Analytics</li>
              </ul>
              <button className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors font-semibold">
                Get Started
              </button>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col">
              <h3 className="text-xl font-semibold text-white">Team</h3>
              <div className="text-3xl font-bold text-white mt-4 mb-2">$99</div>
              <p className="text-gray-500 text-sm mb-6">For agencies & teams</p>
              <ul className="space-y-3 text-sm text-gray-400 mb-8 flex-1">
                <li className="flex gap-2">✓ Everything in Pro</li>
                <li className="flex gap-2">✓ 5 Team Members</li>
                <li className="flex gap-2">✓ SSO & Audit Logs</li>
                <li className="flex gap-2">✓ Dedicated Support</li>
              </ul>
              <button className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors">
                Contact Sales
              </button>
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
            © 2024 Xylo. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Twitter
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              GitHub
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Discord
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
