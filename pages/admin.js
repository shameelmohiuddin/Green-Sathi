import Head from 'next/head';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Search, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState('Pending');

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
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary mb-2">Verifier Dashboard</h1>
            <p className="text-charcoal font-medium text-lg">Review and approve user-submitted green actions.</p>
          </div>
          
          <div className="flex bg-secondary/30 p-1 rounded-xl w-fit">
            <button
              onClick={() => setFilter('Pending')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                filter === 'Pending' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('Verified')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                filter === 'Verified' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              Verified
            </button>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Actions</span>
              <div className="text-4xl font-black text-primary mt-1">{actions.length}</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-yellow-100 flex items-center justify-between">
            <div>
              <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider">Pending</span>
              <div className="text-4xl font-black text-yellow-500 mt-1">
                {actions.filter(a => a.status === 'Pending').length}
              </div>
            </div>
            <Clock className="w-10 h-10 text-yellow-200" />
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-100 flex items-center justify-between">
            <div>
              <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Verified</span>
              <div className="text-4xl font-black text-green-500 mt-1">
                {actions.filter(a => a.status === 'Verified').length}
              </div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-200" />
          </div>
        </div>

        {/* Action List */}
        <div className="flex flex-col gap-4">
          {filteredActions.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl text-center border border-dashed border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400">No {filter.toLowerCase()} actions found.</h3>
              {filter === 'Pending' && (
                <p className="text-gray-500 mt-2">All caught up! Wait for users to submit new actions.</p>
              )}
            </div>
          ) : (
            filteredActions.map((action) => (
              <div key={action.id} className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 bg-secondary/30 rounded-2xl flex items-center justify-center shrink-0 border border-primary/10">
                    {/* Mock Photo Thumbnail */}
                    <span className="text-xs font-bold text-primary opacity-50">PHOTO</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg mb-1">{action.type}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <span>{new Date(action.date).toLocaleDateString()}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Qty: <span className="font-bold text-charcoal">{action.quantity}</span></span>
                      {action.points > 0 && (
                        <>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-green-600 font-bold">+{action.points} pts</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {filter === 'Pending' ? (
                  <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button 
                      onClick={() => handleReject(action.id)}
                      className="flex-1 md:flex-none px-6 py-3 border border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                    <button 
                      onClick={() => handleVerify(action.id, action.type)}
                      className="flex-1 md:flex-none px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Verify
                    </button>
                  </div>
                ) : (
                  <div className={`px-4 py-2 rounded-xl font-bold text-sm ${action.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {action.status}
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
