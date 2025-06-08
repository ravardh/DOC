import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import sushiksha from "../../assets/su2.webp";

function SuSikshaPathshala() {
  const campaignData = {
    title: "Sushiksha Pathshala",
    image: sushiksha,
    description: "Empowering underprivileged children through quality education and creating pathways to brighter futures.",
    locations: [
     "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "800+", label: "Children Educated" },
      { value: "4", label: "Cities" },
      { value: "50+", label: "Volunteers" },
      { value: "10+", label: "Adopted Children" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Su Shiksha Pathshala</h2>
            <p className="text-gray-600 mb-4">
              Su Shiksha Pathshala started in January 2022 because we believe every child should get an education, no matter where they live or how poor they are. Our aim is to help kids in poor areas get basic learning.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#FF6F00] mb-4">The Problem</h2>
            <p className="text-gray-600 mb-2">
              Even with many efforts, many children in India still find it hard to read and write. The <b>ASER 2024</b> report says only <b>23.4%</b> of Class 3 students in government schools can read a Class 2-level book. This shows a big gap in learning at an early age.
            </p>
            <p className="text-gray-600 mb-4">
              Also, many kids from slum areas never start school or drop out early due to a lack of financial resources.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#FF6F00] mb-4">Our Solution</h2>
            <p className="text-gray-600 mb-2">
              Su Shiksha Pathshala helps improve learning in government schools. We hope to give these children a second chance at education. We run free tuition and support programs for children of all ages. We check what each child knows and help them in the areas they are weak.
            </p>
            <p className="text-gray-600 mb-4">
              We teach children based on what they already understand. This way, they can build strong basics before moving to harder lessons.
            </p>
          </div>

          <div className="md:flex md:space-x-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#FF6F00] mb-4">Our Approach</h2>
              <p className="text-gray-600 mb-2">
                Our volunteers teach in the slums of Ambala, Panchkula, Chandigarh, Karnal, and Delhi. They hold classes every weekend to help children catch up and feel confident in school.
              </p>
              <p className="text-gray-600 mb-4">
                Since many children miss school due to money issues, we want to make sure every child can <b>"Learn Without Limits, Grow Without Gaps.”</b>
              </p>
            </div>
            <div className="flex-1 bg-[#FF6F00] shadow-md rounded-lg p-4 mt-3 md:mt-0">
              <h3 className="text-2xl font-semibold text-black mb-4">Our Impact So Far</h3>
              <ul className="list-disc ml-6 text-white/80 mb-4">
                <li>We have so far educated over <b>800+</b> children across Ambala, Chandigarh and Panchkula and we plan to expand more.</li>
                <li>We have adopted over <b>10+</b> children by funding their education fully.</li>
                <li>We are working with over <b>50+</b> volunteers/mentors over 4 different cities.</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl border border-orange-100">
            <h3 className="text-xl font-semibold text-[#FF6F00] mb-3">How Can You Help Us?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><b>Sponsor a child's education:</b> If you can fund a child’s education, he will be able to support themselves and their family by becoming an integral part of society. This goes a long way to bring people out of poverty.</li>
              <li><b>Volunteer as a teacher:</b> If you have skills you want to share or even teach these children it will help them find a better future and opportunities.</li>
              <li><b>Donate educational materials:</b> Children need stationery, books, bags, water bottles, uniforms etc. If you or anyone you know can help out in these areas, please do. These kids just need enough study materials to complete their education. And by doing this you ensure they are able to continue their education.</li>
              <li><b>Expansion:</b> If you are experienced in the educational field you can share your expertise and advise on how to further expand this initiative.</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <p className="text-gray-600 italic">
              Each child is a work of art. If we keep them in the right conditions and set the right environment for their growth, we can help them come out of a life of poverty and free them from conditions like child labor.
            </p>
            <p className="text-gray-600 mt-2">
              We hope this campaign started by Drops Of Change is able to touch the lives of many underprivileged children and help them bring them and their families out of the cycle of poverty.
            </p>
            <p className="text-gray-600 mt-2">
              <b>Su-Siksha Pathshala</b> will continue to do its work to ensure these children are able to support themselves and not lose their childhood.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Sponsor A Child"
  };

  return <CampaignLayout {...campaignData} />;
}

export default SuSikshaPathshala;
