import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Gift, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react';

export default function Wallet() {
  const [balance, setBalance] = useState(240);
  const [transactions, setTransactions] = useState([]);
  const [redeemed, setRedeemed] = useState(false);

  useEffect(() => {
    // Load local storage actions
    const localActions = JSON.parse(localStorage.getItem('greenSathiActions') || '[]');
    
    // Calculate total balance from verified actions
    const totalVerifiedPoints = localActions
      .filter(action => action.status === 'Verified')
      .reduce((sum, action) => sum + (action.points || 0), 0);
      
    // Add mock points for initial demo experience (if no local actions)
    if (localActions.length === 0) {
      setBalance(240); // 100 + 140 from mock
      const mock = [
        { id: 1, type: "Tree Planting", status: "Verified", points: 100, date: "2026-04-20" },
        { id: 2, type: "Composting", status: "Verified", points: 140, date: "2026-04-18" },
      ];
      setTransactions(mock);
    } else {
      // Merge mock with local
      const mockTransactions = [
        { id: 1, type: "Tree Planting", status: "Verified", points: 100, date: "2026-04-20" },
        { id: 2, type: "Composting", status: "Verified", points: 140, date: "2026-04-18" },
      ];
      setTransactions([...localActions, ...mockTransactions]);
      setBalance(totalVerifiedPoints + 240); // Add mock balance to dynamic balance
    }
  }, []);

  const router = useRouter();

  const handleRedeem = () => {
    router.push('/rewards');
  };

  return (
    <>
      <Head>
        <title>Wallet | Green Sathi</title>
      </Head>

      <div className="flex flex-col gap-6 w-full max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 relative transition-colors duration-300">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-lime/10 rounded-full blur-3xl -z-10 pointer-events-none dark:hidden"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl -z-10 pointer-events-none dark:hidden"></div>
        
        <div>
          <h1 className="text-3xl font-extrabold text-primary dark:text-white mb-2">Eco-Wallet</h1>
          <p className="text-charcoal dark:text-gray-300 font-medium">Manage your green credits and rewards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-primary to-[#2A5A46] text-white rounded-[32px] p-8 shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 rounded-full translate-x-1/3 translate-y-1/3 z-0"></div>
            
            <span className="relative z-10 text-white/80 font-bold tracking-widest uppercase text-sm mb-2">Total Balance</span>
            <div className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-black mb-1 text-accent-gold">{balance}</div>
            <span className="relative z-10 text-white/90 font-medium mb-8">Eco-Points</span>

            <button 
              onClick={handleRedeem}
              className={`relative z-10 w-full max-w-xs py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                redeemed 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                  : 'bg-white text-primary shadow-lg hover:shadow-xl active:scale-95'
              }`}
            >
              {redeemed ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Redeemed Successfully!
                </>
              ) : (
                <>
                  <Gift className="w-6 h-6" />
                  Redeem Rewards
                </>
              )}
            </button>
          </div>

          {/* Transaction History */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-charcoal dark:text-white">Transaction History</h2>
            </div>

            <div className="flex flex-col gap-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      tx.status === 'Verified' ? 'bg-accent-lime/20 text-primary dark:text-accent-lime' : 'bg-accent-orange/10 text-accent-orange'
                    }`}>
                      {tx.status === 'Verified' ? <ArrowDownLeft className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal dark:text-white text-base">{tx.type}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>{new Date(tx.date).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                        {tx.status === 'Verified' ? (
                          <span className="px-2 py-1 text-xs font-semibold text-primary bg-accent-lime/20 rounded-full">✓ Verified</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold text-accent-orange bg-accent-orange/10 rounded-full">⏳ Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`font-black text-lg ${tx.status === 'Verified' ? 'text-green-600' : 'text-gray-400'}`}>
                    +{tx.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
