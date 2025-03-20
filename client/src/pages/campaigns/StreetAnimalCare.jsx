import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import streetAnimalCare from "../../assets/streetanimal.jpg";

function StreetAnimalCare() {
  const campaignData = {
    title: "Paws & Care",
    image: streetAnimalCare,
    description: "Nurturing and protecting our street animals through community-driven feeding programs and healthcare initiatives.",
    locations: [
      "Delhi NCR",
      "Haryana",
      "Punjab",
      "Uttar Pradesh"
    ],
    stats: [
      { value: "500+", label: "Animals Fed Daily" },
      { value: "30+", label: "Feeding Points" },
      { value: "100+", label: "Volunteers" },
      { value: "1000+", label: "Medical Aids" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compassion for Street Animals</h2>
            <p className="text-gray-600">
              Our street animal care initiative focuses on providing regular meals and essential care to stray dogs, 
              cows, and other street animals. We believe that every living being deserves compassion, care, and 
              the basic necessity of food.
            </p>
            <p className="text-gray-600 mt-4">
              Through our dedicated network of volunteers and feeding points across the city, we ensure that 
              no street animal goes hungry. We also provide basic medical care and emergency services when needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Daily Feeding Program</h3>
              <p className="text-gray-600">
                Regular feeding schedules at designated points across the city, ensuring consistent meals for street animals.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Medical Support</h3>
              <p className="text-gray-600">
                Basic healthcare, vaccinations, and emergency medical assistance for injured animals.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Community Engagement</h3>
              <p className="text-gray-600">
                Educating communities about animal welfare and encouraging local participation in feeding programs.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Shelter Support</h3>
              <p className="text-gray-600">
                Providing temporary shelter during extreme weather conditions and for injured animals.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Focus Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">1</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Street Dogs</h4>
                  <p className="text-gray-600">Regular feeding and basic healthcare for stray dogs</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">2</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Cows</h4>
                  <p className="text-gray-600">Nutritious feed and care for abandoned cows</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">3</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Emergency Care</h4>
                  <p className="text-gray-600">24/7 response for injured or sick animals</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-[#FF6F00] text-white text-sm font-bold">4</div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Community Support</h4>
                  <p className="text-gray-600">Engaging locals in animal welfare activities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-4">How You Can Help</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Volunteer</h4>
                <p className="text-sm">Join our feeding program as a volunteer</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Donate</h4>
                <p className="text-sm">Support our food and medical supplies</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Spread Awareness</h4>
                <p className="text-sm">Help educate others about animal welfare</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Adopt</h4>
                <p className="text-sm">Give a forever home to a street animal</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Impact</h3>
            <p className="text-gray-600">
              Through our consistent efforts and the support of our community, we have been able to create a 
              sustainable feeding program that ensures regular meals for hundreds of street animals. Our work 
              has not only improved their health and well-being but has also fostered a more compassionate 
              society that cares for its voiceless members.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Street Animals"
  };

  return <CampaignLayout {...campaignData} />;
}

export default StreetAnimalCare; 