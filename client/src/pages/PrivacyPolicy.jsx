import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Lock className="h-20 w-20 text-[#FF6F00]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Drops Of Change Welfare Society
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Effective Date: Jan 30, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-[#FF6F00] mr-3" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Drops Of Change Welfare Society</strong> ("we," "our," or "us") is 
                committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website{" "}
                <a href="https://dropsofchange.in" className="text-[#FF6F00] font-semibold">
                  dropsofchange.in
                </a>, use our services, or interact with us.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-[#FF6F00] mr-3" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="border-l-4 border-[#FF6F00] pl-4">
                  <h3 className="font-bold text-lg mb-2">Personal Information</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Name, email address, phone number</li>
                    <li>Donation information and payment details</li>
                    <li>Volunteer and internship application information</li>
                    <li>Contact form submissions</li>
                  </ul>
                </div>

                <div className="border-l-4 border-[#FF6F00] pl-4">
                  <h3 className="font-bold text-lg mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-[#FF6F00] mr-3" />
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>To process donations and issue tax receipts</li>
                <li>To communicate about our programs and activities</li>
                <li>To process volunteer and internship applications</li>
                <li>To respond to inquiries and provide customer service</li>
                <li>To send newsletters and updates (with your consent)</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share information with:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Service Providers:</strong> Payment processors, email service providers, 
                and other vendors who assist our operations</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>With Your Consent:</strong> When you have given explicit permission</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="bg-orange-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="h-6 w-6 text-[#FF6F00] mr-3" />
                Your Rights
              </h2>
              <p className="text-gray-700 mb-3">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website uses cookies to enhance user experience. You can control cookie 
                settings through your browser preferences. Disabling cookies may limit some 
                functionality of the website.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible 
                for the privacy practices of these external sites. We encourage you to review 
                their privacy policies.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to children under 13. We do not knowingly collect 
                personal information from children. If you believe we have collected information 
                from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on 
                this page with an updated effective date. We encourage you to review this policy 
                periodically.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Drops Of Change Welfare Society</strong></p>
                <p>Email: <a href="mailto:contactus@dropsofchange.in" className="underline font-semibold">
                  contactus@dropsofchange.in
                </a></p>
                <p>Phone: <a href="tel:+919138322232" className="font-semibold">+91-91383-22232</a></p>
                <p>Address: Village Khojkipur, House No. 30, Ward No. 12, Ambala, Haryana - 133001, India</p>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm pt-6 border-t">
              <p>© {new Date().getFullYear()} Drops Of Change Welfare Society. All rights reserved.</p>
              <p className="mt-2">Official Website: <a href="https://dropsofchange.in" className="text-[#FF6F00]">dropsofchange.in</a></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
