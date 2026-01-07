import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import visionImg from "../assets/image/Image.webp";
import velocityImg from "../assets/image/Velocity.webp";
import valueImg from "../assets/image/Value-1.webp";

/* ================= DEFAULT SLIDES ================= */
const defaultSlides = [
  { title: "Vision", image: visionImg, description: "" },
  { title: "Velocity", image: velocityImg, description: "" },
  { title: "Value", image: valueImg, description: "" },
];

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const triggerRef = useRef(null);

  const [slides, setSlides] = useState(defaultSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  /* ================= MOBILE CHECK ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= API ================= */
  useEffect(() => {
    const fetchWhoWeAre = async () => {
      try {
        const res = await fetch("/api/Whoweare");
        const json = await res.json();

        if (!json?.success || !Array.isArray(json?.data)) return;

        const updatedSlides = json.data.map((apiItem) => {
          const fallback = defaultSlides.find(
            (s) =>
              s.title.toLowerCase() === apiItem.heading?.toLowerCase()
          );

          return {
            title: apiItem.heading || fallback?.title || "",
            image: fallback?.image || apiItem.imagepath,
            description: apiItem.shortdesc || "",
          };
        });

        setSlides(updatedSlides);
        setApiLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWhoWeAre();
  }, []);

  /* ================= GSAP PIN ================= */
  useEffect(() => {
    if (!apiLoaded || !swiperRef.current || !sectionRef.current) return;
    if (slides.length < 2) return;

    gsap.registerPlugin(ScrollTrigger);

    const swiper = swiperRef.current;
    let lastIndex = 0;

    triggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () =>
        "+=" +
        (slides.length - 1) *
          window.innerHeight *
          (isMobile ? 1 : 1.5),
      pin: true,
      scrub: isMobile ? 1 : 1.5,
      anticipatePin: 1,
      pinSpacing: true,
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: 0.8,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const index = Math.round(
          self.progress * (slides.length - 1)
        );
        if (index !== lastIndex) {
          swiper.slideTo(index, 800);
          lastIndex = index;
        }
      },
    });

    return () => triggerRef.current?.kill();
  }, [slides, isMobile, apiLoaded]);

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-[#0f0f0f] transition-colors duration-300"
    >
      <div className="min-h-screen py-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-center md:text-left text-black dark:text-white">
              Who We Are
            </h2>

            <h5 className="text-2xl font-semibold mb-8 md:mb-16 text-center md:text-left text-black dark:text-white">
              {slides[activeIndex]?.title}
            </h5>

            {/* ✅ DESKTOP PARAGRAPH */}
            <p className="max-w-md hidden md:block text-gray-900 dark:text-gray-400">
              {slides[activeIndex]?.description}
            </p>
          </div>

          {/* RIGHT SLIDER */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden">
            <Swiper
              direction="vertical"
              modules={[Mousewheel]}
              speed={800}
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

          {/* ✅ MOBILE PARAGRAPH (IMAGE KE NICHE) */}
          <p className="md:hidden text-center text-sm text-gray-900 dark:text-gray-400  px-4">
            {slides[activeIndex]?.description}
          </p>

        </div>
      </div>
    </section>
  );
}
