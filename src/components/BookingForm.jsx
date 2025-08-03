import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const onSubmit = (data) => {
    console.log({ ...data, appointmentDate: selectedDate, appointmentTime: selectedTime });
    setShowSuccess(true);
    reset();
    setSelectedDate(null);
    setSelectedTime('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-left bg-white rounded-xl p-6 shadow-md w-full max-w-xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-cyan-700 mb-4">Book Your Appointment</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Service</label>
            <select
              {...register("service", { required: "Please select a service" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select a service</option>
              <option value="teeth-whitening">Teeth Whitening</option>
              <option value="dental-implant">Dental Implant</option>
              <option value="teeth-fillings">Teeth Fillings</option>
              <option value="oral-surgery">Oral Surgery</option>
              <option value="crown-bridges">Crown and Bridges</option>
              <option value="periodontal">Periodontal Care</option>
            </select>
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Preferred Date</label>
            <DatePicker
              selected={selectedDate}
              required={true}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              placeholderText="Select a date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Preferred Time</label>
            <select
             required={true}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Notes</label>
          <textarea
            {...register("message")}
            rows="4"
            placeholder="Add any specific concerns..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-3 rounded-md hover:bg-cyan-700 transition duration-300"
        >
          Book Appointment
        </button>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg px-6 py-8 w-11/12 max-w-md text-center animate-bounce-in">
            <h3 className="text-2xl font-semibold text-green-600 mb-2">Booking Successful!</h3>
            <p className="text-gray-700">We'll contact you soon to confirm your appointment.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
