import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Heart, 
  GraduationCap, 
  Sparkles, 
  Rocket, 
  Theater, 
  Bell, 
  MessageCircle, 
  Dog, 
  Leaf,
  Stethoscope,
  BookOpen,
  PenTool
} from "lucide-react";

function Campaigns() {
  const navigate = useNavigate();

  const campaigns = [
    {
      title: "Su-Shiksha Pathshala",
      description: "Providing quality education to underprivileged children for a better future.",
      url: "/campaigns/susikshapathshala",
      color: "from-green-500 to-green-600",
      icon: (props) => (
        <span className="flex items-center gap-2">
          <BookOpen {...props} className="w-8 h-8" />
          <PenTool {...props} className="w-6 h-6" />
        </span>
      )
    },
    {
      title: "Nayi Udaan",
      description: "Empowering youth by supporting their dreams and aspirations for success.",
      url: "/campaigns/nayiudaan",
      color: "from-red-500 to-red-600",
      icon: (props) => <Rocket {...props} />
    },
    {
      title: "Basta The Daily Pathshala",
      description: "Empowering children with daily education, hope, and a brighter tomorrow.",
      url: "/campaigns/basta",
      color: "from-orange-500 to-orange-600",
      icon: (props) => <GraduationCap {...props} />
    },
    {
      title: "Dharti Ki Muskaan",
      description: "Creating a greener future through tree planting and conservation.",
      url: "/campaigns/greenearth",
      color: "from-emerald-500 to-emerald-600",
      icon: (props) => <Leaf {...props} />
    },
    {
      title: "Prem Seva (Animal Care)",
      description: "Nurturing and protecting street animals through feeding programs.",
      url: "/campaigns/streetanimalcare",
      color: "from-amber-500 to-amber-600",
      icon: (props) => <Dog {...props} />
    },
    {
      title: "Jagrukta Abhiyan (Awareness)",
      description: "Raising awareness and fostering understanding of important social issues.",
      url: "/campaigns/jagruktaabhiyan",
      color: "from-indigo-500 to-indigo-600",
      icon: (props) => <Bell {...props} />
    },
    {
      title: "Aao Baat Karein (Mental Health)",
      description: "Facilitating conversations to inspire and drive meaningful social change.",
      url: "/campaigns/aoobatenkarein",
      color: "from-teal-500 to-teal-600",
      icon: (props) => <MessageCircle {...props} />
    },
    {
      title: "Mehfil-e-Muskaan (Fund Raising)",
      description: "Celebrating talent and creativity through inclusive performances.",
      url: "/campaigns/mehfilemuskaan",
      color: "from-pink-500 to-pink-600",
      icon: (props) => <Theater {...props} />
    },
    {
      title: "Nayi Sambhawnayein (Skill Development)",
      description: "Fostering new opportunities by empowering individuals through skill development.",
      url: "/campaigns/nayisambhawnayein",
      color: "from-yellow-500 to-yellow-600",
      icon: (props) => <Sparkles {...props} />
    },
    {
      title: "Khush-Haali (Medical)",
      description: "Promoting true happiness through healthcare initiatives and wellness education.",
      url: "/campaigns/khushhaali",
      color: "from-blue-500 to-blue-600",
      icon: (props) => <Stethoscope {...props} />
    },
    {
      title: "Nari Shakti",
      description: "Empowering women through education, skills development, and support.",
      url: "/campaigns/narishakti",
      color: "from-purple-500 to-purple-600",
      icon: (props) => <Heart {...props} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Campaigns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12"
          >
            Join us in making a difference through our various initiatives
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`bg-gradient-to-r ${campaign.color} p-6`}>
                <div className="text-white mb-4">
                  {campaign.icon({ className: "w-12 h-12 stroke-[1.5]" })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{campaign.title}</h3>
                <p className="text-white/90 text-sm">{campaign.description}</p>
              </div>
              <div className="p-4">
                <button
                  onClick={() => navigate(campaign.url)}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
