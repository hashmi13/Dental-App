import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaTriangleExclamation,
} from "react-icons/fa6";
import Footer from "../components/Footer";
import { sendContactEmail } from "../utils/email";

function Contact() {
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await sendContactEmail({
        user_name: data.name,
        from_name: data.name,
        user_email: data.email,
        reply_to: data.email,
        subject: data.subject,
        message: data.message,
      });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      setSubmitError(
        err?.text || err?.message || "Failed to send message. Please try again or call us."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-[#D8E2DE] px-0 py-2.5 text-[15px] text-[#16241F] placeholder:text-[#16241F]/35 focus:outline-none focus:border-[#0B6E6E] transition-colors";

  return (
    <>
      <div className="bg-[#F5F7F5] pt-28 pb-20 px-4 sm:px-6 min-h-[calc(100vh-5rem)]">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow + heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="block text-xs font-semibold tracking-[0.2em] text-cyan-500  uppercase mb-3">
              Get in touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#16241F] leading-[1.05] tracking-tight max-w-xl">
              Tell us what's going on,
              <br /> we'll take it from there.
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Appointment-card style info panel */}
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <div className="relative bg-white rounded-2xl border border-[#D8E2DE] shadow-[0_1px_2px_rgba(22,36,31,0.04)] overflow-hidden">
                <div className="p-7 sm:p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <FaLocationDot className="text-cyan-500  text-lg mt-1 shrink-0" />
                    <div>
                      <h2 className="text-sm font-semibold text-[#16241F] mb-1">Visit the clinic</h2>
                      <p className="text-sm text-[#16241F]/70 leading-relaxed">
                        123 Dental Avenue, Cityville, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaPhone className="text-cyan-500  text-lg mt-1 shrink-0" />
                    <div>
                      <h2 className="text-sm font-semibold text-[#16241F] mb-1">Call the front desk</h2>
                      <a
                        href="tel:+11234567890"
                        className="text-sm text-[#16241F]/70 hover:text-cyan-500  transition-colors"
                      >
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaEnvelope className="text-cyan-500  text-lg mt-1 shrink-0" />
                    <div>
                      <h2 className="text-sm font-semibold text-[#16241F] mb-1">Email us</h2>
                     
                      <a
                      
                        href="mailto:info@brightsmile.com"
                        className="text-sm text-[#16241F]/70 hover:text-cyan-500  transition-colors"
                      >
                        info@brightsmile.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Perforated tear divider — signature element */}
                <div className="relative h-0 border-t border-dashed border-[#D8E2DE]">
                  <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#F5F7F5]" />
                  <span className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#F5F7F5]" />
                </div>

                <div className="p-7 sm:p-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <FaClock className="text-cyan-500  text-lg mt-1 shrink-0" />
                    <div className="text-sm text-[#16241F]/70 leading-relaxed">
                      <h2 className="text-sm font-semibold text-[#16241F] mb-1">Hours</h2>
                      <div className="flex justify-between max-w-[220px]">
                        <span>Mon – Fri</span><span>9:00 – 6:00</span>
                      </div>
                      <div className="flex justify-between max-w-[220px]">
                        <span>Saturday</span><span>9:00 – 2:00</span>
                      </div>
                      <div className="flex justify-between max-w-[220px]">
                        <span>Sunday</span><span>Closed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#FF7A59]/10 rounded-lg px-4 py-3 mt-2">
                    <FaTriangleExclamation className="text-[#FF7A59] shrink-0" />
                    <p className="text-xs text-[#16241F]/80 leading-snug">
                      Dental emergency? Call us directly — don't wait for a reply here.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Form panel */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-2xl border border-[#D8E2DE] shadow-[0_1px_2px_rgba(22,36,31,0.04)] p-7 sm:p-10">
                <span className="block text-xs font-semibold tracking-[0.2em] text-cyan-500  uppercase mb-2">
                  Send a message
                </span>
                <h2 className="font-serif text-2xl text-[#16241F] mb-8">
                  We usually reply within one business day.
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-[#16241F]/60 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your full name"
                        {...register("name", { required: "Name is required" })}
                        className={inputClass}
                      />
                      {errors.name && (
                        <p className="text-[#FF7A59] text-xs mt-1.5">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-[#16241F]/60 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={inputClass}
                      />
                      {errors.email && (
                        <p className="text-[#FF7A59] text-xs mt-1.5">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-[#16241F]/60 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="What's this about?"
                      {...register("subject", { required: "Subject is required" })}
                      className={inputClass}
                    />
                    {errors.subject && (
                      <p className="text-[#FF7A59] text-xs mt-1.5">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-[#16241F]/60 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      placeholder="Tell us a bit more..."
                      {...register("message", { required: "Message is required" })}
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-[#FF7A59] text-xs mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-[#FF7A59] text-sm bg-[#FF7A59]/10 px-4 py-3 rounded-lg" role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto  bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm px-8 py-3 rounded-lg  transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                  </button>
                </form>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 flex items-center gap-3  bg-cyan-500 /8 text-cyan-500  px-4 py-3.5 rounded-lg text-sm"
                      role="status"
                    >
                      <span className="w-2 h-2 rounded-full  bg-cyan-500  shrink-0" />
                      Message sent — we'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;