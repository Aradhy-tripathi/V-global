import { useState } from "react";

export default function BuildFutureSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    company: "",
    phoneno: "",
    yourneeds: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://vglobal.wsisites.net/api/BuildBrightFutureForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const json = await res.json();
      console.log("Form API Response:", json);

      if (json?.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          industry: "",
          company: "",
          phoneno: "",
          yourneeds: "",
        });
      }
    } catch (err) {
      console.error("Form Submit Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="build-future"
      className="bg-white dark:bg-[#0f0f0f] py-[90px]"
    >
      <div className="max-w-[1200px] w-[95%] mx-auto">
        {/* Heading */}
        <h3 className="font-[Marcellus] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-normal mb-4 text-black dark:text-white text-center md:text-left">
          Let’s Build Your Future, Together
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Text */}
          <div className="lg:col-span-4">
            <p className="font-['DM Sans'] text-[14px] leading-[22px] max-w-[320px] text-gray-900 dark:text-gray-400 text-center md:text-left mx-auto md:mx-0">
              Fill out the form, and one of our consultants will contact you
              within 24 hours.
            </p>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-8">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <FormField label="Name">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-transparent outline-none font-['DM Sans'] text-[14px] text-black dark:text-white placeholder:text-gray-900 dark:placeholder:text-gray-500"
                />
              </FormField>

              {/* Company */}
              <FormField label="Company">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                  className="w-full bg-transparent outline-none font-['DM Sans'] text-[14px] text-black dark:text-white placeholder:text-gray-900 dark:placeholder:text-gray-500"
                />
              </FormField>

              {/* Email */}
              <FormField label="Email">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  required
                  className="w-full bg-transparent outline-none font-['DM Sans'] text-[14px] text-black dark:text-white placeholder:text-gray-900 dark:placeholder:text-gray-500"
                />
              </FormField>

              {/* Phone */}
              <FormField label="Phone No.">
                <input
                  type="text"
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full bg-transparent outline-none font-['DM Sans'] text-[14px] text-black dark:text-white placeholder:text-gray-900 dark:placeholder:text-gray-500"
                />
              </FormField>

              {/* Industry */}
              <FormField label="Industry">
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Enter industry name"
                  required
                  className="w-full bg-transparent outline-none font-['DM Sans'] text-[14px] text-black dark:text-white placeholder:text-gray-900 dark:placeholder:text-gray-500"
                />
              </FormField>

              {/* Needs */}
              <FormField label="Your Needs">
                <select
                  name="yourneeds"
                  value={formData.yourneeds}
                  onChange={handleChange}
                  required
                  className="
                    w-full bg-transparent outline-none
                    font-['DM Sans'] text-[14px]
                    text-gray-400 dark:text-gray-400
                    focus:text-black dark:focus:text-white
                    dark:bg-[#111827]
                    [&>option]:bg-white
                    dark:[&>option]:bg-[#111827]
                    dark:[&>option]:text-white
                  "
                >
                  <option value="" disabled>
                    Select services you are interested
                  </option>
                  <option value="Website Design">Website Design</option>
                  <option value="App Development">App Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Branding">Branding</option>
                </select>
              </FormField>

              {/* Submit */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#8000FF] text-white px-6 py-2 rounded-md font-['DM Sans'] text-[16px] hover:bg-[#6a00d9] transition disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="md:col-span-2 mt-2">
                  <p className="text-green-600 dark:text-green-400 text-[14px] font-['DM Sans']">
                    ✅ Thank you for your message. It has been sent.
                  </p>
                </div>
              )}
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
    <fieldset className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 pb-3">
      <legend className="px-2 text-[12px] font-['DM Sans'] text-gray-900 dark:text-gray-400">
        {label}
      </legend>
      {children}
    </fieldset>
  );
}
