import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import visionImg from "../assets/image/Image.png";
import velocityImg from "../assets/image/Velocity.webp";
import valueImg from "../assets/image/Value-1.webp";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { title: "Vision", image: visionImg },
  { title: "Velocity", image: velocityImg },
  { title: "Value", image: valueImg },
];

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const triggerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* ================= MOBILE CHECK ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= GSAP PIN (DESKTOP + MOBILE) ================= */
  useEffect(() => {
    if (!swiperRef.current || !sectionRef.current) return;

    const swiper = swiperRef.current;
    let lastIndex = 0;

    triggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => "+=" + (slides.length - 1) * window.innerHeight * (isMobile ? 0.8 : 1.2),
      pin: true,
      scrub: isMobile ? 0.5 : 0.3,
      anticipatePin: 1,
      pinSpacing: true,

      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: isMobile ? 0.3 : 0.5,
        ease: "power2.inOut",
      },

      onUpdate: (self) => {
        const rawProgress = self.progress * (slides.length - 1);
        const targetIndex = Math.floor(rawProgress + 0.4);
        const clampedIndex = Math.min(Math.max(targetIndex, 0), slides.length - 1);

        if (clampedIndex !== lastIndex) {
          swiper.slideTo(clampedIndex, isMobile ? 500 : 600);
          lastIndex = clampedIndex;
        }
      },
    });

    return () => triggerRef.current?.kill();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-[#0f0f0f] transition-colors duration-300"
    >
      {/* DESKTOP HEIGHT CONTROL */}
      <div className="min-h-screen py-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-center md:text-left text-black dark:text-white">
              Who We Are
            </h2>

            {/* SMOOTH TITLE TRANSITION */}
            <h5 className="text-2xl font-semibold mb-16 text-center md:text-left text-black dark:text-white transition-all duration-500 ease-in-out">
              {slides[activeIndex].title}
            </h5>

            <p className="max-w-md hidden md:block text-gray-900 dark:text-gray-400 transition-opacity duration-300">
              At V Global, we're more than a service provider; we're your long-term
              partner in digital transformation. With roots in Vidushi Infotech
              (VIT), we bring over 20 years of experience delivering global
              technology solutions.
            </p>
          </div>

          {/* RIGHT SLIDER */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden">
            <Swiper
              direction="vertical"
              modules={[Mousewheel]}
              speed={600}
              allowTouchMove={false}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.realIndex)
              }
              className="h-full"
            >
              {slides.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}