import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArrowLeft, Clock } from 'lucide-react';

export default function Rewards() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Redeem Rewards | Green Sathi</title>
      </Head>
      <div className="min-h-screen flex flex-col p-6 bg-background dark:bg-charcoal relative overflow-hidden font-sans transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[80px] opacity-60 translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none dark:hidden"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-10 -translate-x-1/3 translate-y-1/3 z-0 pointer-events-none dark:hidden"></div>

        <div className="relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col h-full flex-grow pt-8">
          
          <button 
            onClick={() => router.back()}
            className="flex items-center text-primary dark:text-gray-300 font-semibold mb-8 hover:underline w-fit"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Wallet
          </button>

          <div className="flex-grow flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-primary/10 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-12 h-12 text-primary dark:text-gray-400" />
            </div>
            <h1 className="text-4xl font-extrabold text-primary dark:text-white mb-4">Payouts Coming Soon!</h1>
            <p className="text-charcoal dark:text-gray-300 font-medium text-lg max-w-sm mb-8">
              We are currently integrating with local payment gateways (UPI). Your Eco-Points are safe and will be redeemable for real rewards very soon!
            </p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg"
            >
              Return to Dashboard
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
