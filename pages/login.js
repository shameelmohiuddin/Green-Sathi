import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState('user'); // 'user' or 'verifier'
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const validOtps = ['8492', '3715', '9021', '1478', '6523', '7890', '4321', '5647', '2198', '8834'];

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');
    if (phone.length >= 10) {
      setStep('otp');
    } else {
      setError("Please enter a valid 10-digit phone number");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    if (validOtps.includes(otp)) {
      // 3 Sample User Presets check
      const presets = {
        "9999900001": {
          fullName: "Pooja Reddy", mobileNumber: "9999900001", village: "Anantapur", districtPin: "Anantapur, 515001", idType: "Aadhaar", idNumber: "xxxx-xxxx-1234"
        },
        "9999900002": {
          fullName: "Sunita Devi", mobileNumber: "9999900002", village: "Bishnupur", districtPin: "Bankura, 722122", idType: "Voter ID", idNumber: "ABC1234567"
        },
        "9999900003": {
          fullName: "Lakshmi Bai", mobileNumber: "9999900003", village: "Chanderi", districtPin: "Ashoknagar, 473446", idType: "Ration Card", idNumber: "RC-0987654321"
        }
      };

      if (presets[phone]) {
        localStorage.setItem('greenSathiUserProfile', JSON.stringify(presets[phone]));
      } else if (!localStorage.getItem('greenSathiUserProfile')) {
        // Fallback if they didn't register and used a random phone
        localStorage.setItem('greenSathiUserProfile', JSON.stringify({
          fullName: "Changemaker", mobileNumber: phone, village: "Unknown", districtPin: "Unknown", idType: "Aadhaar", idNumber: "0000"
        }));
      }

      localStorage.setItem('greenSathiRole', role);
      router.push(role === 'user' ? '/dashboard' : '/admin');
    } else {
      setError("Invalid OTP. Please check and try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Login | Green Sathi</title>
      </Head>
      <div className="min-h-screen flex flex-col p-6 bg-background relative overflow-hidden font-sans">
        {/* Soft Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[80px] opacity-60 translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-10 -translate-x-1/3 translate-y-1/3 z-0"></div>

        <div className="relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col h-full flex-grow pt-8">
          
          <button 
            onClick={() => router.push('/')}
            className="flex items-center text-primary font-semibold mb-8 hover:underline w-fit"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-primary mb-2">Welcome Back</h1>
            <p className="text-charcoal font-medium">Log in to continue your green journey.</p>
          </div>

          {/* Role Selection */}
          <div className="flex bg-secondary/30 p-1 rounded-xl mb-8">
            <button
              onClick={() => setRole('user')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                role === 'user' 
                  ? 'bg-white text-primary shadow-md' 
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              Green Sathi User
            </button>
            <button
              onClick={() => setRole('verifier')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                role === 'verifier' 
                  ? 'bg-white text-primary shadow-md' 
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              Verifier (Admin)
            </button>
          </div>

          {/* Form Area */}
          <div className="flex-grow flex flex-col">
            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Phone Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-semibold">
                      +91
                    </span>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter your 10-digit number"
                      className="flex-1 min-w-0 block w-full px-4 py-4 rounded-none rounded-r-2xl text-charcoal border border-gray-200 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 font-semibold text-sm animate-in fade-in">{error}</p>}
                <button 
                  type="submit"
                  className="w-full mt-4 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Enter OTP</label>
                  <p className="text-sm text-gray-500 mb-4">Code sent to +91 {phone} <button type="button" onClick={() => setStep('phone')} className="text-primary font-semibold hover:underline">Edit</button></p>
                  <input 
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="1234"
                    className="block w-full px-4 py-4 text-center tracking-[1em] text-2xl font-bold rounded-2xl text-charcoal border border-gray-200 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                {error && <p className="text-red-500 font-semibold text-sm animate-in fade-in">{error}</p>}
                <button 
                  type="submit"
                  className="w-full mt-4 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg"
                >
                  Verify & Login
                </button>
              </form>
            )}
          </div>
          
          <div className="mt-8 text-center pb-8">
            <p className="text-charcoal font-medium">
              Don't have an account?{' '}
              <button 
                onClick={() => router.push('/register')}
                className="text-primary font-bold hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
}
