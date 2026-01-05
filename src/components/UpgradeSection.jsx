import upgradeVideo from "../assets/image/rotating-mechanism-of-an-abstract-space-ship-on-bl.mp4";

export default function UpgradeSection() {
  return (
    <section className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden text-white">

      {/* 🔹 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={upgradeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/70 to-black/0 z-[1]" />

      {/* 🔹 Content */}
      <div className="relative z-[2] max-w-[760px] px-5 text-center">
        <h2 className="font-[Marcellus] text-[24px] md:text-[48px] leading-[44px] md:leading-[56px] mb-5">
          We’re Upgrading for You!
        </h2>

        <p className="text-[14px] md:text-[16px] leading-[24px] text-white/90">
          At V Global, innovation starts with us too. Our website is currently
          undergoing a major upgrade to bring you a faster, smarter, and more
          engaging experience.
          <br /><br />
          While we complete the new build, this page gives you everything you
          need to connect with us directly. Fill in the form below, and our team
          will be in touch right away.
          <br /><br />
          Stay tuned; our full website relaunch is coming soon.
        </p>
      </div>
    </section>
  );
}
