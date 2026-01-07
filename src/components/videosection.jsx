import React, { useState, useEffect, useRef } from "react";
import globeVideo from "../assets/image/3d-globe-ai-technology-rotated-animation.webm";

const BASE_URL = "https://vglobal.wsisites.net/";

const VideoSection = () => {
  const [scale, setScale] = useState(0.5);
  const [borderRadius, setBorderRadius] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const [videoUrl, setVideoUrl] = useState(globeVideo);
  const videoSectionRef = useRef(null);

  /* ================= MOBILE CHECK ================= */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ================= FETCH VIDEO FROM API ================= */
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          "https://vglobal.wsisites.net/api/CyclicImages/"
        );
        const json = await res.json();

        console.log("VIDEO API RESPONSE", json);

        if (
          json?.success &&
          Array.isArray(json?.data) &&
          json.data.length > 0
        ) {
          const videoData = json.data[0];

          if (videoData?.str_ImagePath && videoData.b_Active) {
            const fullVideoUrl =
              videoData.str_ImagePath.startsWith("http")
                ? videoData.str_ImagePath
                : BASE_URL + videoData.str_ImagePath.replace("../", "");

            setVideoUrl(fullVideoUrl);

            console.log("Video URL set to:", fullVideoUrl);
          }
        }
      } catch (error) {
        console.error("Video API Error:", error);
        // fallback video stays
      }
    };

    fetchVideo();
  }, []);

  /* ================= SCROLL ANIMATION (DESKTOP ONLY) ================= */
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!videoSectionRef.current) return;

      const rect = videoSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startPoint = windowHeight * 0.8;
      const endPoint = windowHeight * 0.2;

      if (rect.top <= startPoint && rect.top >= endPoint) {
        const progress =
          1 - (rect.top - endPoint) / (startPoint - endPoint);

        setScale(0.5 + progress * 0.5);
        setBorderRadius(50 - progress * 50);
      } else if (rect.top > startPoint) {
        setScale(0.5);
        setBorderRadius(50);
      } else {
        setScale(1);
        setBorderRadius(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section
      ref={videoSectionRef}
      className={`relative w-full overflow-hidden ${
        isMobile ? "h-[50vh]" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden mx-auto ${
          isMobile ? "" : "transition-all duration-300 ease-out"
        }`}
        style={
          isMobile
            ? {
                width: "100%",
                height: "50vh",
                borderRadius: "0px",
              }
            : {
                transform: `scale(${scale})`,
                borderRadius: `${borderRadius}px`,
                maxWidth: scale === 1 ? "100%" : "90%",
                height: scale === 1 ? "100vh" : "60vh",
              }
        }
      >
        <video
          key={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
      </div>
    </section>
  );
};

export default VideoSection;
