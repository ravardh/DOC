import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import aooBatenKarein from "../../assets/aoobatenkarien.png";

function AooBatenKarein() {
  const campaignData = {
    title: "Aoo Baten Karein",
    image: aooBatenKarein,
    description: "Creating safe spaces for mental health discussions and emotional well-being support.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "1000+", label: "People Helped" },
      { value: "15+", label: "Counselors" },
      { value: "60+", label: "Sessions" },
      { value: "24/7", label: "Support" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mental Health Support</h2>
            <p className="text-gray-600">
              Aoo Baten Karein is our mental health initiative that provides a safe and supportive 
              environment for people to discuss their emotional well-being. We believe in breaking 
              the stigma around mental health and providing accessible support to all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Counseling Services</h3>
              <p className="text-gray-600">
                Professional counseling and emotional support sessions.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Support Groups</h3>
              <p className="text-gray-600">
                Regular group sessions for shared experiences and healing.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Approach</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">1</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Safe Space</h4>
                  <p className="text-gray-600">Creating a judgment-free environment for open discussions</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">2</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Professional Support</h4>
                  <p className="text-gray-600">Qualified counselors and mental health professionals</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">3</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Accessibility</h4>
                  <p className="text-gray-600">Both online and offline support options available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Support Mental Health</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Volunteer as a listener
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Support our helpline
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Spread awareness
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Donate for counseling services
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Mental Health"
  };

  return <CampaignLayout {...campaignData} />;
}

export default AooBatenKarein;
