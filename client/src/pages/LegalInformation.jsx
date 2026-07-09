import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Building, Calendar, MapPin, Hash } from "lucide-react";

function LegalInformation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="h-20 w-20 text-[#FF6F00]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Legal Information & Registration
            </h1>
            <p className="text-xl text-gray-600">
              Official registration details and legal compliance information
            </p>
          </div>

          {/* Official Name Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Drops Of Change Welfare Society
              </h2>
              <p className="text-lg text-gray-600">
                Registered Nonprofit Organization in India
              </p>
              <div className="mt-4 inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full font-semibold">
                ✓ Officially Registered
              </div>
            </div>

            {/* Registration Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-3">
                  <Building className="h-6 w-6 text-[#FF6F00] mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Organization Type</h3>
                </div>
                <p className="text-gray-700">Society</p>
                <p className="text-sm text-gray-500 mt-1">Haryana Registration and Regulation of Societies Act, 2012</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-3">
                  <Calendar className="h-6 w-6 text-[#FF6F00] mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Registration Date</h3>
                </div>
                <p className="text-gray-700">March 30, 2022</p>
                <p className="text-sm text-gray-500 mt-1">Registered with Registrar of Societies, Haryana</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-3">
                  <MapPin className="h-6 w-6 text-[#FF6F00] mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Registered Address</h3>
                </div>
                <p className="text-gray-700">
                  Village Khojkipur, House No. 30<br />
                  Ward No. 12, Ambala<br />
                  Haryana - 133001, India
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-3">
                  <Hash className="h-6 w-6 text-[#FF6F00] mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Official Domain</h3>
                </div>
                <p className="text-gray-700 font-semibold">dropsofchange.in</p>
                <p className="text-sm text-gray-500 mt-1">Primary official website</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-3">
                  <FileText className="h-6 w-6 text-[#FF6F00] mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Society Registration No.</h3>
                </div>
                <p className="text-gray-700 font-semibold">HR002202200648</p>
                <p className="text-sm text-gray-500 mt-1">Registered in Ambala, Haryana</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-[#FF6F00] mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">NGO Darpan ID</h3>
                </div>
                <p className="text-gray-700 font-semibold">HR/2022/0317100</p>
                <p className="text-sm text-gray-500 mt-1">NITI Aayog Registration (June 20, 2022)</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <div className="flex items-center mb-3">
                  <FileText className="h-6 w-6 text-[#FF6F00] mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">PAN Number</h3>
                </div>
                <p className="text-gray-700 font-semibold">AAETD0782E</p>
                <p className="text-sm text-gray-500 mt-1">Permanent Account Number</p>
              </div>
            </div>
          </div>

          {/* Tax Exemptions & Certifications */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-7 w-7 text-[#FF6F00] mr-3" />
              Tax Exemptions & Certifications
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50">
                <h3 className="font-bold text-lg text-gray-900">12A Registration</h3>
                <p className="text-gray-600">
                  Income Tax Exemption Certificate under Section 12A of the Income Tax Act, 1961
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-700">
                    <strong>Unique Registration Number:</strong> AAETD0782EE20221
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Document ID:</strong> AAETD0782EE2022101
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Application Number:</strong> 649022100030622
                  </p>
                  <p className="text-sm text-green-700 font-semibold mt-2">
                    ✓ Status: Registered & Active
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50">
                <h3 className="font-bold text-lg text-gray-900">80G Certification</h3>
                <p className="text-gray-600">
                  Tax deduction benefits for donors under Section 80G of the Income Tax Act
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-700">
                    <strong>Unique Registration Number:</strong> AAETD0782EF20221
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Document ID:</strong> AAETD0782EF2022101
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Application Number:</strong> 803012410141122
                  </p>
                  <p className="text-sm text-green-700 font-semibold mt-2">
                    ✓ Status: Provisionally Approved
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-[#FF6F00] pl-6 py-3">
                <h3 className="font-bold text-lg text-gray-900">NGO Darpan Registration</h3>
                <p className="text-gray-600">
                  Registered on the NITI Aayog NGO Darpan portal
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Darpan ID: <strong className="text-gray-700">HR/2022/0317100</strong>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Registration Date: June 20, 2022
                </p>
              </div>
            </div>
          </div>

          {/* Office Bearers Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Building className="h-7 w-7 text-[#FF6F00] mr-3" />
              Office Bearers
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 text-center">
                <div className="bg-[#FF6F00] bg-opacity-10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Building className="h-8 w-8 text-[#FF6F00]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vishal Verma</h3>
                <p className="text-[#FF6F00] font-semibold">President</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 text-center">
                <div className="bg-[#FF6F00] bg-opacity-10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-[#FF6F00]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Navneet Kaur</h3>
                <p className="text-[#FF6F00] font-semibold">Secretary</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 text-center">
                <div className="bg-[#FF6F00] bg-opacity-10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#FF6F00]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Himanshu Jain</h3>
                <p className="text-[#FF6F00] font-semibold">Treasurer</p>
              </div>
            </div>
          </div>

          {/* Mission & Purpose */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Mission & Purpose
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                <strong>Drops Of Change Welfare Society</strong> is dedicated to creating 
                lasting positive change in Indian society through:
              </p>
              <ul className="space-y-2 mb-4">
                <li>Providing quality education to underprivileged children</li>
                <li>Eliminating child labor through education and awareness</li>
                <li>Skill development programs for youth empowerment</li>
                <li>Women empowerment through education and vocational training</li>
                <li>Community development and social welfare initiatives</li>
                <li>Animal welfare and environmental conservation</li>
              </ul>
              <p>
                The organization operates with full transparency and accountability, 
                maintaining all required legal compliances and regulatory standards.
              </p>
            </div>
          </div>

          {/* Transparency & Contact */}
          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Transparency & Accountability</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Drops Of Change Welfare Society is committed to operating with complete 
              transparency. All our activities, financial records, and impact reports 
              are maintained according to legal requirements and nonprofit best practices.
            </p>
            <div className="bg-white bg-opacity-20 rounded-xl p-6">
              <h3 className="font-bold text-xl mb-3">For Legal Inquiries</h3>
              <p className="mb-2">
                Email: <a href="mailto:contactus@dropsofchange.in" className="font-semibold underline">
                  contactus@dropsofchange.in
                </a>
              </p>
              <p className="mb-2">
                Phone: <a href="tel:+919138322232" className="font-semibold">
                  +91-91383-22232
                </a>
              </p>
              <p className="text-sm mt-4 opacity-90">
                For verification of registration details or legal documentation, 
                please contact us directly.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>This page was last updated on July 10, 2026</p>
            <p className="mt-2">
              Official Website: <a href="https://dropsofchange.in" className="text-[#FF6F00] font-semibold">
                dropsofchange.in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LegalInformation;
