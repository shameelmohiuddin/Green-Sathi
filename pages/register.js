import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState('details'); // 'details' or 'otp'
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    village: '',
    districtPin: '',
    idType: 'Aadhaar',
    idNumber: ''
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const validOtps = ['8492', '3715', '9021', '1478', '6523', '7890', '4321', '5647', '2198', '8834'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.fullName || formData.mobileNumber.length < 10 || !formData.village || !formData.districtPin || !formData.idNumber) {
      setError("Please fill out all required fields correctly.");
      return;
    }

    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    if (validOtps.includes(otp)) {
      const newUser = { ...formData, role: 'user' };
      
      // Save to Database array
      const usersDB = JSON.parse(localStorage.getItem('greenSathiUsersDB') || '[]');
      usersDB.push(newUser);
      localStorage.setItem('greenSathiUsersDB', JSON.stringify(usersDB));

      // Set active session
      localStorage.setItem('greenSathiUserProfile', JSON.stringify(newUser));
      localStorage.setItem('greenSathiRole', 'user');
      router.push('/dashboard');
    } else {
      setError("Invalid OTP. Please check and try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Register | Green Sathi</title>
      </Head>
      <div className="min-h-screen flex flex-col p-6 bg-background dark:bg-charcoal relative overflow-hidden font-sans transition-colors duration-300">
        {/* Soft Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[80px] opacity-60 translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none dark:hidden"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-10 -translate-x-1/3 translate-y-1/3 z-0 pointer-events-none dark:hidden"></div>

        <div className="relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col h-full flex-grow pt-4 pb-12">
          
          <button 
            onClick={() => router.push('/login')}
            className="flex items-center text-primary dark:text-gray-300 font-semibold mb-6 hover:underline w-fit"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>

          <div className="mb-8">
            <div className="w-14 h-14 bg-primary/10 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-primary dark:text-white mb-4">
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-primary dark:text-white mb-2">New Registration</h1>
            <p className="text-charcoal dark:text-gray-300 font-medium">Join the Green Sathi community and start your journey.</p>
          </div>

          <div className="flex-grow flex flex-col bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-50 dark:border-gray-700 transition-colors duration-300">
            {step === 'details' ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">Full Name</label>
                    <input 
                      type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                      placeholder="e.g. Anjali Sharma"
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">Mobile Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-semibold">
                        +91
                      </span>
                      <input 
                        type="tel" name="mobileNumber" 
                        value={formData.mobileNumber} 
                        onChange={(e) => setFormData({...formData, mobileNumber: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                        placeholder="10-digit number"
                        className="flex-1 min-w-0 block w-full px-4 py-4 rounded-none rounded-r-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">Village / Gram Panchayat</label>
                    <input 
                      type="text" name="village" value={formData.village} onChange={handleInputChange}
                      placeholder="e.g. Rampur"
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">District & PIN Code</label>
                    <input 
                      type="text" name="districtPin" value={formData.districtPin} onChange={handleInputChange}
                      placeholder="e.g. Pune, 411001"
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">Verification ID Type</label>
                    <select 
                      name="idType" value={formData.idType} onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none font-medium text-charcoal dark:text-white transition-all"
                    >
                      <option value="Aadhaar">Aadhaar</option>
                      <option value="Ration Card">Ration Card</option>
                      <option value="Voter ID">Voter ID</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">ID Number</label>
                    <input 
                      type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange}
                      placeholder="Enter ID number"
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 font-semibold text-sm mt-2 animate-in fade-in">{error}</p>}
                
                <button 
                  type="submit"
                  className="w-full md:max-w-xs mx-auto mt-6 px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg"
                >
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6 max-w-sm mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
                <div className="text-center">
                  <label className="block text-xl font-extrabold text-primary dark:text-white mb-2">Verify Mobile</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Code sent to +91 {formData.mobileNumber} <br/><button type="button" onClick={() => setStep('details')} className="text-primary font-semibold hover:underline mt-1">Edit Number</button></p>
                  <input 
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="1234"
                    className="block w-full px-4 py-4 text-center tracking-[1em] text-2xl font-bold rounded-2xl bg-gray-50 dark:bg-gray-900 text-charcoal dark:text-white border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                {error && <p className="text-red-500 font-semibold text-sm text-center animate-in fade-in">{error}</p>}
                <button 
                  type="submit"
                  className="w-full mt-2 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg"
                >
                  Complete Registration
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
}
