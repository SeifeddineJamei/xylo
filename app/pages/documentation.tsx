export default function Documentation() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Documentation</h1>
        
        <div className="space-y-8 text-gray-400">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
            <p>Welcome to DevFlow! This documentation will help you get started with our platform.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Installation</h2>
            <p>To install DevFlow, run:</p>
            <pre className="bg-[#111] p-4 rounded-lg mt-2 text-sm font-mono">
npm create @devflow/app --template=enterprise
            </pre>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Configuration</h2>
            <p>DevFlow uses a simple configuration file. You can customize your setup by editing the config file.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">API Reference</h2>
            <p>Our API allows you to integrate DevFlow into your existing workflows. Here are the main endpoints:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><code className="bg-[#111] px-2 py-1 rounded">GET /api/users</code> - Get all users</li>
              <li><code className="bg-[#111] px-2 py-1 rounded">POST /api/projects</code> - Create a new project</li>
              <li><code className="bg-[#111] px-2 py-1 rounded">GET /api/deployments</code> - List deployments</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Examples</h2>
            <p>Here are some examples of how to use DevFlow:</p>
            <pre className="bg-[#111] p-4 rounded-lg mt-2 text-sm font-mono">
<span className="text-purple-400">import</span> <span className="text-red-300">{"{ Handler }"}</span> <span className="text-purple-400">from</span> <span className="text-green-300">'@devflow/core'</span>;
<br />
<br />
<span className="text-purple-400">const</span> user = <span className="text-blue-400">await</span> Handler.getUser(<span className="text-green-300">id</span>);
<br />
console.log(user);
            </pre>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Support</h2>
            <p>If you need help, please reach out to our support team or join our Discord community.</p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <a href="/" className="text-indigo-400 hover:text-indigo-300">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
