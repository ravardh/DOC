import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Campaigns() {
  const navigate = useNavigate();

  const campaigns = [
    {
      title: "Su-Siksha Pathshala",
      description:
        "Providing educational opportunities in underserved areas, rekindling educational aspirations among children in poverty.",
      url: "/campaigns/su-siksha-pathshala",
    },
    {
      title: "Nayi Udaan",
      description:
        "Adopting children to finance their education, stationery, and uniforms, ensuring they aren't deprived of education.",
      url: "/campaigns/nayi-udaan",
    },
    {
      title: "Nari Shakti",
      description:
        "Celebrating and empowering women, emphasizing their strength and contributions to society.",
      url: "/campaigns/nari-shakti",
    },
    {
      title: "Mehfil-E-Muskaan",
      description:
        "Bringing joy and happiness through cultural programs, entertainment, and community engagement.",
      url: "/campaigns/mehfil-e-muskaan",
    },
    {
      title: "Khush-haali",
      description:
        "Promoting true happiness through medical camps, addressing children's health, and education on topics like girls' menstrual health.",
      url: "/campaigns/khushhaali",
    },
    {
      title: "Jagrukata Abhiyan",
      description:
        "Spreading awareness on crucial social issues, promoting informed decision-making and responsible citizenship.",
      url: "/campaigns/jagrukata-abhiyan",
    },
    {
      title: "Aao Baat Karein",
      description:
        "Encouraging open conversations about mental health, breaking stigmas, and promoting emotional well-being.",
      url: "/campaigns/aao-baat-karein",
    },
    {
      title: "Nayi Sambhawnayein",
      description:
        "Creating new opportunities for skill development and employment, empowering individuals for a better future.",
      url: "/campaigns/nayi-sambhawnayein",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Our Campaigns
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(campaign.url)}
              >
                <h2 className="text-2xl font-semibold mb-4 text-[#FF6F00]">
                  {campaign.title}
                </h2>
                <p className="text-gray-600">{campaign.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Campaigns;
