import type { Route } from "./+types/terms-and-conditions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - Xylo" },
    { name: "description", content: "Terms of Service for Xylo" },
  ];
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-400">
          <p>Last updated: 2026</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Xylo, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily use Xylo for personal, non-commercial transitory viewing only.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
            <p>The materials on Xylo's website are provided on an 'as is' basis. Xylo makes no warranties, expressed or implied.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
            <p>In no event shall Xylo be liable for any damages arising out of the use or inability to use the materials on the website.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us.</p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <a href="/" className="text-indigo-400 hover:text-indigo-300">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
