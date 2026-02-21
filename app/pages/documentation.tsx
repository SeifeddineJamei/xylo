export default function Documentation() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              {"</>"}
            </div>
            <span className="text-white font-semibold text-lg">Xylo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="#getting-started" className="text-gray-400 hover:text-white transition-colors">Getting Started</a>
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-gray-400 text-lg mb-12">
          Everything you need to know about using our digital products.
        </p>
        
        <div className="space-y-12">
          {/* Getting Started */}
          <section id="getting-started">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 text-sm">01</span>
              Getting Started
            </h2>
            <div className="ml-11 space-y-6">
              <p className="text-gray-400">
                Welcome! We're excited to have you. This guide will help you get up and running with our digital product in just a few minutes.
              </p>
              
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-medium mb-3">What You'll Get</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Full source files and documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Step-by-step setup guide
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Lifetime updates and support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Example projects and templates
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 text-sm">02</span>
              Quick Start Guide
            </h2>
            <div className="ml-11 space-y-6">
              <p className="text-gray-400">
                Follow these simple steps to start using your digital product:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Download Your Files</h4>
                    <p className="text-gray-400 text-sm">After purchase, you'll receive a download link. Click to download the ZIP file containing all your product files.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Extract the Files</h4>
                    <p className="text-gray-400 text-sm">Unzip the downloaded file to your preferred location on your computer.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Open & Explore</h4>
                    <p className="text-gray-400 text-sm">Open the main file in your preferred application (code editor, design tool, etc.) and start exploring!</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">4</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Customize & Use</h4>
                    <p className="text-gray-400 text-sm">Make it yours! Customize colors, content, and features to match your needs.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* File Structure */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 text-sm">03</span>
              File Structure
            </h2>
            <div className="ml-11">
              <p className="text-gray-400 mb-4">
                Here's an overview of what's included in your download:
              </p>
              
              <div className="bg-[#111] border border-white/10 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                <div className="text-gray-500">your-product/</div>
                <div className="ml-4 text-indigo-400">├── 📁 source/</div>
                <div className="ml-8 text-gray-400">├── Main project files</div>
                <div className="ml-4 text-indigo-400">├── 📁 examples/</div>
                <div className="ml-8 text-gray-400">├── Example implementations</div>
                <div className="ml-4 text-indigo-400">├── 📁 docs/</div>
                <div className="ml-8 text-gray-400">├── Detailed documentation</div>
                <div className="ml-4 text-indigo-400">├── 📁 assets/</div>
                <div className="ml-8 text-gray-400">├── Images, fonts, icons</div>
                <div className="ml-4 text-indigo-400">└── 📄 README.md</div>
                <div className="ml-8 text-gray-400">└── Quick start guide</div>
              </div>
            </div>
          </section>

          {/* Customization */}
          <section id="features">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 text-sm">04</span>
              Customization
            </h2>
            <div className="ml-11 space-y-6">
              <p className="text-gray-400">
                Our digital products are designed to be easily customizable. Here's how you can personalize your purchase:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <h4 className="text-white font-medium mb-2">Colors & Themes</h4>
                  <p className="text-gray-400 text-sm">Most products use CSS variables or config files for easy color customization.</p>
                </div>
                <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <h4 className="text-white font-medium mb-2">Content</h4>
                  <p className="text-gray-400 text-sm">Update text, images, and content to match your brand or needs.</p>
                </div>
                <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <h4 className="text-white font-medium mb-2">Features</h4>
                  <p className="text-gray-400 text-sm">Enable or disable features through configuration files.</p>
                </div>
                <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <h4 className="text-white font-medium mb-2">Layout</h4>
                  <p className="text-gray-400 text-sm">Adjust layouts and spacing to fit your specific requirements.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 text-sm">05</span>
              Support & Help
            </h2>
            <div className="ml-11 space-y-6">
              <p className="text-gray-400">
                We're here to help! If you have any questions or need assistance:
              </p>
              
              <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Email Support</h4>
                    <p className="text-gray-400 text-sm mb-3">Get help within 24 hours</p>
                    <a href="mailto:support@xylo.com" className="text-indigo-400 hover:text-indigo-300 text-sm">support@xylo.com</a>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Documentation</h4>
                    <p className="text-gray-400 text-sm mb-3">Browse our detailed guides</p>
                    <span className="text-gray-500 text-sm">You're here!</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <p className="text-amber-400 text-sm">
                  <strong>Note:</strong> Please include your order number when contacting support for faster assistance.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400 text-sm">06</span>
              Frequently Asked Questions
            </h2>
            <div className="ml-11 space-y-4">
              <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-medium mb-2">Can I use this product for commercial projects?</h4>
                <p className="text-gray-400 text-sm">Yes! Our products come with a commercial license that allows you to use them in unlimited personal and commercial projects.</p>
              </div>
              
              <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-medium mb-2">Do I get lifetime updates?</h4>
                <p className="text-gray-400 text-sm">Absolutely! You'll receive free lifetime updates to your purchased product, including new features and improvements.</p>
              </div>
              
              <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-medium mb-2">Can I resell this product?</h4>
                <p className="text-gray-400 text-sm">The basic license is for end-use only. If you're interested in reselling or white-labeling, please contact us for extended licensing options.</p>
              </div>
              
              <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-medium mb-2">What if I need help with customization?</h4>
                <p className="text-gray-400 text-sm">We offer customization services at an additional cost. Reach out to our support team with your requirements and we'll be happy to help.</p>
              </div>
              
              <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-medium mb-2">How do I download my purchase?</h4>
                <p className="text-gray-400 text-sm">After completing your purchase on Gumroad, you'll receive an email with your download link. You can also access your purchases directly from your Gumroad library.</p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10">
          <a href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">← Back to Home</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 Xylo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
