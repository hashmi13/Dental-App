import { useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import BookingForm from '../components/BookingForm';

function Booking() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6 text-center">
        <p className="text-red-600 text-xl font-semibold">
          You must be signed in to book an appointment.
        </p>

        <div className="flex gap-4">
          <SignInButton mode="modal">
            <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-white text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-4 bg-gradient-to-r from-cyan-100 to-cyan-200 px-4 py-16">
      <div className="max-w-3xl w-full bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 sm:p-10 text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-cyan-700">
          Schedule Your Visit
        </h1>
        <p className="text-gray-700 text-base sm:text-lg">
          Choose a convenient time for your dental appointment.
          <br />
          We'll confirm your booking within 24 hours.
        </p>
        <BookingForm />
      </div>
    </div>
  );
}

export default Booking;
