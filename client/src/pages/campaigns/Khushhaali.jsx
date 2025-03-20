import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import khushhaali from "../../assets/k2.webp";

function Khushhaali() {
  const campaignData = {
    title: "Khush-Hali",
    image: khushhaali,
    description: "Promoting true happiness through comprehensive healthcare initiatives and wellness education.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "500+", label: "Patients Helped" },
      { value: "90+", label: "Medical Camps" },
      { value: "50+", label: "Doctors" },
      { value: "100+", label: "Volunteers" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Healthcare for Happiness</h2>
            <p className="text-gray-600">
              Project Khush-Hali is our comprehensive healthcare initiative focused on promoting true happiness 
              through medical camps, children's health programs, and women's health education. We believe that 
              taking care of our wellbeing leads to greater contentment in life and builds stronger communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Medical Camps</h3>
              <p className="text-gray-600">
                Regular health check-ups, consultations, and basic treatment facilities with qualified doctors.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Children's Health</h3>
              <p className="text-gray-600">
                Pediatric care, nutrition guidance, and preventive healthcare for children.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Blood Donation Camp</h3>
              <p className="text-gray-600">
                Regular blood donation drives, donor health check-ups, and awareness about blood donation importance.
              </p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-rose-800 mb-2">Health Education</h3>
              <p className="text-gray-600">
                Awareness sessions, workshops, and healthcare guidance by medical professionals.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Approach</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">1</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Preventive Care</h4>
                  <p className="text-gray-600">Regular health check-ups and early detection of health issues</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">2</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Health Education</h4>
                  <p className="text-gray-600">Empowering communities with knowledge about health and wellness</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">3</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Specialized Care</h4>
                  <p className="text-gray-600">Focused programs for children, women, and specific health needs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Support Healthcare</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Medical Professionals</h4>
                <p className="text-sm">Volunteer your medical expertise at our camps</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Donate</h4>
                <p className="text-sm">Support our medical camps and health programs</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Spread Awareness</h4>
                <p className="text-sm">Help educate communities about health</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Partner</h4>
                <p className="text-sm">Collaborate with us for healthcare initiatives</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Healthcare Initiatives"
  };

  return <CampaignLayout {...campaignData} />;
}

export default Khushhaali;
