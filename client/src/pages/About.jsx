import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../config/api";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const aboutContent = {
  title: "About Us",
  sections: [
    {
      heading: "Who We Are",
      content:
        "The founder of the organization, Vishal Hindustani has been working in the society since the year 2017 for the education of the children living in slums and settlements, he and his team have been doing social service work since 2017 even in the dreadful situation like Corona.He believes that small efforts can bring big changes in the society which may be the reason why he named the organization “Drops of Change” means, just like few drops of rain become a lake and a pond, similarly big changes can be brought in the society by small efforts. Since January 2022 the NGO has been working towards educating underprivileged children in slums & settlements.",
      image: img1,
    },
    {
      heading: "Our Vision",
      content:
        "Through Drops of change, we want to work in the field of education all over the country. We intend to create an equitable society and education has the power to put a dent in this endeavor. The children of slum areas are put to work at young ages and discontinue their education due to financial constraints. Drops of Change aspires to rekindle their desire to start schooling again. An enlightened citizen lays the premise for a developed nation ahead. Kids today are the leaders of tomorrow. We wish to uplift underserved households socially and economically by imparting education to the young ones and making them responsible so that future generations can lead the overall development of their families and, eventually, the country. There is no shortage of talent in India. Handicrafts such as sculpting idols, embroidery, quilt stitching, etc., are integral to our country’s rich heritage. Youngsters interested in this area deserve equal attention, and ‘Drops of change’ is striving hard to encourage them. We aim to eliminate the skill gap and help them become employable.",
      image: img2,
    },
    {
      heading: "Aim",
      content:
        "We are currently aiming to improve the lives of marginalized societies. A sizable portion of our community lacks the key resources to move ahead and prosper in their lives. In today’s fast-paced life, constant learning and improving oneself are indispensable. We wish to create better possibilities for disadvantaged communities by upskilling and educating their little ones. We aspire to maximize their chances of survival in this rapidly moving world and cope with reality better.",
      image: img3,
    },
    {
      heading: "Motive",
      content:
        "The founder, Mr. Vishal Hindustani, has had his heart set on contributing socially and helping people since childhood. He believes that adding value to others’ life is the only way to justify yours. This mindset elicited the desire to establish his own NGO and bring like-minded people together. He and his team have been working toward the mission since then. He also believes that changing and molding children’s minds is comparatively easy. And if we wish to bring positive societal changes, we must set our sights on the younger crowd. Shaping their character and teaching moral values to them will eventually reflect in the overall society in the longer run. These two combined form the basic why and wherefore of “Drops Of Change.”",
      image: img4,
    },
  ],
};

function About() {
  const [coreTeam, setCoreTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/core-team")
      .then((response) => {
        setCoreTeam(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">{aboutContent.title}</h1>
          <div className="space-y-12">
            {aboutContent.sections.map((section, index) => (
              <motion.div
                key={index}
                className={`flex flex-col gap-5 md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center bg-white rounded-lg shadow-lg p-6 md:p-10`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-semibold text-[#FF6F00] mb-4">{section.heading}</h2>
                  <p className="text-gray-600 text-lg">{section.content}</p>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
                  <img src={section.image} alt={section.heading} className="w-full rounded-lg shadow-md " />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16">
            <h2 className="text-4xl font-extrabold text-center text-[#FF6F00] mb-8">Meet Our Core Team</h2>
            {loading ? (
              <p className="text-center text-xl font-semibold">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreTeam.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center border-2">
                    <img
                      src={member.profilePhotoPath || "/path/to/default-image.png"}
                      alt={member.name}
                      className="w-48 h-60 rounded-lg mx-auto mb-4 border-2"
                    />
                    <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-[#FF6F00]">{member.position}</p>
                    <div className="mt-2 flex justify-center space-x-4">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">LinkedIn</a>
                      )}
                      {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600">Instagram</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-center text-[#FF6F00] mt-8 text-3xl font-semibold">
              “It is literally true that you can succeed best and quickest by helping others to succeed.”
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
