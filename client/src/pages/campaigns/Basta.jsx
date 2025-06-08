import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import basta from "../../assets/BastaImage.jpg"; // Add the image path if available

function Basta() {
  const campaignData = {
    title: "Basta: The Daily Pathshala Campaign",
    image: basta, // Add an image if available, e.g. require("../../assets/basta.jpg")
    description:
      "Empowering children with daily education, hope, and a brighter tomorrow.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula",
    ],
    stats: [
      { value: "30", label: "Children Currently Enrolled" },
      { value: "100+", label: "Hours of Personalized Teaching" },
      { value: "6+", label: "Creative & Life Skills Taught" },
      { value: "100%", label: "Attendance Rate" },
    ],
    content: (
      <>
        <div className="space-y-6">
          <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-700 bg-orange-50 p-4 rounded-lg shadow mb-4">
            “The beautiful thing about learning is that no one can take it away
            from you.”
            <br />
            <span className="text-sm">– B.B. King</span>
          </blockquote>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 mb-4">
              Most children in slum areas get very poor quality or no education
              at all. This is because of:
            </p>
            <ul className="list-disc ml-6 text-gray-600 mb-4">
              <li>Irregular classes in government schools</li>
              <li>Watching TV/mobile phone leading to low attention spans</li>
              <li>Malnutrition</li>
              <li>Lack of resources for buying books and stationary</li>
              <li>No parental support</li>
              <li>Lack of motivation to study</li>
            </ul>
            <p className="text-gray-600 mb-4">
              As a result, children in slum areas fall behind in their
              education. Keeping this in mind, Drops Of Change and its founder
              decided to work on a solution.
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:space-x-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">
                Basta - The Daily Pathshala
              </h2>
              <p className="text-gray-700 mb-4">
                Basta is a great initiative by our founder, Mr. Vishal. It is
                aimed at educating underprivileged children in Mahesh Nagar,
                Ambala, with the inspiring motto <b>"From Slum to Home"</b>.
                This journey is a change from a life of poverty and limited
                opportunities to one of hope, empowerment, and limitless
                possibilities. It's a ray of hope that guides these young minds
                towards a brighter future. Here they can unlock their full
                potential and become valuable contributors to society.
              </p>
            </div>
            <div className="flex-1 mt-6 md:mt-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Holistic Approach
              </h3>
              <ul className="list-disc ml-6 text-gray-700 mb-2">
                <li>Creative skills</li>
                <li>Public speaking skills</li>
                <li>Writing skills</li>
                <li>Critical thinking</li>
                <li>Problem-solving</li>
                <li>Emotional intelligence</li>
              </ul>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              Impact So Far
            </h3>
            <p className="text-gray-600 mb-2">
              At the moment we have three bright and curious students. Anjali,
              Viruj, and Kailash. They are thriving under Mr. Vishal's guidance.
              Each has their unique personalities, strengths, and weaknesses.
            </p>
            <ul className="list-disc ml-6 text-gray-600 mb-4">
              <li>
                <b>Kailash</b> is a budding artist who loves to color. He once
                showcased his vibrant masterpiece to Mr. Vishal, who praised his
                creativity.
              </li>
              <li>
                <b>Anjali</b> is a fashionista with a flair for dressing up but
                struggles to find the same enthusiasm for studies.
              </li>
              <li>
                <b>Viruj</b> is a bright student who excels in school. He faces
                challenges in differentiating between Hindi vowels and
                consonants.
              </li>
            </ul>
            <p className="text-gray-600">
              Teaching these children requires patience, dedication, and a deep
              understanding of their individual needs and personalities.
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white mt-6">
            <h3 className="text-xl font-semibold mb-4">
              How Can You Support This Campaign?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-white text-base">
              <li>
                <b>Sponsor a child's education:</b> Donate money and help them
                afford an education.
              </li>
              <li>
                <b>Volunteer as a teacher:</b> Even a few hours of your valuable
                time to share your knowledge and skills can be crucial in making
                these children succeed.
              </li>
              <li>
                <b>Donate educational materials:</b> You can donate books,
                stationeries, uniforms or even water bottles.
              </li>
              <li>
                <b>Help us expand:</b> If you have experience in this field, you
                can help us identify new areas for expansion.
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-orange-200 to-yellow-100 shadow-lg rounded-2xl p-8 mt-8 flex flex-col items-center text-center border border-orange-300">
            <h3 className="text-2xl font-bold text-orange-700 mb-2">
              A Mentor's Dedication
            </h3>
            <p className="text-gray-700 text-lg mb-2">
              Mr. Vishal has been deeply dedicated and passionate about
              empowering these young minds. His commitment is creating positive
              change in the lives of underprivileged children, helping them
              receive proper guidance, support, and opportunities to grow into
              valuable members of society.
            </p>
            <p className="text-orange-600 font-semibold italic mb-2">
              His selfless efforts and empathy for their struggles are a
              testament to his belief that education is the key to unlocking
              every child's full potential.
            </p>
            <p className="text-gray-600">
              Let's continue on this journey of discovery and growth, inspired
              by the resilience, creativity, and enthusiasm of our young
              students.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Daily Pathshala",
  };

  return <CampaignLayout {...campaignData} />;
}

export default Basta;
