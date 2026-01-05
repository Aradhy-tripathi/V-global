import { Sun, Moon, Calendar } from "lucide-react";
import logo from "../assets/image/vvvg.png";

import moonImg from "../assets/image/material-symbols-light_clear-night.png";


const Header = ({ dark, setDark }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#1f1f1f] shadow-sm transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-10 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="VGlobal Logo"
            className="w-[58px] h-auto object-contain"
          />

          <div className="leading-none">
            <h1 className="relative font-[Marcellus] text-[32px] text-black dark:text-white">
              VGlobal
              <span className="absolute left-0 -bottom-2 w-full h-[1px] bg-black dark:bg-white" />
            </h1>

            <span className="block mt-3 text-[10px] tracking-[0.45em] text-black dark:text-white text-center font-[DM_Sans]">
              OUTDO IT
            </span>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* CTA – Desktop */}
          <a
            href="#"
            className="hidden md:inline-block font-[DM_Sans] text-[16px] underline text-gray-900 dark:text-white"
          >
            Start Your Free Consultation
          </a>

          {/* Calendar – Mobile */}
          <button className="md:hidden p-2">
            <Calendar size={18} className="text-black dark:text-white" />
          </button>

        
       {/* Calendar – Mobile */}
 
{/* 🌗 DARK MODE TOGGLE */}
<button
  onClick={() => setDark(!dark)}
  className="
    relative w-[52px] h-[28px] rounded-full
    bg-[#B066FF] dark:bg-[#4A0099]
    transition-colors duration-300
    flex items-center
  "
>
  {/* Track Icons */}
  <span className="absolute left-1 text-white opacity-80">
    <Sun size={14} />
  </span>
 
  <span className="absolute right-1 text-white opacity-80">
    <Moon size={14} />
  </span>
 
  {/* Slider */}
  <span
    className={`
      absolute top-[3px] left-[3px]
      w-[22px] h-[22px] rounded-full
      bg-white dark:bg-gray-800
      flex items-center justify-center
      text-[#7b2cff] dark:text-white
      transition-transform duration-300
      ${dark ? "translate-x-[24px]" : ""}
    `}
  >
    {dark ? <Moon size={12} /> : <Sun size={12} />}
  </span>
</button> 
 


        </div>
      </div>
    </header>
  );
};

export default Header;
