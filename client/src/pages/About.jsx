import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../config/api";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import { IoLogoInstagram as Insta } from "react-icons/io5";
import { FaLinkedinIn as LinkedIn } from "react-icons/fa";

const aboutContent = {
  title: "About Us",
  sections: [
    {
      heading: "Who We Are",
      content: (
        <>
          <div className="grid gap-3">
            <p>
              Drops of Change Welfare Society is a registered NGO with a clear
              mission. Our team is working together to educate children in slums
              and settlement areas. We use various campaigns and programmes to
              ensure a child labor free and poverty free India.
            </p>
            <p>
              We are not committed only to teach children. We also give them all
              the basic needs for education like books, school bags, uniforms,
              stationery etc. We want our children to develop in all areas of
              life. Beyond academics our children learn valuable moral and life
              lessons. We even make sure they have fun through creative
              activities, games and sports.
            </p>
            <p>
              As we know, small efforts when done over and over again by many
              people leads to big changes in society. This idea comes from how a
              few drops of rain gather over an area over some time to create a
              pond or a lake.
            </p>
            <p>
              Hence, the creation of the name of our NGO ‘Drops of Change’:
              because every effort no matter how small counts. The NGO has been
              active since January, 2022 under the leadership of the founder of
              the organisation Mr. Vishal Hindustani.
            </p>
          </div>
        </>
      ),
      image: img1,
    },
    {
      heading: "Our Vision",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              Poverty free India where slums and slum dwellers live in better
              communities.
            </li>
            <li>
              When the families are not poor they do not force their children
              into child labor. Hence, we want a child labor free India.
            </li>
            <li>
              To educate young minds to eradicate unemployment due to persistent
              illiteracy. Our reach should be all over India.
            </li>
          </ul>
          <div className="grid gap-3">
            <p>
              Education is a fundamental right, yet many underprivileged
              children are trapped in a cycle of poverty and child labor, forced
              to abandon school early.
            </p>

            <p>
              <strong>
                We all know that India is a land full of talent and untapped
                potential.
              </strong>
            </p>
            <p>
              Do you know how beneficial it would be to our nation if all that
              talent was put to good use?
            </p>
            <p>
              At Drops of Change, we aim to reignite their interest in learning
              and help break this cycle. India is rich in talent and cultural
              heritage — from idol sculpting to embroidery.
            </p>
            <p>
              By nurturing these skills, we can empower children with employable
              talents, preserve traditional crafts, and shape them into future
              leaders who uplift their communities.
            </p>
          </div>
        </>
      ),
      image: img2,
    },
    {
      heading: "Aim",
      content: (
        <>
          <div className="grid gap-3">
            <p>
              We live in a very competitive society. To be ahead in the game we
              need to develop and improve ourselves every day to have a
              competitive edge over others.
            </p>
            <p>
              But the reality is all this requires lots of resources. People
              living in slums are surviving on the bare minimum. How can they
              spare time and money for education?
            </p>
            <p>
              We intend to change that by giving these children better
              opportunities. By upskilling and educating these children through
              our own efforts we increase their chances of survival and allow
              them to express their full potential.
            </p>
            <p>
              In this fast-paced world children from poorer backgrounds need a
              lot of confidence and support and we aim to give that through our
              will and efforts.
            </p>
          </div>
        </>
      ),
      image: img3,
    },
    {
      heading: "Motive",
      content: (
        <>
          <div className="grid gap-3">
            <p>
              Children are the future of society. They can be easily moulded and
              taught to be better human beings and leaders. By changing them, we
              change society and create a better world. Our team has been
              working with this mission to bring positive societal change by
              focusing on these young potential talents and ensuring that they
              give back to the community.
            </p>
            <p>
              At Drops Of Change we believe that only by adding value to the
              life of others can we justify our own existence.
            </p>
            <p>
              Our founder, Mr. Vishal Hindustani, has been set with the aim to
              contribute socially and help people since he was a child.
            </p>
            <p>
              With this motivation we intend to teach our children the same
              moral values by shaping their character which will reflect as they
              take up important positions in society and give back to the
              community. This is the main motivation behind the creation of
              ‘Drops Of Change’.
            </p>
          </div>
        </>
      ),
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
      .get("/api/admin/coreteam")
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
                  <p className="text-gray-600 text-[1rem]">{section.content}</p>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
                  <img
                    src={section.image}
                    alt={section.heading}
                    className="w-full rounded-lg shadow-md "
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16">
            <h2 className="text-4xl font-extrabold text-center text-[#FF6F00] mb-8">
              Meet Our Core Team
            </h2>
            {loading ? (
              <p className="text-center text-xl font-semibold">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreTeam.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 text-center border-2"
                  >
                    <img
                      src={
                        member.profilePhotoPath || "/path/to/default-image.png"
                      }
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto mb-4 border-2"
                    />
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-[#FF6F00]">{member.position}</p>
                    <div className="mt-2 flex justify-center space-x-4">
                      {member.linkedin &&
                        member.linkedin !==
                          "https://www.linkedin.com/company/drops-of-change-welfare-society" && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            <LinkedIn className="h-6 w-6 transition-transform duration-300 hover:scale-125" />
                          </a>
                        )}
                      {member.instagram &&
                        member.instagram !==
                          "https://www.instagram.com/dropsofchange" && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600"
                          >
                            <Insta className="h-6 w-6 transition-transform duration-300 hover:scale-125" />
                          </a>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
