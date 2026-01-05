import {
  Instagram,
  Facebook,
  Twitter,
  Globe,
} from "lucide-react";

import buildingIcon from "../assets/image/ph_building-office-light.png";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0f0f0f] pt-20 pb-6">
      <div className="max-w-[1200px] w-[95%] mx-auto">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Left */}
          <div>   
 
            <h5 className="font-[Marcellus]  text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] mb-3 text-center md:text-left text-black dark:text-white">
              Get In Touch
            </h5>

            <p className="flex items-start gap-2 text-[16px] text-[#6c757d] dark:text-gray-400 max-w-[480px]">
              <img
                src={buildingIcon}
                alt=""
                className="w-5 h-5 mt-[2px] opacity-80"
              />
              ViGlobal Inc, Plaza II Suite 320 – 317 George Street,
              New Brunswick, NJ 08901
            </p>
          </div>

          {/* Right */}
          <div className="text-[16px] text-[#6c757d] dark:text-gray-400 md:text-right">
            <p>
              <strong className="text-black dark:text-white">US:</strong>{" "}
              <a
                href="tel:+12473207257"
                className="hover:text-black dark:hover:text-white transition"
              >
                +1 (347) 230-7257
              </a>
              <span className="mx-3">|</span>
              <strong className="text-black dark:text-white">IN:</strong>{" "}
              <a
                href="tel:+919822195570"
                className="hover:text-black dark:hover:text-white transition"
              >
                +91 9822195570
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright */}
          <div className="text-[16px] text-[#6c757d] dark:text-gray-400">
            © 2025 ViGlobal Inc.
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 text-[#6c757d] dark:text-gray-400">
            <a className="hover:text-black dark:hover:text-white transition">
              <Instagram size={24} />
            </a>
            <a className="hover:text-black dark:hover:text-white transition">
              <Facebook size={24} />
            </a>
            <a className="hover:text-black dark:hover:text-white transition">
              <Twitter size={24} />
            </a>
            <a className="hover:text-black dark:hover:text-white transition">
              <Globe size={24} />
            </a>
          </div>

          {/* Back to top */}
          <div>
            <a
              href="#top"
              className="text-[16px] text-[#6c757d] dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center gap-1"
            >
              Back to Top ↑
            </a>
          </div>

        </div>
      </div>
    </footer> 
  ); 
} 
