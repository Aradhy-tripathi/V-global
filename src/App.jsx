import { useEffect, useState } from "react";

import Header from "./components/header";
import Hero from "./components/Hero";
import VideoSection from "./components/videosection";
import WhoWeAre from "./components/WhoWeAre";
import WhatWeDo from "./components/WhatWeDo";
import ImageHeadingSlider2 from "./components/ImageHeadingSlider2";
import IndustrySlider from "./components/IndustrySlider";
import HowToWorkWithUs from "./components/HowToWorkWithUs";
import UpgradeSection from "./components/UpgradeSection";
import BuildFutureSection from "./components/BuildFutureSection";
import GoalsCTASection from "./components/GoalsCTASection";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <>
      <Header dark={dark} setDark={setDark} />

      <Hero />
      <VideoSection />
      <WhoWeAre />
      <WhatWeDo />
      <ImageHeadingSlider2 />
      <IndustrySlider />
      <HowToWorkWithUs />
      <UpgradeSection />
      <BuildFutureSection />
      <GoalsCTASection />
      <Footer />
    </>
  );
}

export default App;
