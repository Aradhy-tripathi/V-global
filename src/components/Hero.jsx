import { useEffect, useState } from "react";
import frameIcon from "../assets/image/frame_1.png";

const Hero = () => {
  const [content, setContent] = useState("");

  /* ================= API CALL ================= */
  useEffect(() => {
    fetch("https://vglobal.wsisites.net/api/Introtext")
      .then((res) => res.json())
      .then((res) => {
        if (res?.success && res.data?.length > 0) {
          const activeItem = res.data.find(
            (item) => item.isactive && !item.isdelete
          );

          if (activeItem?.shortDesc) {
            setContent(activeItem.shortDesc);
          } 
        } 
      }) 
      .catch(console.error);  
  }, []);   
     
  return (
    <section className="w-full bg-white items-center dark:bg-[#1f1f1f] transition-colors duration-300">
      <div className="mx-auto max-w-[1200px] px-4 pt-28 pb-20 text-center">

        {/* ================= API CONTENT ================= */}
        {content && (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* ================= CTA (UNCHANGED) ================= */} 
        <div className="mt-10"> 
          <button
            onClick={() => {
              const el = document.getElementById("build-future");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }} 
            className="
              inline-flex
              items-center 
              gap-2
              rounded-lg
              bg-[#6F2CFF] 
              px-6
              py-3
              text-[16px]
              font-semibold
              text-white
              transition
              hover:bg-[#5A22CC]
              dark:hover:bg-[#7a42ff]
            "
          >
            Build With V Global

            <img
              src={frameIcon}
              alt="Arrow"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero; 
