import { Sun, Moon, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

// fallback assets
import fallbackLogo from "../assets/image/Vglobal-logo.svg";
import moonImg from "../assets/image/material-symbols-light_clear-night.png";

const API_BASE = "https://vglobal.wsisites.net/";

const Header = ({ dark, setDark }) => {
  const [logo, setLogo] = useState(fallbackLogo);
  const [rightText, setRightText] = useState("Start Your Free Consultation");

  /* ===== HEADER API ===== */
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await fetch(`${API_BASE}api/Header`);
        const json = await res.json();

        console.log("HEADER API RESPONSE:", json);

        if (json?.success && json?.data?.length) {
          const data = json.data[0];

          // ✅ FIX LOGO PATH
          if (data.logo) {
            const fixedLogo = data.logo.startsWith("http")
              ? data.logo
              : API_BASE + data.logo.replace("../", "");

            setLogo(fixedLogo);
          }

          if (data.rightText) {
            setRightText(data.rightText);
          }
        }
      } catch (err) {
        console.error("Header API Error:", err);
      }
    };

    fetchHeader();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#1f1f1f] shadow-sm transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-10 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="VGlobal Logo"
            className="w-[100%] h-auto object-contain"
          />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* CTA – Desktop */}
          <a
            href="#"
            className="hidden md:inline-block font-[DM_Sans] text-[16px] underline text-gray-900 dark:text-white"
          >
            {rightText}
          </a>

          {/* Calendar – Mobile */}
          <button className="md:hidden p-2">
            <Calendar size={18} className="text-black dark:text-white" />
          </button>

          {/* 🌗 DARK MODE TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="relative w-[52px] h-[28px] rounded-full
              bg-[#B066FF] dark:bg-[#4A0099]
              transition-colors duration-300 flex items-center"
          >
            {/* Track icons */}
            <span className="absolute left-1 text-white opacity-80">
              <Sun size={14} />
            </span>

            <span className="absolute right-1 opacity-80">
              <img src={moonImg} alt="moon" className="w-[14px]" />
            </span>

            {/* Slider knob with icon */}
            <span
              className={`absolute top-[3px] left-[3px]
                w-[22px] h-[22px] rounded-full
                bg-white dark:bg-gray-800
                flex items-center justify-center
                transition-transform duration-300
                ${dark ? "translate-x-[24px]" : ""}`}
            >
              {dark ? (
                <img src={moonImg} alt="moon" className="w-[12px]" />
              ) : (
                <Sun size={12} />
              )}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;
