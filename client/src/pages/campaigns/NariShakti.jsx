import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import nariShakti from "../../assets/Narishakti.webp";

function NariShakti() {
  const campaignData = {
    title: "Nari Shakti",
    image: nariShakti,
    description: "Celebrating and empowering the vital force of feminine strength, resilience, and determination that shapes our world.",
    locations: [
    "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "1000+", label: "Women/Girls Empowered" },
      { value: "50+", label: "Programs" },
      { value: "20+", label: "Communities" },
      { value: "30+", label: "Success Stories" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Power of Women</h2>
            <p className="text-gray-600">
              Nari Shakti, or the power of women, is a vital force that has been shaping the world for centuries. 
              It is the embodiment of feminine strength, resilience, and determination. Through Nari Shakti, we 
              celebrate the incredible capabilities of women and their immense contributions to society.
            </p>
            <p className="text-gray-600 mt-4">
              Nari Shakti is not just about women's empowerment; it's about recognizing and honoring the 
              intrinsic value of women's presence in our lives. It's about acknowledging the countless ways 
              women enrich our communities, families, and workplaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Education & Opportunities</h3>
              <p className="text-gray-600">
                Providing access to quality education and creating pathways for career advancement.
              </p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-rose-800 mb-2">Breaking Stereotypes</h3>
              <p className="text-gray-600">
                Challenging gender norms and promoting equality in all spheres of life.
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Safety & Well-being</h3>
              <p className="text-gray-600">
                Ensuring women's health, safety, and overall well-being through targeted programs.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Community Support</h3>
              <p className="text-gray-600">
                Building supportive networks and fostering an encouraging environment.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">1</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Equality and Inclusivity</h4>
                  <p className="text-gray-600">Promoting equal opportunities and inclusive practices</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">2</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Respect and Dignity</h4>
                  <p className="text-gray-600">Ensuring respect and dignity for all women</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">3</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Empowerment</h4>
                  <p className="text-gray-600">Creating opportunities for growth and development</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">4</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Celebration</h4>
                  <p className="text-gray-600">Recognizing and celebrating women's achievements</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-4">Join Our Mission</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Volunteer</h4>
                <p className="text-sm">Support our women empowerment programs</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Mentor</h4>
                <p className="text-sm">Guide and inspire other women</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Partner</h4>
                <p className="text-sm">Collaborate on women-centric initiatives</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Spread Awareness</h4>
                <p className="text-sm">Help promote gender equality and women's rights</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              By instilling these values, we can create a world where women are valued, respected, and 
              empowered to reach their full potential. Let us continue to celebrate and honor Nari Shakti, 
              and work towards a brighter future for all.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Women Empowerment"
  };

  return <CampaignLayout {...campaignData} />;
}

export default NariShakti;
