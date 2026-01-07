import { useEffect, useState } from "react";
import upgradeVideo from "../assets/image/rotating-mechanism-of-an-abstract-space-ship-on-bl.mp4";

export default function UpgradeSection() {
  const [content, setContent] = useState({
    heading: "We’re Upgrading for You!",
    shortdesc: "",
    video: upgradeVideo,
  });

  /* ================= API INTEGRATION ================= */
 useEffect(() => {
  const fetchUpgradeContent = async () => {
    try {
      const res = await fetch(
        "https://vglobal.wsisites.net/api/Weareupgradingforyou"
      );
      const json = await res.json();

      console.log("UPGRADE SECTION API RESPONSE", json);

      if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
        const item = json.data[0];

        const videoPath = item?.bgimg
          ? `https://vglobal.wsisites.net/${item.bgimg.replace("../", "")}`
          : upgradeVideo;

        setContent({
          heading: item?.heading || "We’re Upgrading for You!",
          shortdesc: item?.shortdesc || "",
          video: videoPath,
        });
      }
    } catch (error) {
      console.error("Upgrade Section API Error:", error);
    }
  };

  fetchUpgradeContent();
}, []);

  return (
    <section className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden text-white">
      {/* 🔹 Background Video */}
      <video
        key={content.video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={content.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/70 to-black/0 z-[1]" />

      {/* 🔹 Content */}
      <div className="relative z-[2] max-w-[760px] px-5 text-center">
        <h2 className="font-[Marcellus] text-[24px] md:text-[48px] leading-[44px] md:leading-[56px] mb-5">
          {content.heading}
        </h2>

        <p className="text-[14px] md:text-[16px] leading-[24px] text-white/90 whitespace-pre-line">
          {content.shortdesc}
        </p>
      </div>
    </section>
  );
}
