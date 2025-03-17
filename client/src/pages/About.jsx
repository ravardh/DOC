import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import vishal from "../assets/Vishal.webp";
import preeti from "../assets/preeti.webp";
import navneet from "../assets/navneet.webp";
import sidharth from "../assets/Sidharth.webp";
import ayush from "../assets/Ayush.webp";
import raj from "../assets/Raj-Vardhan.webp";
import himanshu from "../assets/Himanshu.webp";
import jatin from "../assets/Jatin-Verma.webp";
import sanchit from "../assets/Sanchit.webp";
import rahul from "../assets/Rahul.webp";
import shubham from "../assets/shubham.webp";
import alok from "../assets/Alok.webp";
import vishal_k from "../assets/Vishal-kohli.webp";


const aboutContent = {
  title: "About Us",
  sections: [
    {
      heading: "Who We Are",
      content:
        "We are a team of change-makers who believe that every helping hand can raise a child and create a better future for them. The founder of the organization, Vishal Hindustani, has been working in society since 2017 for the education of children living in slums and settlements. He and his team have been engaged in social service work since then, even during dire situations like the COVID-19 pandemic.",
      image: img1,
    },
    {
      heading: "Our Vision",
      content:
        "A poverty-free India where slums and dumps are a thing of the past. We aim to work in the field of education across the country, striving to create an equitable society where education drives transformation. Many children in slum areas are forced into labor at a young age due to financial constraints. Drops of Change aspires to reignite their passion for schooling.",
      image: img2,
    },
    {
      heading: "Aim",
      content:
        "We focus on improving the lives of marginalized communities. A significant portion of our society lacks essential resources needed to move ahead. In today’s fast-paced world, continuous learning and self-improvement are crucial. Our goal is to enhance their chances of survival and success by providing better education and skill development.",
      image: img3,
    },
    {
      heading: "Motive",
      content:
        "The founder, Mr. Vishal Hindustani, has always been passionate about contributing to society and helping those in need. He believes that shaping children's minds is easier than changing adults. If we aim to bring positive change, we must focus on the younger generation. These principles form the foundation of Drops of Change.",
      image: img4,
    },
  ],
  team: [
    { name: "Vishal Hindustani", role: "President/Founder", image: vishal },
    { name: "Preeti Verma", role: "Chair Women", image: preeti },
    { name: "Navneet Kaur", role: "Vice Chairperson", image: navneet },
    { name: "Sidharth Gautam", role: "Vice President", image: sidharth },
    { name: "Ayush Singh Dogra", role: "General Secretary", image: ayush },
    { name: "Raj Vardhan", role: "Joint Secretary", image: raj },
    { name: "Himanshu Jain", role: "Treasurer", image: himanshu },
    { name: "Jatin Verma", role: "Executive Member", image: jatin },
    { name: "Sanchit Gupta", role: "Executive Member", image: sanchit },
    { name: "Rahul Yaduvanshi", role: "Executive Member", image: rahul },
    { name: "Shubham Behal", role: "Executive Member", image: shubham },
    { name: "Alok Mishra", role: "Executive Member", image: alok },
    { name: "Vishal Kohli", role: "Executive Member", image: vishal_k },
  ],
};

function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
            {aboutContent.title}
          </h1>
          <div className="space-y-12">
            {aboutContent.sections.map((section, index) => (
              <motion.div
                key={index}
                className={`flex flex-col gap-5 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center bg-white rounded-lg shadow-lg p-6 md:p-10`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-semibold text-[#FF6F00] mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-gray-600 text-lg">{section.content}</p>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
                  <img
                    src={section.image}
                    alt={section.heading}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16">
            <h2 className="text-4xl font-extrabold text-center text-[#FF6F00] mb-8">
              Meet Our Team

            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutContent.team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 text-center"
                >
                  <img
                    src={member.image || "/path/to/default-image.png"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-[#FF6F00]">{member.role}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[#FF6F00] mt-8 text-3xl font-semibold">
              “It is literally true that you can succeed best and quickest by
              helping others to succeed.”
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
