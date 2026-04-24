import Head from 'next/head';
import Link from 'next/link';
import { PlusCircle, Wallet, Users, BookOpen, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userName, setUserName] = useState('Changemaker');

  const cards = [
    {
      title: "Log Eco-Action",
      description: "Upload your daily green activities",
      icon: PlusCircle,
      href: "/log-action",
      color: "bg-primary text-white",
      iconBg: "bg-white/20"
    },
    {
      title: "Rewards & Credits",
      description: "Check your Eco-Wallet balance",
      icon: Wallet,
      href: "/wallet",
      color: "bg-secondary text-primary",
      iconBg: "bg-primary/10"
    },
    {
      title: "Community Updates",
      description: "See what others are doing",
      icon: Users,
      href: "/community",
      color: "bg-white border border-gray-100 text-charcoal",
      iconBg: "bg-secondary/50 text-primary"
    },
    {
      title: "Training & Resources",
      description: "Learn more about sustainability",
      icon: BookOpen,
      href: "/training",
      color: "bg-white border border-gray-100 text-charcoal",
      iconBg: "bg-secondary/50 text-primary"
    }
  ];

  return (
    <>
      <Head>
        <title>Dashboard | Green Sathi</title>
      </Head>

      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <div className="pt-4">
          <h1 className="text-3xl font-extrabold text-primary mb-2">Hello, {userName}! 👋</h1>
          <p className="text-charcoal font-medium text-lg">Empowering Women through Green Action</p>
        </div>

        {/* Highlight Card */}
        <div className="bg-primary text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">Your Impact</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">240</span>
              <span className="text-lg font-medium">Eco-Points</span>
            </div>
            <p className="text-white/90 text-sm mt-2">You're in the top 10% of contributors this week!</p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <Link key={index} href={card.href}>
              <div className={`p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group flex items-center justify-between cursor-pointer ${card.color}`}>
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
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}
