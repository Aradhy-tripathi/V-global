import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrowIcon from "../assets/image/arrow-left.png";
import arrowIcon2 from "../assets/image/arrow-right.png";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Custom Development of Leading Tech Stacks",
    tags: ["Java", ".NET Core", "Optimizely", "PHP", "Shopify"],
  },
  {
    title: "Mobile App Development",
    tags: [
      "Concept & Strategy",
      "UI/UX Design",
      "Native & Cross-Platform",
      "Rigorous Testing",
      "Deployment & Support",
    ],
  },
  {
    title: "UI Development",
    tags: [
      "Angular",
      "React JS",
      "Vue.js",
      "HTML5, CSS3, JavaScript (ES6+)",
      "Sass/Less",
      "TypeScript",
    ],
  },
  {
    title: "UI/UX Design",
    tags: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Usability Testing",
      "Visual Design",
      "Interaction Design",
    ],
  },
  {
    title: "ERP and CRM Consulting & Implementation",
    tags: [
      "SAP Consulting",
      "Oracle Implementation",
      "Needs Analysis",
      "Customization & Integration",
      "Data Migration & Training",
    ],
  },
  {
    title: "Supply Chain Solutions",
    tags: [
      "O9 Solutions",
      "Blue Yonder (JDA)",
      "HighJump",
      "Supply Chain Analytics",
      "Implementation & Integration",
    ],
  },
];

export default function WhatWeDo() {
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  /* ================= MOBILE DETECT ================= */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 576px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ================= GSAP PIN + SCROLL ================= */
  useEffect(() => {
    if (isMobile || !swiperRef.current || !sectionRef.current) return;

    const swiper = swiperRef.current;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top-=72 top",
      end: () => "+=" + (cards.length - 1) * window.innerHeight,
      pin: true,
      scrub: 0.5,
      snap: {
        snapTo: 1 / (cards.length - 1),
        duration: 0.4,
        ease: "power1.inOut",
      },
       
      onUpdate: (self) => {
        const rawProgress = self.progress * (cards.length - 1);
        const targetIndex = Math.floor(rawProgress + 0.35);
        const clampedIndex = Math.min(Math.max(targetIndex, 0), cards.length - 1);
        
        if (swiper.activeIndex !== clampedIndex) {
          swiper.slideTo(clampedIndex, 500);
        }
      },
    });

    return () => scrollTriggerRef.current?.kill();
  }, [isMobile]);

  /* ================= SYNC GSAP WHEN SLIDE CHANGES ================= */
  const syncScrollWithSwiper = (swiper) => {
    if (!scrollTriggerRef.current || isMobile) return;

    const progress = swiper.activeIndex / (cards.length - 1);
    const st = scrollTriggerRef.current;

    gsap.to(window, {
      scrollTo: st.start + progress * (st.end - st.start),
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef} 
      className="pb-20 bg-white dark:bg-[#0f0f0f]  flex items-center min-h-screen  transition-colors duration-300"
    >
      <div className="max-w-[1200px] w-[95%] mx-auto">

        {/* HEADING */}
        <h3 className="font-[Marcellus] text-[32px] md:text-[48px] mb-2 text-center md:text-left text-black dark:text-white">
          What We Do
        </h3>

        <p className="mb-6 max-w-xl text-gray-600 dark:text-gray-400 text-center md:text-left">
          We deliver end-to-end IT and digital solutions designed for today's business environment.
        </p>

        {/* ================= MOBILE (UNCHANGED) ================= */}
        {isMobile && (
          <div className="space-y-6">
            {cards.map((card, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border bg-white dark:bg-[#151515]
                border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <h4 className="font-semibold text-lg mb-4 text-black dark:text-white">
                  {card.title}
                </h4>

                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-md
                      bg-purple-100 text-purple-900 border border-purple-200
                      dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= DESKTOP ================= */}
        {!isMobile && (
          <>
            <Swiper
              modules={[Navigation, Mousewheel]}
              allowTouchMove={true}
              mousewheel={{ forceToAxis: true, sensitivity: 1 }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={syncScrollWithSwiper}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              speed={500}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
            >
              {cards.map((card, i) => (
                <SwiperSlide key={i}>
                  <div className="min-h-[340px] p-5 rounded-2xl bg-white dark:bg-[#151515]
                    border border-gray-200 dark:border-gray-700 shadow-sm
                    transition flex flex-col"
                  >
                    <h4 className="text-2xl font-semibold mb-4 text-black dark:text-white">
                      {card.title}
                    </h4>

                    <div className="flex flex-col gap-2 ">
                      {card.tags.map((tag, t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-sm rounded-md
                          bg-purple-100 text-purple-900 border border-purple-200 w-fit 
                          dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* NAVIGATION */}
          
          </>
        )}
      </div>
    </section>
  );
}