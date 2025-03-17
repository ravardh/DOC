import React from "react";
import { motion } from "framer-motion";
import sushiksha from "../../assets/su2.webp";
import { useNavigate } from "react-router-dom";

function SuSikshaPathshala() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Project: Sushiksha Pathshala
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img
              src={sushiksha}
              alt="Education for All"
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Sushiksha Pathshala is committed to providing educational
                opportunities in every corner of the country, particularly those
                areas that are deprived of learning resources. We aspire to
                reach every corner of the country’s slums and re-ignite the
                educational aspirations of children living in poverty.
              </p>
              <p className="text-gray-600 mb-6">
                Unfortunately, many kids from these areas either never start
                school or drop out early. Through its initiatives, Sushiksha
                Pathshala hopes to give these children a second chance at
                education and provide them with brighter futures.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Presence</h3>
              <p className="text-gray-600 mb-6">
                We currently have a presence in Ambala, Panchkula, Karnal, and
                Delhi. Our volunteers visit slums and identify places where
                classes can be held each weekend. We strive to use creative
                methods for teaching, motivating the children to make sure no
                one is left behind when it comes to education – a true blessing
                for humanity!
              </p>
              <h3 className="text-xl font-semibold mb-3">
                Supporting Underprivileged Children
              </h3>
              <p className="text-gray-600 mb-6">
                Many children lack essential resources and are subject to
                financial difficulties. They are either forced to quit their
                studies or never attend school. The NGO makes sure that no such
                child is deprived of education.
              </p>
              <p className="text-gray-600 mb-6">
                Under its project Nayi Udaan, the organization has adopted eight
                children for one year with an intent to finance their education,
                stationery, and uniform. The project is currently at its
                introductory stage. We hope to adopt more children in the future
                and be the harbinger of a new era of educated societies with
                better opportunities.
              </p>
              <button
                type="button"
                className="bg-[#FF6F00] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FF8F00] transition duration-300 text-center"
                onClick={() => navigate("/support/donate")}
              >
                Sponsor A Child
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SuSikshaPathshala;
