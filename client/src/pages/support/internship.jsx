import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function Internship() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    course: "",
    university: "",
    duration: "",
    availability: "",
    resume: "",
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
      !formData.course ||
      !formData.university ||
      !formData.duration ||
      !formData.availability ||
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
            Internship Application
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Apply for Internship
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
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  placeholder="Course of Study"
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                />
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  placeholder="University/College"
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                />
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                 className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Internship Duration</option>
                  <option value="3-month">3 Month</option>
                  <option value="6-months">6 Months</option>
                  <option value="12-months">12 Months</option>
                </select>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Availability</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                </select>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    I agree to the internship terms and conditions.
                  </label>
                </div>
                <button type="submit" className="submit-button">
                  Submit Application
                </button>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Internship Terms & Conditions
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Must be a student or recent graduate
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Internship is unpaid but provides experience
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Interns must complete assigned projects on time
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Maintain professionalism and confidentiality
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

export default Internship;
