export default function BuildFutureSection() {
  return (
    <section className="bg-white dark:bg-[#0f0f0f] py-[90px]">
      <div className="max-w-[1200px] w-[95%] mx-auto">
        {/* Heading */}
        <h3 className="font-[Marcellus] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px]font-normal mb-4 text-black dark:text-white    text-center md:text-left">
          Let’s Build Your Future, Together
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Text */}
          <div className="lg:col-span-4">
            <p className="font-['DM Sans'] text-[14px] leading-[22px] max-w-[320px] text-gray-900 dark:text-gray-400  text-center md:text-left  mx-auto md:mx-0 
   ">
              Fill out the form, and one of our consultants will contact you
              within 24 hours.
            </p>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <FormField label="Name">
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="
                    w-full bg-transparent outline-none
                    font-['DM Sans'] text-[14px]
                    text-black dark:text-white
                    placeholder:text-gray-900 dark:placeholder:text-gray-500
                  "
                />
              </FormField>

              {/* Company */}
              <FormField label="Company">
                <input
                  type="text"
                  placeholder="Enter your company name"
                  required
                  className="
                    w-full bg-transparent outline-none
                    font-['DM Sans'] text-[14px]
                    text-black dark:text-white
                    placeholder:text-gray-900 dark:placeholder:text-gray-500
                  "
                />
              </FormField>

              {/* Email */}
              <FormField label="Email">
                <input
                  type="email"
                  placeholder="Enter your email id"
                  required
                  className="
                    w-full bg-transparent outline-none
                    font-['DM Sans'] text-[14px]
                    text-black dark:text-white
                    placeholder:text-gray-900 dark:placeholder:text-gray-500
                  "
                />
              </FormField>

              {/* Phone */}
              <FormField label="Phone No.">
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  required
                  className="
                    w-full bg-transparent outline-none
                    font-['DM Sans'] text-[14px]
                    text-black dark:text-white
                    placeholder:text-gray-900 dark:placeholder:text-gray-500
                  "
                />
              </FormField>

              {/* Industry */}
              <FormField label="Industry">
                <input
                  type="text"
                  placeholder="Enter industry name"
                  className="
                    w-full bg-transparent outline-none
                    font-['DM Sans'] text-[14px]
                    text-black dark:text-white
                    placeholder:text-gray-900 dark:placeholder:text-gray-500
                  "
                />
              </FormField>

              {/* Needs */}
             <FormField label="Your Needs">
  <select
    className="
      w-full bg-transparent outline-none
      font-['DM Sans'] text-[14px]
      text-gray-900 dark:text-white

      dark:bg-[#111827]
      dark:border-none

      [&>option]:bg-white
      dark:[&>option]:bg-[#111827]
      dark:[&>option]:text-white
      dark:[&>option:hover]:bg-[#8000FF]
      dark:[&>option:checked]:bg-[#5b00c9]
    "
  >
    <option value="">
      Select services you are interested
    </option>
    <option>Website Design</option>
    <option>App Development</option>
    <option>Digital Marketing</option>
    <option>Branding</option>
  </select>
</FormField>


              {/* Submit */}
              <div className="md:col-span- mt-4">
                <button
                  type="submit"
                  className="
                     w-full md:w-auto
                    bg-[#8000FF] text-white px-6 py-2 rounded-md
                    font-['DM Sans'] text-[16px]
                    hover:bg-[#6a00d9] transition
                  "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable Field Wrapper */
function FormField({ label, children }) {
  return (
    <fieldset className="
      border border-gray-300 dark:border-gray-700
      rounded-lg px-3 pb-3
    ">
      <legend className="
        px-2 text-[12px] font-['DM Sans']
        text-gray-900 dark:text-gray-400
      ">
        {label}
      </legend>
      {children}
    </fieldset>
  );
}
