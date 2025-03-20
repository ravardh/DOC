import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import sushiksha from "../../assets/su2.webp";

function SuSikshaPathshala() {
  const campaignData = {
    title: "Sushiksha Pathshala",
    image: sushiksha,
    description: "Empowering underprivileged children through quality education and creating pathways to brighter futures.",
    locations: [
      "Ambala",
      "Panchkula",
      "Karnal",
      "Delhi"
    ],
    stats: [
      { value: "500+", label: "Children Educated" },
      { value: "4", label: "Cities" },
      { value: "50+", label: "Volunteers" },
      { value: "8", label: "Adopted Children" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Sushiksha Pathshala is committed to providing educational opportunities in every corner of the country, 
              particularly those areas that are deprived of learning resources. We aspire to reach every corner of 
              the country's slums and re-ignite the educational aspirations of children living in poverty.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
            <p className="text-gray-600">
              Unfortunately, many kids from these areas either never start school or drop out early. Through its 
              initiatives, Sushiksha Pathshala hopes to give these children a second chance at education and 
              provide them with brighter futures.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-gray-600">
              Our volunteers visit slums and identify places where classes can be held each weekend. We strive to 
              use creative methods for teaching, motivating the children to make sure no one is left behind when 
              it comes to education – a true blessing for humanity!
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Supporting Underprivileged Children</h2>
            <p className="text-gray-600">
              Many children lack essential resources and are subject to financial difficulties. They are either 
              forced to quit their studies or never attend school. The NGO makes sure that no such child is 
              deprived of education.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Nayi Udaan</h2>
            <p className="text-gray-600">
              Under its project Nayi Udaan, the organization has adopted eight children for one year with an 
              intent to finance their education, stationery, and uniform. The project is currently at its 
              introductory stage. We hope to adopt more children in the future and be the harbinger of a new 
              era of educated societies with better opportunities.
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
            <h3 className="text-xl font-semibold text-[#FF6F00] mb-3">How You Can Help</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Sponsor a child's education</li>
              <li>Volunteer as a teacher</li>
              <li>Donate educational materials</li>
              <li>Help us identify new areas for expansion</li>
            </ul>
          </div>
        </div>
      </>
    ),
    callToAction: "Sponsor A Child"
  };

  return <CampaignLayout {...campaignData} />;
}

export default SuSikshaPathshala;
