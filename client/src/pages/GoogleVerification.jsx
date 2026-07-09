import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Globe, Phone, MapPin } from "lucide-react";

function GoogleVerification() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Official Organization Verification
            </h1>
            <p className="text-xl text-gray-600">
              Google Workspace for Nonprofits Verification Page
            </p>
          </div>

          {/* Official Statement */}
          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Official Domain Confirmation
            </h2>
            <p className="text-lg leading-relaxed text-center">
              <strong>Drops Of Change Welfare Society</strong> confirms that{" "}
              <strong className="underline">dropsofchange.in</strong> is its official website 
              and email domain. This page has been created for verification purposes for 
              Google Workspace for Nonprofits.
            </p>
          </div>

          {/* Organization Details */}
          <div className="space-y-8">
            <div className="border-l-4 border-[#FF6F00] pl-6 py-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Registered Organization Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Registered Legal Name</p>
                    <p className="text-lg font-bold text-gray-900">
                      Drops Of Change Welfare Society
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <Globe className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Official Domain</p>
                    <p className="text-lg font-bold text-gray-900">
                      dropsofchange.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Official Email</p>
                    <p className="text-lg font-bold text-gray-900">
                      contactus@dropsofchange.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Official Phone</p>
                    <p className="text-lg font-bold text-gray-900">
                      +91-91383-22232
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Registered Office</p>
                    <p className="text-lg font-bold text-gray-900">
                      Village Khojkipur, House No. 30, Ward No. 12<br />
                      Ambala, Haryana - 133001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">NGO Darpan ID</p>
                    <p className="text-lg font-bold text-gray-900">
                      HR/2022/0317100
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Society Registration No.</p>
                    <p className="text-lg font-bold text-gray-900">
                      HR002202200648
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF6F00] bg-opacity-10 p-3 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-[#FF6F00]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">PAN Number</p>
                    <p className="text-lg font-bold text-gray-900">
                      AAETD0782E
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Organization Type
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Drops Of Change Welfare Society</strong> is a registered nonprofit 
                organization in India, dedicated to empowering underprivileged children and 
                communities through education, skill development, and social welfare programs.
              </p>
            </div>

            {/* Tax Certifications */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Tax Exemption Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="font-bold text-gray-900 mb-2">12A Registration</p>
                  <p className="text-sm text-gray-600 mb-1">Reg. No: AAETD0782EE20221</p>
                  <p className="text-xs text-green-600 font-semibold">✓ Active</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="font-bold text-gray-900 mb-2">80G Certification</p>
                  <p className="text-sm text-gray-600 mb-1">Reg. No: AAETD0782EF20221</p>
                  <p className="text-xs text-green-600 font-semibold">✓ Approved</p>
                </div>
              </div>
            </div>

            {/* Verification Statement */}
            <div className="border-2 border-[#FF6F00] rounded-xl p-6 bg-orange-50">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Verification Statement
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This page serves as official confirmation that <strong>dropsofchange.in</strong> is 
                the sole official website and primary domain of <strong>Drops Of Change Welfare Society</strong>. 
                All official communications, donations, and organizational activities are conducted through 
                this domain and associated email addresses (@dropsofchange.in).
              </p>
            </div>

            {/* Date Stamp */}
            <div className="text-center text-gray-500 text-sm pt-6 border-t">
              <p>This verification page was created on July 10, 2026</p>
              <p className="mt-2">
                For any verification queries, please contact:{" "}
                <a 
                  href="mailto:contactus@dropsofchange.in" 
                  className="text-[#FF6F00] font-semibold hover:underline"
                >
                  contactus@dropsofchange.in
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GoogleVerification;
