import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { EffectFade, Autoplay } from "swiper/modules";

import edu from "../assets/EducationProgram.webp";
import comm from "../assets/Comm_Act.webp";
import child from "../assets/Child_Act.webp";
import vol from "../assets/Volunteer_Act.webp";
import { useNavigate } from "react-router-dom";



export default function ImageSliderWithCurtain() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { triggerOnce: true, threshold: 0.2 });
  const navigate = useNavigate();
  return (
    <div className="flex h-[90vh] w-full py-10 gap-4">
      {/* Left Side: Image Slider */}
      <div className="w-1/2 h-full">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full rounded-lg"
        >
          <SwiperSlide>
            <img
              src={edu}
              className="w-full h-full object-cover"
              alt="Nature"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img src={comm} className="w-full h-full object-cover" alt="City" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={child}
              className="w-full h-full object-cover"
              alt="Mountains"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={vol}
              className="w-full h-full object-cover"
              alt="Mountains"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Right Side: Static Text with Entry Animation */}
      <div className="w-1/2 h-full relative overflow-hidden" ref={textRef}>
        <motion.div
          initial={{ x: "100%" }}
          animate={isInView ? { x: "0%" } : {}}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <div className="p-4">
            <h2 className="text-6xl font-bold text-[#FF6F00] ">
              Education to Change The World
            </h2>
            <p className="mt-8 font-bold text-xl">
              One child, one teacher, one pen and one book can change the world.
              Education is the only solution.
            </p>
            <p className="mt-3 font-bold text-xl rounded-lg  ">
              <span className="p-1">
                We request all of you to come forward to help them.
              </span>
              <br />{" "}
              <span className=" p-1">If not us then who?</span>
            </p>
            <motion.button
              className="bg-[#FF6F00] text-white mt-6 px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FF8F00] transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => navigate("/support/donate")}
            >
              Sponsor A Child
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
