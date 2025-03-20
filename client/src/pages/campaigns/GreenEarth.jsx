import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import greenEarth from "../../assets/grrennindia.jpg";

function GreenEarth() {
  const campaignData = {
    title: "Green Earth Initiative",
    image: greenEarth,
    description: "Creating a greener future through community-driven tree planting and environmental conservation efforts.",
    locations: [
      "Delhi NCR",
      "Haryana",
      "Punjab",
      "Uttar Pradesh"
    ],
    stats: [
      { value: "10000+", label: "Trees Planted" },
      { value: "40+", label: "Green Zones" },
      { value: "200+", label: "Volunteers" },
      { value: "50+", label: "School Programs" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Planting Hope, Growing Future</h2>
            <p className="text-gray-600">
              Our Green Earth Initiative is dedicated to creating a sustainable and greener environment 
              through systematic tree plantation drives. We believe that every tree planted today is a 
              step towards a healthier tomorrow.
            </p>
            <p className="text-gray-600 mt-4">
              Through collaborative efforts with communities, schools, and local authorities, we are 
              working to increase green cover, combat pollution, and create awareness about 
              environmental conservation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Urban Forestry</h3>
              <p className="text-gray-600">
                Creating green spaces within cities through strategic tree plantation in parks and communities.
              </p>
            </div>
            <div className="bg-lime-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-lime-800 mb-2">School Programs</h3>
              <p className="text-gray-600">
                Engaging students in tree plantation and environmental education activities.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Community Gardens</h3>
              <p className="text-gray-600">
                Developing community gardens and encouraging local participation in maintenance.
              </p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Tree Care</h3>
              <p className="text-gray-600">
                Regular maintenance and monitoring of planted trees to ensure their survival and growth.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Approach</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">1</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Site Selection</h4>
                  <p className="text-gray-600">Strategic selection of plantation sites</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">2</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Native Species</h4>
                  <p className="text-gray-600">Planting locally adapted tree species</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">3</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Community Involvement</h4>
                  <p className="text-gray-600">Engaging local communities in plantation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">4</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Monitoring</h4>
                  <p className="text-gray-600">Regular care and growth tracking</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-4">Join the Green Movement</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Plant Trees</h4>
                <p className="text-sm">Participate in our plantation drives</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Donate</h4>
                <p className="text-sm">Support our tree plantation programs</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Educate</h4>
                <p className="text-sm">Spread awareness about environmental conservation</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Maintain</h4>
                <p className="text-sm">Help in tree care and maintenance</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Environmental Impact</h3>
            <p className="text-gray-600">
              Our tree plantation initiatives have significantly contributed to increasing the green cover 
              in urban areas, reducing air pollution, and creating habitats for local wildlife. Each tree 
              planted is a step towards environmental sustainability and a better future for coming generations.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Plant a Tree Today"
  };

  return <CampaignLayout {...campaignData} />;
}

export default GreenEarth; 