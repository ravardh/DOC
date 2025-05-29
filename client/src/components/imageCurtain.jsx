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
    <div className="flex flex-col md:flex-row min-h-[90vh] w-full py-3 md:py-10 gap-2 md:gap-4 max-w-7xl mx-auto">
      {/* Left Side: Image Slider */}
      <div className="w-full md:w-1/2 h-[30vh] md:h-[70vh] relative">
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
              className="w-full h-full object-cover rounded-lg"
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

      {/* Right Side: Static Text */}
      <div className="w-full md:w-1/2 py-4 md:py-0" ref={textRef}>
        <div className="w-full h-full flex items-center">
          <div className="w-full px-2 md:px-8">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FF6F00] leading-tight">
              Education to Change The World
            </h2>
            <p className="mt-3 md:mt-6 font-bold text-sm sm:text-lg md:text-xl">
              One child, one teacher, one pen and one book can change the world.
              Education is the only solution.
            </p>
            <p className="mt-2 md:mt-3 font-bold text-sm sm:text-lg md:text-xl">
              <span className="inline-block">
                We request all of you to come forward to help them.
              </span>
              <br className="hidden sm:block" />{" "}
              <span className="inline-block mt-1 sm:mt-0">
                If not us then who?
              </span>
            </p>
            <motion.button
              className="bg-[#FF6F00] text-white mt-4 md:mt-6 px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-[#FF8F00] transition duration-300 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => navigate("/support/donate")}
            >
              Sponsor A Child
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
