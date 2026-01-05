import bgImage from "../assets/image/bg_last.png"; // update path if needed

export default function GoalsCTASection() {
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
          Your goals, our expertise. Let’s design your digital future together.
        </h3>

        <button className="bg-[#8000FF] hover:bg-[#8000FF] transition px-6 py-2 rounded-md text-[16px] font-['DM Sans']">
          Start the Conversation
        </button>
      </div>
    </section>
  );
}
