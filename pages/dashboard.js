import Head from 'next/head';
import Link from 'next/link';
import { PlusCircle, Wallet, Users, BookOpen, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
  const [userName, setUserName] = useState('Changemaker');
  const [toast, setToast] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('greenSathiUserProfile'));
    if (profile && profile.fullName) {
      // Get first name
      const firstName = profile.fullName.split(' ')[0];
      setUserName(firstName);
    }
  }, []);

  const cards = [
    {
      title: t('logEcoAction'),
      description: t('uploadDaily'),
      icon: PlusCircle,
      href: "/log-action",
      color: "bg-white dark:bg-gray-800 text-charcoal dark:text-white border-t-4 border-t-accent-lime",
      iconBg: "bg-accent-lime/20 text-primary dark:text-accent-lime"
    },
    {
      title: t('rewardsCredits'),
      description: t('checkWallet'),
      icon: Wallet,
      href: "/wallet",
      color: "bg-secondary dark:bg-primary text-primary dark:text-white border-t-4 border-t-accent-gold",
      iconBg: "bg-accent-gold/20 text-accent-gold"
    },
    {
      title: t('communityUpdates'),
      description: t('seeOthers'),
      icon: Users,
      href: "#",
      color: "bg-white dark:bg-gray-800 border-t-4 border-t-primary dark:border-t-accent-orange text-charcoal dark:text-white",
      iconBg: "bg-secondary/50 dark:bg-gray-700 text-primary dark:text-accent-orange",
      comingSoon: true
    },
    {
      title: t('trainingResources'),
      description: t('learnMore'),
      icon: BookOpen,
      href: "/training",
      color: "bg-white dark:bg-gray-800 border-t-4 border-t-primary dark:border-t-accent-lime text-charcoal dark:text-white",
      iconBg: "bg-secondary/50 dark:bg-gray-700 text-primary dark:text-accent-lime"
    }
  ];

  return (
    <>
      <Head>
        <title>Dashboard | Green Sathi</title>
      </Head>

      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-lime/10 rounded-full blur-3xl -z-10 pointer-events-none dark:hidden"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl -z-10 pointer-events-none dark:hidden"></div>

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

        {/* Header Section */}
        <div className="pt-4">
          <h1 className="text-3xl font-extrabold text-primary dark:text-white mb-2">{t('hello')}, {userName}! 👋</h1>
          <p className="text-charcoal dark:text-gray-300 font-medium text-lg">{t('empowering')}</p>
        </div>

        {/* Highlight Card */}
        <div className="bg-gradient-to-br from-primary to-[#2A5A46] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">{t('yourImpact')}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-accent-gold">240</span>
              <span className="text-lg font-medium">{t('ecoPoints')}</span>
            </div>
            <p className="text-white/90 text-sm mt-2">{t('topContributor')}</p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => {
            const CardContent = (
              <div className={`p-6 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group flex items-center justify-between cursor-pointer ${card.color}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg}`}>
                    <card.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                    <p className="text-sm opacity-80 font-medium">{card.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
              </div>
            );

            if (card.comingSoon) {
              return (
                <div key={index} onClick={() => { setToast("Community feature coming soon!"); setTimeout(() => setToast(''), 3000); }}>
                  {CardContent}
                </div>
              );
            }

            return (
              <Link key={index} href={card.href}>
                {CardContent}
              </Link>
            );
          })}
        </div>

      </div>
    </>
  );
}
