import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import nayiSambhawnayein from "../../assets/nayisamb.png";

function NayiSambhawnayein() {
  const campaignData = {
    title: "Nayi Sambhawnayein",
    image: nayiSambhawnayein,
    description: "Creating new possibilities and opportunities for underprivileged communities through education and skill development.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "500+", label: "Lives Impacted" },
      { value: "10+", label: "Programs" },
      { value: "30+", label: "Volunteers" },
      { value: "3", label: "Centers" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Initiative</h2>
            <p className="text-gray-600">
              Nayi Sambhawnayein is dedicated to creating new possibilities for underprivileged communities 
              through various educational and skill development programs. We believe in the power of 
              education and training to transform lives and create sustainable change.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Join Our Mission</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Support our educational programs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Volunteer as a mentor
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Donate resources and materials
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Help us expand our reach
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Our Initiative"
  };

  return <CampaignLayout {...campaignData} />;
}

export default NayiSambhawnayein;