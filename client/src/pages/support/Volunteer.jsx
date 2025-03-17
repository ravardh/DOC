import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    area: "",
    experience: "",
    availability: "",
    referralSource: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.gender ||
      !formData.dob ||
      !formData.area ||
      !formData.availability ||
      !formData.referralSource ||
      !formData.agreeToTerms
    ) {
      alert("Please fill all required fields and accept terms.");
      return;
    }
    console.log("Submitting:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Volunteer With Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Volunteer Application Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Your Phone"
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="flex justify-around items-center">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  placeholder="Date of Birth"
                  className="mt-1 px-5 w-6/12 h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                />
                </div>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Area of Interest</option>
                  <option value="teaching">Teaching</option>
                  <option value="fundraising">Fundraising</option>
                  <option value="events">Event Management</option>
                  <option value="social-media">Social Media</option>
                  <option value="administration">Administration</option>
                </select>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Previous Experience"
                  className="mt-1 px-5 w-full rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                ></textarea>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Select Availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="both">Both</option>
                </select>
                <select
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  required
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Where did you hear about us?</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="offline">Offline Campaign</option>
                  <option value="seminar">College Seminar</option>
                  <option value="word-of-mouth">Word of Mouth</option>
                  <option value="other">Other</option>
                </select>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-[#80CBC4] focus:ring-[#80CBC4] cursor-pointer"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    I agree to the volunteer terms and conditions.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF6F00] text-white px-6 py-3 rounded-md hover:bg-[#FF8F00] transition duration-300"
                >
                  Submit Application
                </button>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Terms & Conditions
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Minimum commitment of 3 months required
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Must attend orientation and training sessions
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Background check required for working with children
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Maintain confidentiality of sensitive information
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Follow organization's code of conduct
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Volunteer;
