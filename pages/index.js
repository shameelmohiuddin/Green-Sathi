import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [toast, setToast] = useState('');

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

      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden font-sans">
        
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-charcoal text-white px-6 py-3 rounded-full font-bold shadow-xl animate-in slide-in-from-top-4 fade-in duration-300">
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
            <h1 className="text-3xl lg:text-4xl font-extrabold text-primary mb-2 tracking-tight">Welcome to Green Sathi</h1>
            <p className="text-charcoal font-medium text-lg lg:text-xl">Empowering Women through Green Action</p>
          </div>

          <div className="w-full flex justify-center mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary opacity-80">
              Select Language
            </span>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button 
              onClick={() => router.push('/login')}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg flex justify-center items-center gap-2"
            >
              English
            </button>
            <button 
              onClick={handleComingSoon}
              className="w-full py-4 border-2 border-primary/20 text-primary bg-secondary/30 font-semibold rounded-2xl hover:bg-secondary/50 active:scale-95 transition-all flex justify-center items-center gap-2"
            >
              ಕನ್ನಡ (Kannada)
            </button>
            <button 
              onClick={handleComingSoon}
              className="w-full py-4 border-2 border-primary/20 text-primary bg-secondary/30 font-semibold rounded-2xl hover:bg-secondary/50 active:scale-95 transition-all flex justify-center items-center gap-2"
            >
              हिंदी (Hindi)
            </button>
          </div>

        </div>
      </main>
    </>
  );
}
