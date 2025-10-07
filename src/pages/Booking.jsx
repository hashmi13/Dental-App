import { useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import BookingForm from '../components/BookingForm';

function Booking() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
     <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8 text-center">
  {/* Image Container with Aspect Ratio */}
  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl aspect-[4/3] mb-4 sm:mb-6 md:mb-8">
    <img 
      src="/signin_img.jpeg" 
      alt="Sign in illustration" 
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
  </div>
 
  {/* Buttons Container */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md justify-center">
    <SignInButton mode="modal">
      <button className="bg-cyan-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base font-medium">
        Sign In
      </button>
    </SignInButton>

    <SignUpButton mode="modal">
      <button className="bg-white text-cyan-600 border border-cyan-600 px-6 py-3 sm:px-8 sm:py-3 rounded-lg hover:bg-cyan-50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base font-medium">
        Sign Up
      </button>
    </SignUpButton>
  </div>
</div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-4 bg-white px-4 py-16">
      <div className=" bg-gradient-to-r from-cyan-100 to-cyan-200 max-w-3xl w-full mt-5 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 sm:p-10 text-center space-y-6">
        <h1 className="text-3xl  sm:text-4xl font-bold text-cyan-700">
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
