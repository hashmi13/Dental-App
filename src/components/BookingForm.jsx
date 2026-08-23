import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendEmail } from "../utils/email";
import { 
  FaTooth, 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaCalendarAlt, 
  FaClock, 
  FaCreditCard, 
  FaClinicMedical,
  FaCheckCircle
} from "react-icons/fa";

const servicePrices = [
  { id: "Teeth Whitening", label: "Teeth Whitening", priceCents: 15000, display: "$150", icon: "✨", duration: "45 mins" },
  { id: "Dental Implant", label: "Dental Implant", priceCents: 80000, display: "$800", icon: "🦷", duration: "60 mins" },
  { id: "Teeth Fillings", label: "Teeth Fillings", priceCents: 12000, display: "$120", icon: "💎", duration: "30 mins" },
  { id: "Oral Surgery", label: "Oral Surgery", priceCents: 50000, display: "$500", icon: "🏥", duration: "90 mins" },
  { id: "Crown and Bridges", label: "Crown & Bridges", priceCents: 45000, display: "$450", icon: "👑", duration: "60 mins" },
  { id: "Periodontal Care", label: "Periodontal Care", priceCents: 20000, display: "$200", icon: "🩺", duration: "45 mins" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

function BookingForm() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState(servicePrices[0].id);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { service: servicePrices[0].id }
  });

  useEffect(() => {
    register("service", { required: "Please select a service" });
  }, [register]);

  const handleSelectService = (id) => {
    setSelectedService(id);
    setValue("service", id);
  };

  // Direct Booking Submit (Brevo Email & MongoDB)
  const onSubmitEmail = async (data) => {
    if (!selectedDate) {
      alert("Please select a preferred date for your appointment.");
      return;
    }
    if (!selectedTime) {
      alert("Please select a preferred time slot.");
      return;
    }

    setIsSubmittingEmail(true);

    const serviceObj = servicePrices.find(s => s.id === selectedService) || servicePrices[0];
    const amountDollars = serviceObj.priceCents / 100;
    const formattedDate = selectedDate.toLocaleDateString();

    try {
      // Save appointment to MongoDB
      try {
        await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address || "",
            service: selectedService,
            date: formattedDate,
            time: selectedTime,
            message: data.message || "",
            amount: amountDollars,
            paymentStatus: "Pay at Clinic",
          }),
        });
      } catch (dbErr) {
        console.warn("Could not save to MongoDB:", dbErr.message);
      }

      await sendEmail({
        user_name: data.name,
        name: data.name,
        email: data.email,
        user_email: data.email,
        phone: data.phone,
        user_phone: data.phone,
        address: data.address || "",
        service_name: selectedService,
        service: selectedService,
        appointment_date: formattedDate,
        date: formattedDate,
        appointment_time: selectedTime,
        time: selectedTime,
        message: data.message || "",
        amount: `$${amountDollars}`,
        payment_status: "Pay at Clinic",
      });

      // Redirect immediately to Thank You page!
      navigate(
        `/thank-you?status=booked&name=${encodeURIComponent(data.name)}&service=${encodeURIComponent(selectedService)}&date=${encodeURIComponent(formattedDate)}&time=${encodeURIComponent(selectedTime)}`
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to process appointment. Please try again.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Stripe Online Payment Submit
  const handleStripePayment = async (data) => {
    if (!selectedDate) {
      alert("Please select a preferred date.");
      return;
    }
    if (!selectedTime) {
      alert("Please select a preferred time slot.");
      return;
    }

    const serviceObj = servicePrices.find(s => s.id === selectedService) || servicePrices[0];
    const formattedDate = selectedDate.toLocaleDateString();

    setLoadingStripe(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address || "",
          service: selectedService,
          date: formattedDate,
          time: selectedTime,
          message: data.message || "",
          priceInCents: serviceObj.priceCents,
        }),
      });

      const result = await response.json();

      if (response.ok && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error(result.error || "Failed to initialize Stripe checkout.");
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      alert(err.message || "Stripe payment failed to load. Ensure backend server is running.");
    } finally {
      setLoadingStripe(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-8 text-left">
        {/* Step 1: Select Dental Service */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <FaTooth className="text-cyan-600" /> Step 1: Select Dental Treatment
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {servicePrices.map((item) => {
              const isSelected = selectedService === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectService(item.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 text-left relative flex flex-col justify-between ${
                    isSelected
                      ? "border-cyan-600 bg-cyan-50/80 shadow-md ring-2 ring-cyan-500/30"
                      : "border-gray-200 bg-white hover:border-cyan-300 hover:bg-gray-50/80"
                  }`}
                >
                  {isSelected && (
                    <FaCheckCircle className="absolute top-3 right-3 text-cyan-600 text-base" />
                  )}
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                      {item.label}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{item.duration}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Price</span>
                    <span className="text-sm font-bold text-cyan-700">{item.display}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
        </div>

        {/* Step 2: Date & Time Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <FaCalendarAlt className="text-cyan-600" /> Step 2: Choose Date & Time
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Preferred Date</label>
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  placeholderText="Select Date"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm cursor-pointer"
                />
                <FaCalendarAlt className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Preferred Time Slot</label>
              <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm appearance-none cursor-pointer"
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <FaClock className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Patient Information */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <FaUser className="text-cyan-600" /> Step 3: Patient Details
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Full Name is required" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
                />
                <FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="patient@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
                />
                <FaEnvelope className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
                />
                <FaPhoneAlt className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Residential Address</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="123 Main St, City, State, ZIP"
                  {...register("address", { required: "Address is required" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
                />
                <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              </div>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Additional Concerns or Notes (Optional)</label>
            <textarea
              {...register("message")}
              rows="3"
              placeholder="Describe any specific dental symptoms or medical requests..."
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            />
          </div>
        </div>

        {/* Payment Buttons Header */}
        <div className="pt-2 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pay with Stripe */}
            <button
              type="button"
              onClick={handleSubmit(handleStripePayment)}
              disabled={loadingStripe || isSubmittingEmail}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 px-5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-60 transform hover:-translate-y-0.5"
            >
              <FaCreditCard className="text-lg" />
              <span>{loadingStripe ? "Initializing..." : "Pay Online with Stripe"}</span>
            </button>

            {/* Book & Pay at Clinic */}
            <button
              type="submit"
              disabled={isSubmittingEmail || loadingStripe}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 px-5 rounded-xl transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-60 transform hover:-translate-y-0.5"
            >
              <FaClinicMedical className="text-lg" />
              <span>{isSubmittingEmail ? "Confirming..." : "Book & Pay at Clinic"}</span>
            </button>
          </div>
          {/* <p className="text-center text-xs text-gray-500 mt-3">
            🔒 Instant confirmation email sent via Brevo. Encrypted 256-bit payment processing.
          </p> */}
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
