import React from "react";
import { ArrowRight, Users, School, Heart, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import hero from "../assets/hero.webp";
import { Link, useNavigate } from "react-router-dom";
import BreakingNews from "../components/breakingNews";
import ImageSliderWithCurtain from "../components/imageCurtain";
import { FaFileAlt } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <BreakingNews />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section
          className="relative h-[600px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
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
        {/* Adjust the ImageSliderWithCurtain section */}
        <section className="w-full">
          <div className="max-w-full px-2 sm:px-4">
            <ImageSliderWithCurtain />
          </div>
        </section>

        {/* Initiatives Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="text-5xl md:text-5xl font-bold mb-4">
                Drops of Change Welfare Society
              </div>
              <div className="text-xl md:text-xl font-bold mb-4">
                NGO For Education | Help Underprivileged Kids.
              </div>
              <p className="text-xl text-gray-600">
                असतो मा सद्गमय । तमसो मा ज्योतिर्गमय
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: School,
                  title: "KIDS EDUCATION",
                  description:
                    "Provide on site classes / Primary education / Formal education to underprivileged / slum kids.",
                  navigate: "/campaigns/susikshapathshala",
                  color: "bg-[#FF6F00]",
                },
                {
                  icon: Heart,
                  title: "SUPPORT HOMELESS",
                  description:
                    "A gateway from child labour to education. Education is a child's right and it can be never denied.",
                  navigate: "/campaigns/jagruktaabhiyan",
                  color: "bg-[#FF6F00]",
                },
                {
                  icon: Users,
                  title: "SPONSOR A CHILD",
                  description:
                    "Donate For Child Education. Sponsor a Child. Donate Online. Because education is for everyone.",
                  navigate: "/campaigns/nayiudaan",
                  color: "bg-[#FF6F00]",
                },
                {
                  icon: Briefcase,
                  title: "SKILL DEVELOPMENT",
                  description:
                    "Help students to learn various skill development programs so that they don't indulge in begging.",
                  navigate: "/campaigns/nayisambhawnayein",
                  color: "bg-[#FF6F00]",
                },
              ].map((initiative, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(initiative.navigate)}
                >
                  <div
                    className={`${initiative.color} h-full p-8 text-white cursor-pointer`}
                  >
                    <initiative.icon className="h-16 w-16 mb-6 transform group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold mb-4">
                      {initiative.title}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {initiative.description}
                    </p>
                    <div className="mt-6 flex items-center text-white/90 group-hover:text-white transition-colors">
                      <span className="mr-2 text-xl font-bold">Learn More</span>
                      <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center text-2xl text-[#FF6F00] font-bold">
              We are a team of change-makers who believe that every helping hand
              can raise a child and create a better future for them.
            </div>
          </div>
        </section>

        {/* Social Media Feed Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Latest Updates
              </h2>
              <p className="text-xl text-gray-600">
                Follow us on social media to stay updated with our activities
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Facebook Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-[800px]"
              >
                <div className="h-full">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdropsofchange&tabs=timeline&width=500&height=800&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="100%"
                    height="100%"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </motion.div>

              {/* Instagram Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-[800px]"
              >
                <div className="h-full">
                  <iframe
                    src="https://www.instagram.com/dropsofchange/embed"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                  ></iframe>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center space-x-6">
                <a
                  href="https://www.facebook.com/dropsofchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#FF6F00] hover:text-[#FF8F00] transition-colors bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg"
                >
                  <span className="font-semibold">Follow us on Facebook</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/dropsofchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#FF6F00] hover:text-[#FF8F00] transition-colors bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg"
                >
                  <span className="font-semibold">Follow us on Instagram</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </motion.div>
            <div className="text-center mt-8 grid gap-2">
              <div className="text-lg">
                A famous Spanish writer Miguel de Cervantes once said :-
              </div>
              <div className="italic text-[#FF6F00] text-lg">
                ”Never stand begging for that which you have the power to earn.”
              </div>
              <div className="text-lg font-bold">
                We envision creating a well-educated and skillful society where
                no one has to beg to fulfill their bare essentials.
              </div>
              <div className="text-lg font-bold">
                We envision our country as a better place to live in.
              </div>
            </div>
            <div className="text-center mt-8 w-1/2 mx-auto">
              <Link
                to="/publications"
                className="flex items-center justify-center gap-2 bg-[#FF6F00] text-white px-6 py-3 rounded-lg hover:bg-[#FF8F00] transition-colors duration-300"
              >
                <FaFileAlt className="w-5 h-5" />
                <span>Explore Our Publications</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 bg-[#80CBC4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { number: "34+", label: "Children Sponsored" },
                { number: "900+", label: "Children Associated" },
                { number: "20+", label: "Active Sponsors" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-white "
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
