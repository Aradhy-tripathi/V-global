import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// images
import step1Img from "../assets/image/your_goal.png";
import step2Img from "../assets/image/Step-2-1.png";
import step3Img from "../assets/image/step-3.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Tell us your goals",
    desc: "Fill out the form below.",
    image: step1Img,
  },
  {
    title: "Get matched",
    desc: "We provide tailored solutions from our expert teams.",
    image: step2Img,
  },
  {
    title: "Scale seamlessly",
    desc: "Watch your business grow with agility and innovation.",
    image: step3Img,
  },
];

export default function HowToWorkWithUs() {
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* ===== RESPONSIVE CHECK ===== */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ===== GSAP PIN + SCROLL CONTROL (DESKTOP + MOBILE) ===== */
  useEffect(() => {
    if (!swiperRef.current || !sectionRef.current) return;

    const swiper = swiperRef.current;
    let lastIndex = 0;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top-=90 top",
      end: () => "+=" + (steps.length - 1) * window.innerHeight * (isMobile ? 0.8 : 1.2),
      pin: true,
      scrub: isMobile ? 0.5 : 0.3,
      anticipatePin: 1,
      pinSpacing: true,
      snap: {
        snapTo: 1 / (steps.length - 1),
        duration: isMobile ? 0.3 : 0.5,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const rawProgress = self.progress * (steps.length - 1);
        const targetIndex = Math.floor(rawProgress + 0.4);
        const clampedIndex = Math.min(Math.max(targetIndex, 0), steps.length - 1);

        if (clampedIndex !== lastIndex) {
          swiper.slideTo(clampedIndex, isMobile ? 500 : 600);
          lastIndex = clampedIndex;
        }
      },
    });

    return () => trigger.kill();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="pb-20 pt-10 bg-white dark:bg-[#0f0f0f] min-h-screen overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div className="text-center md:text-left">
          <h2 className="font-[Marcellus] text-4xl md:text-5xl mb-2 text-black dark:text-white">
            How to Work With Us
          </h2>

          <p className="text-gray-900 dark:text-gray-400 mb-8 text-sm">
            Working with us is simple:
          </p>

          {/* ONLY ACTIVE CONTENT */}
          <div className="transition-all duration-300">
            <h5 className="text-xl md:text-[24px] font-semibold mb-1 text-black dark:text-white">
              {activeIndex + 1}. {steps[activeIndex].title}
            </h5>

            <p className="text-sm md:text-base text-black dark:text-gray-200">
              {steps[activeIndex].desc}
            </p>
          </div>
        </div>

        {/* ================= RIGHT SLIDER ================= */}
        <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
          <Swiper
            direction="vertical"
            modules={[Mousewheel]}
            slidesPerView={1}
            speed={700}
            mousewheel={!isMobile ? { forceToAxis: true } : false}
            allowTouchMove={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) =>
              setActiveIndex(swiper.realIndex)
            }
            className="h-full"
          >
            {steps.map((step, i) => (
              <SwiperSlide key={i}>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}