import React, { useState, useEffect, useRef } from 'react';
import globeVideo from "../assets/image/3d-globe-ai-technology-rotated-animation.webm";

const VideoSection = () => {
  const [scale, setScale] = useState(0.5);
  const [borderRadius, setBorderRadius] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const videoSectionRef = useRef(null);

  // Check if device is mobile or tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Mobile + iPad
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only run scroll animation on desktop
    if (isMobile) return;

    const handleScroll = () => {
      if (!videoSectionRef.current) return;

      const section = videoSectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      
      // Start animation when section is 80% in viewport
      const startPoint = windowHeight * 0.8;
      const endPoint = windowHeight * 0.2;

      if (sectionTop <= startPoint && sectionTop >= endPoint) {
        // Calculate progress (0 to 1)
        const progress = 1 - ((sectionTop - endPoint) / (startPoint - endPoint));

        // Scale from 0.5 to 1
        const newScale = 0.5 + (progress * 0.5);
        setScale(Math.min(Math.max(newScale, 0.5), 1));

        // Border radius from 50 to 0
        const newRadius = 50 - (progress * 50);
        setBorderRadius(Math.max(newRadius, 0));
      } else if (sectionTop > startPoint) {
        setScale(0.5);
        setBorderRadius(50);
      } else if (sectionTop < endPoint) {
        setScale(1);
        setBorderRadius(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section
      ref={videoSectionRef}
      className="relative w-full overflow-hidden"
    >
      <div
        className={`relative w-full overflow-hidden mx-auto ${
          isMobile ? '' : 'transition-all duration-300 ease-out'
        }`}
        style={
          isMobile
            ? {
                // Mobile/iPad: Proper height like screenshot
                width: '100%',
                height: '50vh', // Changed from 100vh to 50vh
                borderRadius: '0px',
              }
            : {
                // Desktop: Animated zoom
                transform: `scale(${scale})`,
                borderRadius: `${borderRadius}px`,
                maxWidth: scale === 1 ? '100%' : '90%',
                height: scale === 1 ? '100vh' : '60vh',
              }
        }
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src={globeVideo} type="video/mp4" />
        </video>

        {/* Optional subtle overlay */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
      </div>
    </section>
  );
};

export default VideoSection;