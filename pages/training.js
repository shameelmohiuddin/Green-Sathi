import Head from 'next/head';
import { PlayCircle, FileText, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Training() {
  const [toast, setToast] = useState('');
  const resources = [
    {
      title: "How to Segregate Waste properly",
      type: "Video",
      duration: "5",
      icon: PlayCircle,
      color: "bg-accent-lime/20 text-primary dark:text-accent-lime",
      url: "https://www.youtube.com/watch?v=7SCBdcXg2fs"
    },
    {
      title: "Benefits of Composting at Home",
      type: "Article",
      duration: "3 min read",
      icon: FileText,
      color: "bg-accent-lime/20 text-primary dark:text-accent-lime",
      url: "https://www.youtube.com/watch?v=xhu7Gu2G3nE"
    },
    {
      title: "Using Solar Pumps for Agriculture",
      type: "Video",
      duration: "10",
      icon: PlayCircle,
      color: "bg-accent-lime/20 text-primary dark:text-accent-lime",
      url: "https://www.youtube.com/watch?v=kNRTEKzaxrs"
    }
  ];

  return (
    <>
      <Head>
        <title>Training | Green Sathi</title>
      </Head>

      <div className="flex flex-col gap-6 w-full max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
        
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

        <div>
          <h1 className="text-3xl font-extrabold text-primary dark:text-white mb-2">Training & Resources</h1>
          <p className="text-charcoal dark:text-gray-300 font-medium">Learn more about sustainability and improve your green impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {resources.map((resource, idx) => (
            <div 
              key={idx} 
              onClick={() => { window.open(resource.url, '_blank', 'noopener,noreferrer'); }}
              className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 border-t-4 border-t-accent-lime shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${resource.color}`}>
                  <resource.icon className="w-7 h-7" />
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-primary shrink-0 ml-2" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-charcoal dark:text-white text-lg leading-tight mb-2 group-hover:text-primary dark:group-hover:text-accent-lime transition-colors">
                  {resource.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{resource.type}</span>
                  <span>•</span>
                  <span>{resource.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Banner */}
        <div className="mt-4 bg-secondary/30 dark:bg-gray-800 rounded-3xl p-6 text-center border-2 border-primary/10 dark:border-gray-700 border-dashed">
          <h3 className="text-lg font-bold text-primary dark:text-white mb-2">Need help?</h3>
          <p className="text-charcoal dark:text-gray-300 font-medium text-sm mb-4">Join our community workshops held every weekend.</p>
          <button 
            onClick={() => { setToast("Workshop schedule coming soon!"); setTimeout(() => setToast(''), 3000); }}
            className="px-6 py-3 bg-white dark:bg-gray-700 text-primary dark:text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            Find Workshops
          </button>
        </div>

      </div>
    </>
  );
}
