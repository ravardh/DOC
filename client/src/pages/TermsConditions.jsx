import React from "react";
import { motion } from "framer-motion";
import { FileText, AlertCircle, Users, DollarSign, Scale } from "lucide-react";

function TermsConditions() {
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
              <FileText className="h-20 w-20 text-[#FF6F00]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600">
              Drops Of Change Welfare Society
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last Updated: July 10, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Scale className="h-6 w-6 text-[#FF6F00] mr-3" />
                Agreement to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to <strong>Drops Of Change Welfare Society</strong>. By accessing or using 
                our website at <a href="https://dropsofchange.in" className="text-[#FF6F00] font-semibold">
                  dropsofchange.in
                </a>, you agree to be bound by these Terms and Conditions. If you disagree with 
                any part of these terms, please do not use our website.
              </p>
            </section>

            {/* About Us */}
            <section className="bg-orange-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Organization</h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Drops Of Change Welfare Society</strong> is a registered nonprofit 
                organization in India. Our official website is <strong>dropsofchange.in</strong>, 
                and we operate with the mission of empowering underprivileged children and communities 
                through education and social welfare programs.
              </p>
            </section>

            {/* Use of Website */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Website</h2>
              <p className="text-gray-700 mb-3">By using this website, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Use the website only for lawful purposes</li>
                <li>Not engage in any activity that disrupts or interferes with the website</li>
                <li>Not attempt to gain unauthorized access to any portion of the website</li>
                <li>Not transmit any harmful code, viruses, or malicious software</li>
                <li>Respect intellectual property rights</li>
                <li>Provide accurate information when making donations or submitting applications</li>
              </ul>
            </section>

            {/* Donations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-6 w-6 text-[#FF6F00] mr-3" />
                Donations & Payments
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="border-l-4 border-[#FF6F00] pl-4">
                  <h3 className="font-bold mb-2">Donation Policy</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>All donations are voluntary and non-refundable</li>
                    <li>Donations are used exclusively for charitable purposes</li>
                    <li>Tax receipts (80G certificates) will be provided for eligible donations</li>
                    <li>We reserve the right to use donations where they are most needed</li>
                  </ul>
                </div>

                <div className="border-l-4 border-[#FF6F00] pl-4">
                  <h3 className="font-bold mb-2">Payment Processing</h3>
                  <p>
                    Payments are processed through secure third-party payment gateways. We do not 
                    store your credit card or banking information on our servers.
                  </p>
                </div>

                <div className="border-l-4 border-[#FF6F00] pl-4">
                  <h3 className="font-bold mb-2">Refund Policy</h3>
                  <p>
                    Donations are generally non-refundable. However, if a donation was made in error 
                    or due to technical issues, please contact us within 7 days at{" "}
                    <a href="mailto:contactus@dropsofchange.in" className="text-[#FF6F00] font-semibold">
                      contactus@dropsofchange.in
                    </a>. Refund requests will be reviewed on a case-by-case basis.
                  </p>
                </div>
              </div>
            </section>

            {/* Volunteer & Internship */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 text-[#FF6F00] mr-3" />
                Volunteer & Internship Programs
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Applications do not guarantee acceptance into programs</li>
                <li>We reserve the right to accept or reject any application</li>
                <li>Volunteers and interns must comply with our code of conduct</li>
                <li>Participants must respect confidentiality of beneficiary information</li>
                <li>Certificates will be issued only upon successful completion of programs</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                All content on this website, including text, images, logos, videos, and graphics, 
                is the property of <strong>Drops Of Change Welfare Society</strong> or its content 
                creators and is protected by copyright and intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, or create derivative works without our 
                express written permission.
              </p>
            </section>

            {/* User Content */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User-Generated Content</h2>
              <p className="text-gray-700 leading-relaxed">
                When you submit content (such as testimonials, comments, or photos), you grant us 
                a non-exclusive, royalty-free license to use, reproduce, and display such content 
                for promotional and operational purposes.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
                Disclaimers
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>The website is provided "as is" without warranties of any kind</li>
                <li>We do not guarantee uninterrupted or error-free operation</li>
                <li>We are not liable for any direct, indirect, or consequential damages</li>
                <li>External links are provided for convenience; we are not responsible for third-party content</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, <strong>Drops Of Change Welfare Society</strong> 
                shall not be liable for any damages arising from the use or inability to use this website, 
                including but not limited to loss of data, revenue, or profits.
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your use of this website is also governed by our{" "}
                <a href="/privacy-policy" className="text-[#FF6F00] font-semibold hover:underline">
                  Privacy Policy
                </a>. Please review it to understand how we collect and use your information.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions are governed by the laws of India. Any disputes shall 
                be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes 
                will be effective immediately upon posting. Your continued use of the website 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                For questions regarding these Terms and Conditions, please contact:
              </p>
              <div className="space-y-2">
                <p><strong>Drops Of Change Welfare Society</strong></p>
                <p>Email: <a href="mailto:contactus@dropsofchange.in" className="underline font-semibold">
                  contactus@dropsofchange.in
                </a></p>
                <p>Phone: <a href="tel:+919138322232" className="font-semibold">+91-91383-22232</a></p>
                <p>Address: Village Khojkipur, House No. 30, Ward No. 12, Ambala, Haryana - 133001, India</p>
                <p className="mt-4 text-sm opacity-90">
                  Official Website: <a href="https://dropsofchange.in" className="underline font-semibold">
                    dropsofchange.in
                  </a>
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm pt-6 border-t">
              <p>© {new Date().getFullYear()} Drops Of Change Welfare Society. All rights reserved.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TermsConditions;
