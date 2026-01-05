import frameIcon from "../assets/image/frame_1.png";

const Hero = () => {
  return (  
    <section className="w-full bg-white items-center   dark:bg-[#1f1f1f] transition-colors duration-300">
      <div className="mx-auto max-w-[1200px] px-4 pt-28 pb-20 text-center">

        {/* Heading */}
        <h1
          className="
            font-[Marcellus]
            text-[32px]
            leading-[44px]
            md:text-[84px]
            md:leading-[94px]
            font-normal
            text-[#0B0B0B]
            dark:text-white
          "
        >
          Accelerate{" "}
          <span className="text-[#6F2CFF]">Your Growth</span>
          <br />
          with Smarter IT, AI, and
          <br />
          Resource Solutions
        </h1>

        {/* Subtitle (DESKTOP ONLY) */}
        <p
          className="
            hidden md:block
            mt-8
            max-w-[720px]
            mx-auto
            font-['DM Sans']
            text-[24px]
            leading-[34px]
            font-medium
            text-[#2F2F2F]
            dark:text-gray-300
            font-weight: 600
            line-height: 1.875;
          "
        >
          From enterprise consulting to digital engineering, V Global empowers
          companies worldwide with scalable, secure, and innovative technology
          services. Partner with us to transform your challenges into
          opportunities!
        </p>

        {/* CTA */}
       <div className="mt-10">
  <button
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
