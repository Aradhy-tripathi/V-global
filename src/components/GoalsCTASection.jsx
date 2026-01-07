import { useEffect, useState } from "react";
import bgFallback from "../assets/image/bg_last.png";

export default function GoalsCTASection() {
  const [heading, setHeading] = useState(
    "Your goals, our expertise. Let’s design your digital future together."
  );
  const [bgImage, setBgImage] = useState(bgFallback);

  useEffect(() => {
    fetch("https://vglobal.wsisites.net/api/Yourgoalsouridentity")
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && res.data?.length) {
          const item = res.data[0];

          if (item.heading) {
            setHeading(item.heading);
          }

          if (item.bgimg) {
            // ✅ EXACT MATCHING PATH
            const imageUrl = item.bgimg.startsWith("http")
              ? item.bgimg
              : `https://vglobal.wsisites.net/${item.bgimg.replace("../", "")}`;

            setBgImage(imageUrl);
          }
        }
      })
      .catch((err) => console.error("Goals API Error:", err));
  }, []);

  return (
    <section
      className="relative h-[60vh] min-h-[420px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-[1100px] px-4 text-center">
        <h3 className="font-[Marcellus] text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] font-normal mb-6">
          {heading}
        </h3>

        <button
          onClick={() => {
            const el = document.getElementById("build-future");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="bg-[#8000FF] hover:bg-[#8000FF] transition px-6 py-2 rounded-md text-[16px] font-['DM Sans']"
        >
          Start the Conversation
        </button>
      </div>
    </section>
  );
}
