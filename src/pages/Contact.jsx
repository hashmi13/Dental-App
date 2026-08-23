import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <>
      <div className="flex items-center justify-center mt-24 bg-white px-4 py-12 min-h-[calc(100vh-5rem)]">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 border border-white/40">
          <div className="space-y-6 text-gray-800">
            <h1 className="text-3xl sm:text-4xl font-bold text-cyan-700">Contact Us</h1>
            <p className="text-base sm:text-lg">
              We&apos;d love to hear from you. Reach out with any questions or concerns.
            </p>

            <div>
              <h2 className="font-semibold text-lg">Address</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                123 Dental Avenue, Cityville, State 12345, USA
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Phone</h2>
              <a href="tel:+11234567890" className="text-gray-700 text-sm sm:text-base hover:text-cyan-600">
                (123) 456-7890
              </a>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Email</h2>
              <a href="mailto:info@brightsmile.com" className="text-gray-700 text-sm sm:text-base hover:text-cyan-600">
                info@brightsmile.com
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block font-medium mb-1 text-sm sm:text-base">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block font-medium mb-1 text-sm sm:text-base">Subject</label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block font-medium mb-1 text-sm sm:text-base">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              {submitError && (
                <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center shadow-sm text-sm sm:text-base"
                  role="status"
                >
                  Message sent successfully! We&apos;ll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </>
      );
}

export default Contact;
