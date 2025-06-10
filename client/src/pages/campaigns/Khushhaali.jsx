import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import khushhaali from "../../assets/k2.webp";

function Khushhaali() {
  const campaignData = {
    title: "Khush-Hali",
    image: khushhaali,
    description: "Spreading happiness through health, peace of mind, and community support.",
    locations: [
      "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "500+", label: "Patients Helped" },
      { value: "5+", label: "Medical Camps" },
      { value: "50+", label: "Doctors" },
      { value: "100+", label: "Volunteers" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Khush Hali Campaign & Drops of Change: Spreading Happiness Through Health</h2>
            <p className="text-gray-600 mb-4">
              At Drops of Change, we launched the Khush Hali Campaign to spread a simple yet powerful message: <b>True happiness doesn’t come from wealth or possessions — it comes from good health, peace of mind, and helping others.</b>
            </p>
            <p className="text-gray-600 mb-4">
              We believe that good health is the greatest gift. When we’re healthy, everything else in life feels better. That’s why we work hard to support and uplift our communities through a range of health-focused initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Blood Donation Camps</h3>
              <p className="text-gray-600">
                We organize blood donation camps in partnership with colleges. Students, teachers, and volunteers come together, donating blood with a smile and a sense of purpose. Each camp collects 70 to 100 units of blood, and every unit can help save a life. That’s something to be proud of!
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Free Health Check-ups</h3>
              <p className="text-gray-600">
                We organize free health check-up camps, awareness sessions, and healthcare workshops for those who can’t afford treatment.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Medical Camps</h3>
              <p className="text-gray-600">
                Medical camps for underserved communities, providing essential treatment and care.
              </p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-rose-800 mb-2">Children's Health</h3>
              <p className="text-gray-600">
                Pediatric and preventive care services for children, ensuring a healthy start to life.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">The Impact So Far</h3>
            <ul className="list-disc ml-6 text-gray-600 mb-4">
              <li>Thousands of lives saved through blood donations</li>
              <li>Hundreds of people treated through free medical and health check-up camps</li>
              <li>Children benefited from regular pediatric and preventive healthcare</li>
              <li>Increased health awareness among youth and communities through educational sessions</li>
              <li>Stronger community bonds built on care, compassion, and support</li>
            </ul>
            <p className="text-gray-600 italic">Every smile, every “thank you,” and every story of recovery reminds us why we do this: To bring hope, healing, and happiness to those who need it most.</p>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-3">How Can You Support the Khush Hali Campaign?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Donate</h4>
                <p className="text-sm">Even a small contribution helps us reach more people</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Volunteer</h4>
                <p className="text-sm">Join us at camps or help us organize events</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Partner with Us</h4>
                <p className="text-sm">Colleges, companies, and NGOs can collaborate for larger impact</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Spread the Word</h4>
                <p className="text-sm">Share our mission and stories to inspire others</p>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg md:col-span-2">
                <h4 className="font-semibold mb-2">Sponsor a Camp</h4>
                <p className="text-sm">Support a full day of health services in underserved areas</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <p className="text-gray-600">
              Let’s continue spreading health, happiness, and hope— together. Because when we care for others, we create a ripple of kindness that comes back to us in the form of joy.
            </p>
            <p className="text-gray-900 font-semibold mt-2 text-center">
              Join the Khush Hali Campaign.<br />
              Be the drop that makes a difference.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Healthcare Initiatives"
  };

  return <CampaignLayout {...campaignData} />;
}

export default Khushhaali;
