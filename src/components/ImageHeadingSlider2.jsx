import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrowLeft from "../assets/image/arrow-left.png";
import arrowRight from "../assets/image/arrow-right.png";

gsap.registerPlugin(ScrollTrigger);

export default function ImageHeadingSlider2() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [slides, setSlides] = useState([]);
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

  /* ===== API FETCH ===== */
  useEffect(() => {
    fetch("https://vglobal.wsisites.net/api/Whatwedo")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const filtered = res.data
            .filter((i) => i.isactive && !i.isdelete)
            .sort((a, b) => a.sortorder - b.sortorder)
            .map((item) => ({
              title: item.heading,
              image: `https://vglobal.wsisites.net/${item.imagepath.replace("../", "")}`,
              overlayHtml: item.longdescription,
            }));

          setSlides(filtered);
        }
      });
  }, []);

  /* ===== GSAP PIN + SCROLL (DESKTOP) ===== */
  useEffect(() => {
    if (isMobile || !swiperRef.current || !sectionRef.current || !slides.length)
      return;

    const swiper = swiperRef.current;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top-=72 top",
      end: () => "+=" + (slides.length - 1) * window.innerHeight * 1.2,
      pin: true,
      scrub: 0.3,
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: 0.6,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const index = Math.round(self.progress * (slides.length - 1));
        if (swiper.activeIndex !== index) {
          swiper.slideTo(index, 600);
        }
      },
    });

    return () => scrollTriggerRef.current?.kill();
  }, [isMobile, slides]);

  /* ===== SYNC SCROLL ===== */
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

  /* ================= MOBILE ================= */
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
            className={`w-12 h-12 rounded-full flex items-center justify-center
              ${
                isBeginning
                  ? "bg-[#E9DDFF] dark:bg-[#4A0099] opacity-40"
                  : "bg-[#E9DDFF] hover:bg-[#dccbff] dark:bg-[#4A0099]"
              }`}
          >
            <img src={arrowLeft} className="w-5 h-5 dark:invert" />
          </button>

          <button
            ref={nextRef}
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`w-12 h-12 rounded-full flex items-center justify-center
              ${
                isEnd
                  ? "bg-[#E9DDFF] dark:bg-[#4A0099] opacity-40"
                  : "bg-[#E9DDFF] hover:bg-[#dccbff] dark:bg-[#4A0099]"
              }`}
          >
            <img src={arrowRight} className="w-5 h-5 dark:invert" />
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

      <div
        className="
        absolute inset-0 p-6
        bg-[#E9DDFF] dark:bg-[#4A0099]
        translate-y-full opacity-0
        group-hover:translate-y-0 group-hover:opacity-100
        transition-all duration-500
        flex flex-col justify-between"
      >
        <div
          className="text-sm text-gray-900 dark:text-white overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: slide.overlayHtml }}
        />
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

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 text-white">
        <h3 className="font-[Marcellus] text-[18px] px-6">{slide.title}</h3>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 text-pink-400 text-xs underline"
        >
          Know More
        </button>
      </div>

      <div
        className={`absolute inset-0 z-10 bg-[#E9DDFF] dark:bg-[#4A0099]
        transition-all duration-500
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-4 text-xl"
        >
          ✕
        </button>

        <div
          className="mt-8 p-6 text-sm overflow-y-auto h-full"
          dangerouslySetInnerHTML={{ __html: slide.overlayHtml }}
        />
      </div>
    </div>
  );
}
