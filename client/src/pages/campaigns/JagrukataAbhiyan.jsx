import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import jagrukataAbhiyan from "../../assets/JagrukataAbhiyan.png";

function JagrukataAbhiyan() {
  const campaignData = {
    title: "Jagrukata Abhiyan",
    image: jagrukataAbhiyan,
    description: "Raising awareness and empowering communities through education and social consciousness.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "5000+", label: "People Reached" },
      { value: "10+", label: "Awareness Camps" },
      { value: "8+", label: "Partner NGOs" },
      { value: "100+", label: "Volunteers" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Awareness</h2>
            <p className="text-gray-600">
              Jagrukata Abhiyan is our comprehensive awareness campaign that focuses on educating 
              communities about various social issues, health concerns, and educational opportunities. 
              We believe that awareness is the first step towards positive change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Health Awareness</h3>
              <p className="text-gray-600">
                Regular health camps and educational sessions on hygiene and wellness.
              </p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Social Issues</h3>
              <p className="text-gray-600">
                Workshops and campaigns on important social topics.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Join Our Campaign</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Organize awareness camps
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Volunteer as a speaker
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Support our outreach programs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Help spread awareness
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Our Campaign"
  };

  return <CampaignLayout {...campaignData} />;
}

export default JagrukataAbhiyan;
