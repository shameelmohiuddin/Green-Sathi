import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [toast, setToast] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const handleComingSoon = () => {
    setToast("Language support coming soon!");
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <>
      <Head>
        <title>Green Sathi | Empowering Women through Green Action</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background dark:bg-charcoal relative overflow-hidden font-sans transition-colors duration-300">
        
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 text-charcoal dark:text-white shadow-md z-50">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] bg-[#1A1A1A] text-white px-6 py-4 rounded-xl font-medium shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 w-full max-w-sm border border-gray-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            {toast}
          </div>
        )}

        {/* Soft geometric background patterns for an immersive feel */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary rounded-full filter blur-[80px] opacity-60 -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-10 translate-x-1/3 translate-y-1/3 z-0"></div>

        <div className="w-full max-w-md flex flex-col items-center z-10">
          
          <div className="w-40 h-40 mb-8 p-3 rounded-full border-4 border-white shadow-xl bg-white flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Green Sathi Logo" 
              className="w-full h-full object-contain rounded-full" 
            />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-primary dark:text-white mb-2 tracking-tight">Welcome to Green Sathi</h1>
            <p className="text-charcoal dark:text-gray-300 font-medium text-lg lg:text-xl">Empowering Women through Green Action</p>
          </div>

          <div className="w-full flex justify-center mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary dark:text-gray-400 opacity-80">
              Select Language
            </span>
          </div>

          <div className="flex flex-col gap-3 w-full mb-6">
            <button 
              className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md text-lg flex justify-center items-center gap-2"
            >
              English (Active)
            </button>
            <div className="flex gap-3">
              <button 
                onClick={handleComingSoon}
                className="flex-1 py-3 border-2 border-primary/20 text-primary bg-secondary/30 font-semibold rounded-xl hover:bg-secondary/50 transition-all flex justify-center items-center"
              >
                ಕನ್ನಡ
              </button>
              <button 
                onClick={handleComingSoon}
                className="flex-1 py-3 border-2 border-primary/20 text-primary bg-secondary/30 font-semibold rounded-xl hover:bg-secondary/50 transition-all flex justify-center items-center"
              >
                हिंदी
              </button>
            </div>
          </div>

          <div className="w-full border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col gap-4">
            <button 
              onClick={() => router.push('/login')}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg flex justify-center items-center gap-2"
            >
              Continue to Login
            </button>
            <button 
              onClick={() => router.push('/register')}
              className="w-full py-4 border-2 border-primary dark:border-gray-600 text-primary dark:text-white bg-white dark:bg-gray-800 font-bold rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all text-lg flex justify-center items-center gap-2"
            >
              Register as New User
            </button>
          </div>

        </div>
      </main>
    </>
  );
}
