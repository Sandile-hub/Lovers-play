import React from 'react';

const About = () => {
  return (
    <div className="pb-4">
      <div className="mt-6 text-center">
        <span className="text-8xl">❤️</span>
        <h2 className="font-playfair text-2xl font-bold mt-2">Lovers Play</h2>
        <p className="text-gray-600 text-sm">Games Made for Lovers</p>
        
        {/* Overview */}
        <div className="mt-6 glass rounded-[32px] p-6 text-left space-y-4">
          <div>
            <h4 className="font-bold">🎮 6 Addictive Games</h4>
            <p className="text-sm text-gray-600">From quizzes to dares, there's something for every couple.</p>
          </div>
          <div>
            <h4 className="font-bold">📱 No Download Needed</h4>
            <p className="text-sm text-gray-600">Play directly in your browser, works on WhatsApp too.</p>
          </div>
          <div>
            <h4 className="font-bold">🔒 100% Private</h4>
            <p className="text-sm text-gray-600">All data stays on your device. No sign-ups, no tracking.</p>
          </div>
          <div>
            <h4 className="font-bold">💼 Built with Love</h4>
            <p className="text-sm text-gray-600">Proudly developed by SELEC-DORCO (PTY) LTD – © 2026 All Rights Reserved.</p>
          </div>
        </div>

        {/* Legal & Terms Section */}
        <div className="mt-6 glass rounded-[32px] p-6 text-left space-y-4">
          <h3 className="text-xl font-bold text-center">⚖️ Legal & Terms</h3>
          <p className="text-xs text-gray-500 text-center">Please read our policies carefully before using the app.</p>

          <details className="group border-b border-gray-200 pb-3">
            <summary className="flex justify-between items-center cursor-pointer font-semibold text-sm py-2">
              <span>📄 Terms of Service</span>
              <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              By accessing "Lovers Play", you agree to use the app solely for personal entertainment purposes. 
              You must be at least <strong>18 years of age</strong> to use the "Explicit" (Crazy) game mode. 
              The company does not tolerate illegal, malicious, or abusive use of the platform. 
              We reserve the right to update these terms at any time.
            </p>
          </details>

          <details className="group border-b border-gray-200 pb-3">
            <summary className="flex justify-between items-center cursor-pointer font-semibold text-sm py-2">
              <span>🔒 Privacy Policy</span>
              <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              We respect your privacy. <strong>We do not track you, we do not collect your personal data, and we do not use cookies.</strong> 
              All names, photos, and inputs are processed locally on your device using browser storage (like localStorage). 
              When you download a slideshow image, it is generated entirely on your phone or computer and is never uploaded to a server.
            </p>
          </details>

          <details className="group border-b border-gray-200 pb-3">
            <summary className="flex justify-between items-center cursor-pointer font-semibold text-sm py-2">
              <span>⚠️ User Responsibility & Disclaimer</span>
              <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              "Lovers Play" is intended for consenting adults. The "Spicy" and "Crazy" game modes contain explicit and suggestive content. 
              By selecting these modes, you confirm that both users have consented to the prompts. 
              The company is <strong>not liable</strong> for any emotional distress, awkwardness, or disputes that may arise between partners during gameplay. 
              Always play responsibly and respect your partner's boundaries.
            </p>
          </details>

          <details className="group pb-0">
            <summary className="flex justify-between items-center cursor-pointer font-semibold text-sm py-2">
              <span>🛡️ Intellectual Property</span>
              <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              The "Lovers Play" name, logo, game code, and design elements are the exclusive property of <strong>SELEC-DORCO (PTY) LTD</strong>. 
              You may not copy, modify, distribute, or sell any part of this app without explicit written permission from the company. 
              All third-party music links are the property of their respective owners.
            </p>
          </details>
        </div>

        {/* Contact & Support */}
        <div className="mt-6 glass rounded-[32px] p-6 text-left">
          <h3 className="text-lg font-bold text-center mb-2">📞 Contact Us</h3>
          <p className="text-xs text-gray-600 text-center">For support, feedback, or legal inquiries, please reach out to us.</p>
          <div className="flex justify-center mt-4">
            <a href="mailto:sandiledr100@gmail.com" className="bg-pink text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition">
              ✉️ sandiledr100@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-6">
          <span className="badge-gold">❤️ Made for lovers in the kasi and beyond</span>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          © 2026 SELEC-DORCO (PTY) LTD. All Rights Reserved.
          <br />Designed with love for the modern couple.
        </p>
      </div>
    </div>
  );
};

export default About;