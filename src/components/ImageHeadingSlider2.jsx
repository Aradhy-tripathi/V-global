import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// IMAGES
import media1 from "../assets/image/Media.png";
import media2 from "../assets/image/Media-1.png";
import media3 from "../assets/image/slide_5.png";
import media4 from "../assets/image/slide_4.png";

import arrowLeft from "../assets/image/arrow-left.png";
import arrowRight from "../assets/image/arrow-right.png";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: media1,
    title: "Strategic IT Consulting & Roadmap Development",
    overlay: (
      <>
        <h4 className="text-[18px] md:text-3xl font-semibold mb-3">
          Align tech with growth goals
        </h4>
        <p className="font-semibold text-[14px] md:text-lg mb-1">
          Supercharge Your Marketing with AI:
        </p>
        <ul className="list-disc pl-5 mb-3 text-[12px] md:text-base space-y-1">
          <li>AI-Enabled SEO (Search Engine Optimization)</li>
          <li>Intelligent PPC (Pay-Per-Click)</li>
          <li>Smarter SMO (Social Media Optimization)</li>
        </ul>
        <p className="font-semibold text-lg mb-1">
          AI-Driven Digital Marketing:   
        </p>
        <ul className="list-disc pl-5 mb-3 text-[12px] md:text-base space-y-1">
          <li>Transform Data into Revenue</li>
          <li>Personalized Content at Scale</li>
          <li>Predictive Analytics for Smarter Campaigns </li>
          <li>Marketing Automation & Optimization</li>
        </ul>
      </>
    ),
  },
  {
    image: media2,
    title: "Cutting-Edge Digital Product Engineering",
    overlay: (
      <>
        <h4 className="text-[18px] md:text-3xl font-semibold mb-3">
          Build agile, user-centric solutions
        </h4>
        <p className="font-semibold text-lg mb-1">
          Our Engineering Capabilities:
        </p>
        <ul className="list-disc pl-5 mb-3 text-[12px] md:text-base space-y-1">
          <li>AI / ML Integration</li>
          <li>User-Centric Design</li>
          <li>Agile Development</li>
          <li>Scalable Architecture</li>
        </ul>
      </>
    ),
  },
  {
    image: media3,
    title: "Agile Offshore & Hybrid Resource Augmentation",
    overlay: (
      <>
        <h4 className="text-[18px] md:text-3xl font-semibold mb-3">
          Scale teams flexibly and cost-effectively
        </h4>
        <p className="font-semibold text-lg mb-1">
          Our Flexible Engagement Models:
        </p>
        <ul className="list-disc pl-5 mb-3 text-[12px] md:text-base space-y-1">
          <li>Agile Offshore Augmentation</li>
          <li>Hybrid Resource Augmentation</li>
          <li>Skill-Based Augmentation</li>
        </ul>
        <p className="font-semibold text-lg mb-1">
         The VGlobal Advantage: Seamless Integration & Measurable Results
        </p>
        <ul className="list-disc pl-5 mb-3 text-[12px] md:text-base space-y-1">
          <li>Rapid Deployment</li>
          <li>Cultural Alignment</li>
          <li>Operational Excellence</li>
        </ul>
      </>
    ),
  },
  {
    image: media4,
    title: "Secure Cloud & Managed Services",
    overlay: (
      <>
        <h4 className="text-[18px] md:text-3xl font-semibold mb-3">
         Enhance performance and compliance with confidence and AI.
        </h4>
        <p className="font-semibold text-lg mb-1">Our Flexible Engagement Models:</p>
        <ul className="list-disc pl-5 mb-3 text-[12px] md:text-base space-y-1">
          <li>Agile Offshore Augmentation</li>
          <li>Hybrid Resource Augmentation</li>
          <li>Skill-Based Augmentation</li>
        </ul>
        <p className="font-semibold text-lg mb-1">The VGlobal Advantage: Seamless Integration & Measurable Results</p>
        <ul className="list-disc pl-5 mb-3 text-[12px] md:text-base space-y-1">
          <li>Rapid Deployment</li>
          <li>Cultural Alignment</li>
          <li>Operational Excellence</li>
        </ul>
      </>
    ),
  },
];

export default function ImageHeadingSlider2() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ===== MOBILE CHECK ===== */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ===== GSAP PIN + SCROLL (DESKTOP ONLY) ===== */
  useEffect(() => {
    if (isMobile || !swiperRef.current || !sectionRef.current) return;

    const swiper = swiperRef.current;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top-=72 top",
      end: () => "+=" + (slides.length - 1) * window.innerHeight  * 1.2,
      pin: true,
      scrub: 0.3,
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: 0.6,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const rawProgress = self.progress * (slides.length - 1);
        const targetIndex = Math.floor(rawProgress + 0.35);
        const clampedIndex = Math.min(Math.max(targetIndex, 0), slides.length - 1);
        
        if (swiper.activeIndex !== clampedIndex) {
          swiper.slideTo(clampedIndex, 600);
        }
      },
    });

    return () => scrollTriggerRef.current?.kill();
  }, [isMobile]);

  /* ===== SYNC GSAP WHEN BUTTON / MOUSE SLIDES ===== */
  const syncScrollWithSwiper = (swiper) => {
    if (!scrollTriggerRef.current || isMobile) return;
    
    const progress = swiper.activeIndex / (slides.length - 1);
    const st = scrollTriggerRef.current;
    
    gsap.to(window, {
      scrollTo: st.start + progress * (st.end - st.start),
      duration: 0.5,
      ease: "power2.out",
    });
  };

  /* ================= MOBILE (UNCHANGED) ================= */
  if (isMobile) {
    return (
      <section className="pb-24 bg-white dark:bg-[#0f0f0f]">
        <div className="max-w-[1200px] w-[95%] mx-auto space-y-6">
          {slides.map((slide, i) => (
            <MobileCard key={i} slide={slide} />
          ))}
        </div>
      </section>
    );
  }

  /* ================= DESKTOP ================= */
  return (
    <section
      ref={sectionRef}
      className="pb-10 pt-10 bg-white min-h-screen dark:bg-[#0f0f0f]"
    >
      <div className="max-w-[1200px] w-[95%] mx-auto">
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={20}
          speed={500}
          allowTouchMove={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();

            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);

            swiper.on("slideChange", () => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
              syncScrollWithSwiper(swiper);
            });
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <DesktopCard slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAV */}
        <div className="flex justify-end gap-6 mt-8">
         <button
  ref={prevRef}
  onClick={() => swiperRef.current?.slidePrev()}
  disabled={isBeginning}
  className={`
    w-12 h-12 rounded-full flex items-center justify-center transition
    ${
      isBeginning
        ? "bg-[#E9DDFF] dark:bg-[#4A0099] opacity-40 cursor-not-allowed"
        : "bg-[#E9DDFF] hover:bg-[#dccbff] dark:bg-[#4A0099] dark:hover:bg-[#5a12b0]"
    }
  `}
>
  <img
    src={arrowLeft}
    className="w-5 h-5 dark:invert"
    alt="Previous"
  />
</button>


          <button
  ref={nextRef}
  onClick={() => swiperRef.current?.slideNext()}
  disabled={isEnd}
  className={`
    w-12 h-12 rounded-full flex items-center justify-center transition
    ${
      isEnd
        ? "bg-[#E9DDFF] dark:bg-[#4A0099] opacity-40 cursor-not-allowed"
        : "bg-[#E9DDFF] hover:bg-[#dccbff] dark:bg-[#4A0099] dark:hover:bg-[#5a12b0]"
    }
  `}
>
  <img
    src={arrowRight}
    className="w-5 h-5 dark:invert"
    alt="Next"
  />
</button>
        </div>
      </div>
    </section>
  );
}

/* ================= DESKTOP CARD ================= */
function DesktopCard({ slide }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden">
      <img src={slide.image} className="w-full h-[420px] object-cover" />

      <div className="absolute bottom-6 left-6 right-6 text-white font-[Marcellus] text-[24px] group-hover:opacity-0 transition">
        {slide.title}
      </div>

      <div className="
        absolute inset-0 p-6
       bg-[#E9DDFF] dark:bg-[#4A0099]
       translate-y-full opacity-0
       group-hover:translate-y-0 group-hover:opacity-100
      transition-all duration-500
      flex flex-col justify-between  ">
      <div className="text-sm text-gray-900 dark:text-white  overflow-y-auto">
    {slide.overlay}
  </div>
  </div>
    </div>
  );
}

/* ================= MOBILE CARD ================= */
function MobileCard({ slide }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <img src={slide.image} className="w-full h-[260px] object-cover" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 text-center text-white">
        <h3 className="font-[Marcellus] text-[18px] px-6 ">
          {slide.title}
        </h3>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 text-pink-400 text-xs underline"
        >
          Know More
        </button>
      </div>

   <div
  className={`
    absolute inset-0 p-6 z-10
    bg-[#E9DDFF] dark:bg-[#4A0099]
    transform transition-all duration-500 ease-out
    ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
  `}
>
  <button
    onClick={() => setOpen(false)}
    className="absolute top-2 right-4 text-xl text-black dark:text-white"
  >
    ✕
  </button>

  <div className="mt-8 text-sm text-gray-900 dark:text-white">
    {slide.overlay}
  </div>
</div>
    
    </div>
  );
}