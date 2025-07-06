import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import axios from "../../config/api";
import toast from "react-hot-toast";

function Internship() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    course: "",
    college: "",
    interests: "",
    duration: "",
    availability: "",
    reference: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      Object.values(formData).some((value) => value === "" || value === false)
    ) {
      toast.error("Please fill all required fields and accept terms.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/hr/applicants/intern", formData);
      toast.success("Application submitted successfully! We'll review your application and get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        course: "",
        college: "",
        interests: "",
        duration: "",
        availability: "",
        reference: "",
        agreeToTerms: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
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
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  placeholder="University/College"
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                />
                <select
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  required
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Area of Interest</option>
                  <option value="teaching">Teaching</option>
                  <option value="fundraising">Fundraising</option>
                  <option value="events">Event Management</option>
                  <option value="social-media">Social Media</option>
                  <option value="graphic-Designing">Graphic Designing</option>
                  <option value="content-writing">Content Writing</option>
                  <option value="administration">Administration</option>
                </select>
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
                  <option value="full-time">WeekDays</option>
                  <option value="part-time">WeekEnds</option>
                  <option value="always">Always</option>
                </select>
                <select
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  required
                  className="mt-1 px-5 w-full h-12 rounded-md shadow shadow-slate-500 focus:border-[#80CBC4] focus:ring focus:ring-[#80CBC4] focus:ring-opacity-50"
                >
                  <option value="">Where did you hear about us?</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="linkedin">LinkedIn</option>
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
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    I agree to the internship terms and conditions.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF6F00] text-white px-6 py-3 rounded-md hover:bg-[#FF8F00] transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
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
                    Minimum three months commitment required
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    80% involvement is compulsory in all NGO events and campaigns
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Weekly working hours must meet the minimum requirement of 8 hours
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Internship is unpaid but provides valuable experience and a certificate upon successful completion
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Interns must complete assigned projects and tasks on time
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Maintain professionalism, discipline, and confidentiality at all times
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[#80CBC4] mt-1 flex-shrink-0" />
                  <p className="ml-3 text-gray-600">
                    Regular feedback and reporting to the assigned mentor/supervisor is mandatory
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
