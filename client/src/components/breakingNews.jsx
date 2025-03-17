import React from "react";
import { motion } from "framer-motion";

const BreakingNews = () => {
    const news = [
        "Sushiksha Pathshala expands to new slum areas!",
        "Volunteer drive this weekend - Join us to teach!",
        "Project Nayi Udaan adopts 5 more children this month!",
        "Help us collect books and stationery for underprivileged kids.",
        "Education awareness campaign launched in Delhi slums!"
      ];

  return (
    <div className="bg-[#FF6F00] text-white py-2 overflow-hidden">
      <motion.div
        className="whitespace-nowrap"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {news.map((item, index) => (
          <span key={index} className="mx-4 inline-block">
            {item} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default BreakingNews;
