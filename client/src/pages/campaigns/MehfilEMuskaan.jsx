import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import mehfilEMuskaan from "../../assets/Mehfilemuskan.png";

function MehfilEMuskaan() {
  const campaignData = {
    title: "Mehfil-E-Muskaan",
    image: mehfilEMuskaan,
    description: "Celebrating talent and creativity through inclusive performances and artistic expression.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "50+", label: "Performers" },
      { value: "5+", label: "Events" },
      { value: "1000+", label: "Audience" },
      { value: "₹20000+", label: "Funds Raised" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Celebrating Talent & Joy</h2>
            <p className="text-gray-600">
              Mehfil-E-Muskaan is our signature cultural initiative that provides a platform for hidden 
              talents to shine. Through open mic events, performances, and artistic showcases, we create 
              an inclusive space where creativity flourishes and confidence grows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rose-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-rose-800 mb-2">Performance Arts</h3>
              <p className="text-gray-600">
                Poetry, singing, storytelling, and musical performances.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Creative Expression</h3>
              <p className="text-gray-600">
                Art exhibitions, photography displays, and creative workshops.
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Cultural Events</h3>
              <p className="text-gray-600">
                Traditional performances, folk arts, and cultural celebrations.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Skill Development</h3>
              <p className="text-gray-600">
                Workshops, mentoring sessions, and performance training.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Impact</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">1</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Building Confidence</h4>
                  <p className="text-gray-600">Helping individuals overcome stage fear and express themselves</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">2</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Cultural Preservation</h4>
                  <p className="text-gray-600">Promoting and preserving traditional art forms</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">3</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Community Building</h4>
                  <p className="text-gray-600">Creating a supportive network of artists and performers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Join the Celebration</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Perform</h4>
                <p className="text-sm">Share your talent on our platform</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Volunteer</h4>
                <p className="text-sm">Help organize events and workshops</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Sponsor</h4>
                <p className="text-sm">Support artists and cultural programs</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Attend</h4>
                <p className="text-sm">Experience the magic of live performances</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Arts & Culture"
  };

  return <CampaignLayout {...campaignData} />;
}

export default MehfilEMuskaan;
