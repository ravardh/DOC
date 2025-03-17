import React from 'react';
import { ArrowRight, Users, School, Heart, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import hero from "../assets/hero.webp"
import { useNavigate } from 'react-router-dom';
import BreakingNews from '../components/breakingNews';

function Home() {
  const navigate = useNavigate();
  return (

    <>
    <BreakingNews/>
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`
        }}
      >
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Education is a Fundamental Right
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join us in making quality education accessible to every child
            </motion.p>
            <motion.button 
              className="bg-[#FF6F00] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FF8F00] transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => navigate("/support/donate")}
            >
              Sponsor A Child
            </motion.button>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: School,
                title: "Kids Education",
                description: "Providing on-site classes and primary education to underprivileged children"
              },
              {
                icon: Heart,
                title: "Support Homeless",
                description: "Transitioning children from labor to education, asserting education as a child's right"
              },
              {
                icon: Users,
                title: "Sponsor a Child",
                description: "Facilitating donations to support individual children's education"
              },
              {
                icon: Briefcase,
                title: "Skill Development",
                description: "Offering programs to equip students with skills, deterring them from begging"
              }
            ].map((initiative, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <initiative.icon className="h-12 w-12 text-[#80CBC4] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
                <button className="mt-4 text-[#FF6F00] flex items-center hover:text-[#FF8F00]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-[#80CBC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "1000+", label: "Children Sponsored" },
              { number: "5000+", label: "Children Associated" },
              { number: "2000+", label: "Active Sponsors" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-xl">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default Home;