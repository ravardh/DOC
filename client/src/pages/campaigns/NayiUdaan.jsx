import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import nayiUdaan from "../../assets/NayiUdan.png";

function NayiUdaan() {
  const campaignData = {
    title: "Nayi Udaan",
    image: nayiUdaan,
    description: "Empowering youth to soar high through education, mentorship, and career guidance.",
    locations: [
      "Delhi",
      "Haryana",
      "Punjab",
      "Uttar Pradesh"
    ],
    stats: [
      { value: "200+", label: "Students Supported" },
      { value: "15+", label: "Career Programs" },
      { value: "40+", label: "Mentors" },
      { value: "90%", label: "Success Rate" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Nayi Udaan</h2>
            <p className="text-gray-600">
              Nayi Udaan is our flagship youth empowerment program that focuses on providing educational 
              support, career guidance, and mentorship to young individuals from underprivileged backgrounds. 
              We believe in nurturing talent and creating pathways to success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Education Support</h3>
              <p className="text-gray-600">
                Providing scholarships, study materials, and academic guidance.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Career Guidance</h3>
              <p className="text-gray-600">
                Professional counseling and career planning workshops.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Support Our Youth</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Sponsor a student's education
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Become a mentor
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Provide internship opportunities
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Donate educational resources
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Youth Education"
  };

  return <CampaignLayout {...campaignData} />;
}

export default NayiUdaan;