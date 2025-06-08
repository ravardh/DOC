import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import nayiUdaan from "../../assets/NayiUdan.png";

function NayiUdaan() {
  const campaignData = {
    title: "Nayi Udaan",
    image: nayiUdaan,
    description:
      "Mentoring, educating, and guiding youth from poor backgrounds to break the cycle of child labor and build a brighter future.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula",
    ],
    stats: [
      { value: "50+", label: "Students Supported" },
      { value: "5+", label: "Career Programs" },
      { value: "30+", label: "Mentors" },
      { value: "90%", label: "Success Rate" },
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-700 mb-4">
              “History will judge us by the difference we make in the everyday
              lives of children.”
              <br />
              <span className="text-sm">- Nelson Mandela</span>
            </blockquote>
            <p className="text-gray-600 mb-4">
              Did you know around{" "}
              <b>
                1 in 10 children in child labor around the world are from India?
              </b>{" "}
              This fact alone should move all Indian citizens to be a part of a
              massive change to improve the lives of children. Because a society
              that neglects its children is a society without a soul.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About Nayi Udaan
            </h2>
            <p className="text-gray-600 mb-4">
              Nayi Udaan is one such campaign that has taken upon itself to
              mentor, educate, and give career counselling guidance to our youth
              from very poor backgrounds.
            </p>
            <p className="text-gray-600 mb-4">
              Our main aim in this campaign is to support students financially.
              Many students are unable to pay their tuition fees. As a result,
              they cannot complete their education. With our help, they can at
              least have an education which will give them further access to
              opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Educational Support
              </h3>
              <p className="text-gray-600">
                For students who are less financially able, we provide
                scholarships so they can continue their studies. Without this
                support, they would be forced to work or do some sort of
                activity related to child labor. We also provide them with study
                materials, which can get very expensive. To make sure they do
                well in their studies, we also provide them with academic
                guidance to show them support.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Career Counselling & Guidance
              </h3>
              <p className="text-gray-600">
                We conduct workshops for career planning and professional
                counselling. This helps our children decide which profession is
                the right fit for their talents.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">
              How You Can Support Us
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Sponsor a Child’s Education
                </h4>
                <p className="text-sm">
                  If even one child is saved from child labor through education,
                  they can give back to their community and help others around
                  them. Even one child educated can save a whole community.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Become a Mentor</h4>
                <p className="text-sm">
                  If you can’t give money, why not give us some of your time and
                  expertise? If you have a skill you want to share or even
                  advise related to academics and careers, you could help guide
                  a child towards a more successful journey towards a better
                  future.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Provide Internship Opportunities
                </h4>
                <p className="text-sm">
                  Maybe you work or own a company or know someone who works at
                  or owns a company that can provide valuable experience for our
                  children to further their career options. An internship can go
                  a long way to help improve their skills and turn them into
                  valuable assets for our society.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Donate Educational Resources
                </h4>
                <p className="text-sm">
                  Even if you can’t do the above 3, you can always donate
                  educational materials like books, stationeries, school bags,
                  water bottles, uniforms etc. so that these children do not
                  have to worry for all their material needs related to
                  education.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-orange-100 shadow-lg rounded-2xl p-8 mt-8 flex flex-col items-center text-center border border-orange-200">
            
            <h3 className="text-2xl font-bold text-orange-700 mb-2">
              Inspiring the Future
            </h3>
            <p className="text-gray-700 text-lg mb-2">
              Children are our hope for the future. If we give them hope and
              support, we ensure that the world ahead of us will be full of
              bright and compassionate souls who care and work for others.
            </p>
            <p className="text-gray-600 mb-2">
              Let us inspire goodness and kindness in the minds of these young
              and impressionable children.
            </p>
            <p className="text-orange-600 font-semibold italic">
              Please support us in any way you can. Even a little help goes a
              long way to inspire change in the lives of these young minds.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Youth Education",
  };

  return <CampaignLayout {...campaignData} />;
}

export default NayiUdaan;
