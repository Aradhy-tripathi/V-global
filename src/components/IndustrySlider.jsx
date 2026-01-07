import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrowLeft from "../assets/image/arrow-left.png";
import arrowRight from "../assets/image/arrow-right.png";

gsap.registerPlugin(ScrollTrigger);

/* ================= IMAGE PATH FIX (IMPORTANT) ================= */
const BASE_URL = "https://vglobal.wsisites.net";

const getImageUrl = (path) => {
  if (!path) return "";
  const cleanPath = path.replace(/^(\.\.\/|\.\/)+/, "");
  return `${BASE_URL}/${cleanPath}`;
};

export default function IndustrySlider() {
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [data, setData] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ================= MOBILE CHECK ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= API CALL ================= */
  useEffect(() => {
    fetch("https://vglobal.wsisites.net/api/Whyworkwithus")
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && Array.isArray(res.data)) {
          const filtered = res.data
            .filter((item) => item.isactive && !item.isdelete)
            .sort((a, b) => a.sortorder - b.sortorder);

          setData(filtered);
        }
      })
      .catch((err) => console.error("WhyWorkWithUs API Error:", err));
  }, []);

  /* ================= GSAP SCROLL PIN (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (isMobile || data.length === 0) return;
    if (!swiperRef.current || !sectionRef.current) return;

    const swiper = swiperRef.current;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top-=40 top",
      end: () => "+=" + (data.length - 1) * window.innerHeight,
      pin: true,
      scrub: true,
      snap: {
        snapTo: 1 / (data.length - 1),
        duration: 0.2,
        ease: "power1.inOut",
      },
      onUpdate: (self) => {
        const index = Math.round(self.progress * (data.length - 1));
        if (swiper.activeIndex !== index) {
          swiper.slideTo(index);
        }
      },
    });

    return () => scrollTriggerRef.current?.kill();
  }, [isMobile, data]);

  /* ================= SYNC SCROLL WHEN SLIDE CHANGE ================= */
  const syncScrollWithSwiper = (swiper) => {
    if (!scrollTriggerRef.current) return;
    const progress = swiper.activeIndex / (data.length - 1);
    const st = scrollTriggerRef.current;
    st.scroll(st.start + progress * (st.end - st.start));
  };

  return (
    <section
      ref={sectionRef}
      className="pb-20 pt-10 bg-white min-h-screen dark:bg-[#0f0f0f]"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h3 className="font-[serif] text-[32px] md:text-[48px] mb-2 text-center md:text-left text-black dark:text-white">
          Why Work With Us
        </h3>

        <p className="text-gray-900 dark:text-gray-400 text-base mb-8 text-center md:text-left max-w-3xl">
          We serve clients across key global industries, combining technical
          expertise with deep sector knowledge.
        </p>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block">
          <Swiper
            modules={[Navigation, Mousewheel]}
            slidesPerView={4}
            spaceBetween={16}
            mousewheel={{ forceToAxis: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
              syncScrollWithSwiper(swiper);
            }} 
          >
            {data.map((item, index) => (
              <SwiperSlide key={item.id ?? index}>
                <div className="relative rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-sm group">

                  <img
                    src={getImageUrl(item.imagepath)}
                    alt={item.heading}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-5">
                    <h5 className="text-2xl font-semibold text-black dark:text-white mb-1">
                      {item.heading}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400 text-base">
                      {item.shortdesc}
                    </p>
                  </div>

                  <div className="absolute inset-0 p-6 bg-white dark:bg-[#374151]
                    translate-y-full opacity-0 group-hover:translate-y-0
                    group-hover:opacity-100 transition-all duration-500
                    flex flex-col justify-center text-center">
                    <h4 className="text-2xl font-semibold mb-2">
                      {item.heading}
                    </h4>
                    <p className="text-base mb-2 font-bold">
                      {item.shortdesc}
                    </p>
                    <p className="text-base">
                      {item.longdesc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NAV BUTTONS */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className={`w-12 h-12 rounded-full flex items-center justify-center
                ${isBeginning
                  ? "bg-[#E9DDFF] dark:bg-[#4A0099] opacity-40 cursor-not-allowed"
                  : "bg-[#E9DDFF] hover:bg-[#dccbff] dark:bg-[#4A0099] dark:hover:bg-[#5a12b0]"}`}
            >
              <img src={arrowLeft} className="w-5 h-5 dark:invert" />
            </button> 

            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className={`w-12 h-12 rounded-full flex items-center justify-center
                ${isEnd
                  ? "bg-[#E9DDFF] dark:bg-[#4A0099] opacity-40 cursor-not-allowed"
                  : "bg-[#E9DDFF] hover:bg-[#dccbff] dark:bg-[#4A0099] dark:hover:bg-[#5a12b0]"}`}
            > 
              <img src={arrowRight} className="w-5 h-5 dark:invert" />
            </button> 
          </div>  
        </div>  
        
        {/* ================= MOBILE (UNCHANGED) ================= */}
        <div className="md:hidden space-y-6">
          {data.map((item, index) => (
            <div key={item.id ?? index} className="relative rounded-xl overflow-hidden">

              <img
                src={getImageUrl(item.imagepath)}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 text-center">
                <h5 className="text-xl font-semibold">{item.heading}</h5>
                <p className="text-sm text-gray-600">{item.shortdesc}</p>

                <button
                  onClick={() =>
                    setActiveOverlay(activeOverlay === index ? null : index)
                  }
                  className="mt-3 text-[#FF1AAA] text-xs underline"
                >
                  Know More
                </button>
              </div>

              <div
                className={`absolute inset-0 bg-[#374151] p-8 text-white
                  transition-all duration-500
                  ${
                    activeOverlay === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0 pointer-events-none"
                  }`}
              >
                <button
                  onClick={() => setActiveOverlay(null)}
                  className="absolute top-4 right-4 text-xl"
                >
                  ✕
                </button>

                <h4 className="text-2xl font-semibold mb-2">
                  {item.heading}
                </h4>

                <p className="text-sm font-bold mb-2 opacity-90">
                  {item.shortdesc}
                </p>

                <p className="mt-8 text-sm">{item.longdesc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
