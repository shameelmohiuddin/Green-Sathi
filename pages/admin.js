import Head from 'next/head';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Search, Clock, ArrowRight, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function AdminDashboard() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState('Pending');
  const { t } = useLanguage();

  useEffect(() => {
    // Load local storage actions
    const localActions = JSON.parse(localStorage.getItem('greenSathiActions') || '[]');
    setActions(localActions);
  }, []);

  const handleVerify = (id, actionType) => {
    // Logic to assign points based on action type
    const pointsMap = {
      "Tree Planting": 100,
      "Composting": 50,
      "Waste Segregation": 30,
      "Solar Pump Usage": 150
    };

    const assignedPoints = pointsMap[actionType] || 10;

    const updatedActions = actions.map(action => 
      action.id === id ? { ...action, status: 'Verified', points: assignedPoints } : action
    );
    setActions(updatedActions);
    localStorage.setItem('greenSathiActions', JSON.stringify(updatedActions));
  };

  const handleReject = (id) => {
    const updatedActions = actions.map(action => 
      action.id === id ? { ...action, status: 'Rejected', points: 0 } : action
    );
    setActions(updatedActions);
    localStorage.setItem('greenSathiActions', JSON.stringify(updatedActions));
  };

  const filteredActions = actions.filter(action => action.status === filter);

  return (
    <>
      <Head>
        <title>Admin Dashboard | Green Sathi</title>
      </Head>

      <div className="flex flex-col gap-8 w-full max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300">
          <div>
            <h1 className="text-3xl font-extrabold text-primary dark:text-white mb-2">{t('verifierDashboard')}</h1>
            <p className="text-charcoal dark:text-gray-300 font-medium text-lg">{t('reviewApprove')}</p>
          </div>
          
          <div className="flex bg-secondary/30 dark:bg-gray-800 p-1 rounded-xl w-fit">
            <button
              onClick={() => setFilter('Pending')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                filter === 'Pending' 
                  ? 'bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm' 
                  : 'text-primary/70 dark:text-gray-400 hover:text-primary dark:hover:text-white'
              }`}
            >
              {t('pending')}
            </button>
            <button
              onClick={() => setFilter('Verified')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                filter === 'Verified' 
                  ? 'bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm' 
                  : 'text-primary/70 dark:text-gray-400 hover:text-primary dark:hover:text-white'
              }`}
            >
              {t('verified')}
            </button>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div>
              <span className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">{t('totalActions')}</span>
              <div className="text-4xl font-black text-primary dark:text-white mt-1">{actions.length}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-yellow-100 dark:border-gray-700 flex items-center justify-between">
            <div>
              <span className="text-yellow-600 dark:text-yellow-500 font-bold text-sm uppercase tracking-wider">Pending</span>
              <div className="text-4xl font-black text-yellow-500 mt-1">
                {actions.filter(a => a.status === 'Pending').length}
              </div>
            </div>
            <Clock className="w-10 h-10 text-yellow-200 dark:text-yellow-500/30" />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-green-100 dark:border-gray-700 flex items-center justify-between">
            <div>
              <span className="text-green-600 dark:text-accent-lime font-bold text-sm uppercase tracking-wider">{t('verified')}</span>
              <div className="text-4xl font-black text-green-500 dark:text-accent-lime mt-1">
                {actions.filter(a => a.status === 'Verified').length}
              </div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-200 dark:text-accent-lime/30" />
          </div>
        </div>

        {/* Action List */}
        <div className="flex flex-col gap-4">
          {filteredActions.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl text-center border border-dashed border-gray-200 dark:border-gray-700">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 dark:text-gray-300">{t('noActions')}</h3>
              {filter === 'Pending' && (
                <p className="text-gray-500 dark:text-gray-400 mt-2">{t('caughtUp')}</p>
              )}
            </div>
          ) : (
            filteredActions.map((action) => (
              <div key={action.id} className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 bg-secondary/50 dark:bg-gray-700 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20 dark:border-gray-600 overflow-hidden">
                    {action.hasProof ? (
                      <ImageIcon className="w-8 h-8 text-primary/60 dark:text-gray-300" />
                    ) : (
                      <span className="text-xs font-bold text-primary dark:text-gray-300 opacity-50">NO IMG</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal dark:text-white text-lg mb-1">{t(action.type) || action.type}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <span>{new Date(action.date).toLocaleDateString()}</span>
                      <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full hidden sm:block"></span>
                      <span>{t('qty')}: <span className="font-bold text-charcoal dark:text-gray-300">{action.quantity}</span></span>
                      {action.points > 0 && (
                        <>
                          <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full hidden sm:block"></span>
                          <span className="text-green-600 dark:text-accent-lime font-bold">+{action.points} pts</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {filter === 'Pending' ? (
                  <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button 
                      onClick={() => handleReject(action.id)}
                      className="flex-1 md:flex-none px-6 py-3 border border-red-200 dark:border-red-900 text-red-500 dark:text-red-400 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5 dark:text-red-300" />
                      {t('reject')}
                    </button>
                    <button 
                      onClick={() => handleVerify(action.id, action.type)}
                      className="flex-1 md:flex-none px-6 py-3 bg-primary dark:bg-accent-lime text-white dark:text-charcoal font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 dark:text-charcoal" />
                      {t('verify')}
                    </button>
                  </div>
                ) : (
                  <div className={`px-4 py-2 rounded-xl font-bold text-sm ${action.status === 'Verified' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-accent-lime' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                    {t(action.status.toLowerCase()) || action.status}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}
