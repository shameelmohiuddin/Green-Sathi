import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const [toast, setToast] = useState('');
  const { t } = useLanguage();

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

    const randomOtp = validOtps[Math.floor(Math.random() * validOtps.length)];
    setStep('otp');
    setTimeout(() => {
      setToast(`Messages: Your Green Sathi OTP is ${randomOtp}`);
      setTimeout(() => setToast(''), 2500);
    }, 3000);
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
        
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] bg-[#1A1A1A] text-white px-6 py-4 rounded-xl font-medium shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 w-full max-w-sm border border-gray-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            {toast}
          </div>
        )}

        {/* Soft Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[80px] opacity-60 translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none dark:hidden"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-10 -translate-x-1/3 translate-y-1/3 z-0 pointer-events-none dark:hidden"></div>

        <div className="relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col h-full flex-grow pt-4 pb-12">
          
          <button 
            onClick={() => router.push('/login')}
            className="flex items-center text-primary dark:text-gray-300 font-semibold mb-6 hover:underline w-fit"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('backToLogin')}
          </button>

          <div className="mb-8">
            <div className="w-14 h-14 bg-primary/10 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-primary dark:text-white mb-4">
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-primary dark:text-white mb-2">{t('newReg')}</h1>
            <p className="text-charcoal dark:text-gray-300 font-medium">{t('joinCommunity')}</p>
          </div>

          <div className="flex-grow flex flex-col bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-50 dark:border-gray-700 transition-colors duration-300">
            {step === 'details' ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">{t('fullName')}</label>
                    <input 
                      type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                      placeholder={t('namePlaceholder')}
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">{t('phoneNumber')}</label>
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
                    <label className="text-sm font-bold text-primary dark:text-gray-300">{t('village')}</label>
                    <input 
                      type="text" name="village" value={formData.village} onChange={handleInputChange}
                      placeholder={t('villagePlaceholder')}
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">{t('district')}</label>
                    <input 
                      type="text" name="districtPin" value={formData.districtPin} onChange={handleInputChange}
                      placeholder={t('districtPlaceholder')}
                      className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal dark:text-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-primary dark:text-gray-300">{t('idType')}</label>
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
                    <label className="text-sm font-bold text-primary dark:text-gray-300">{t('idNumber')}</label>
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
                  {t('continue')}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6 max-w-sm mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
                <div className="text-center">
                  <label className="block text-xl font-extrabold text-primary dark:text-white mb-2">{t('verifyMobile')}</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t('codeSent')}{formData.mobileNumber} <br/><button type="button" onClick={() => setStep('details')} className="text-primary font-semibold hover:underline mt-1">{t('edit')}</button></p>
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
