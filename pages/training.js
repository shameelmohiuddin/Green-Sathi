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
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Benefits of Composting at Home",
      type: "Article",
      duration: "3 min read",
      icon: FileText,
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Using Solar Pumps for Agriculture",
      type: "Video",
      duration: "10",
      icon: PlayCircle,
      color: "bg-green-50 text-green-600"
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
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-charcoal text-white px-6 py-3 rounded-full font-bold shadow-xl animate-in slide-in-from-top-4 fade-in duration-300">
            {toast}
          </div>
        )}

        <div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">Training & Resources</h1>
          <p className="text-charcoal font-medium">Learn more about sustainability and improve your green impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {resources.map((resource, idx) => (
            <div 
              key={idx} 
              onClick={() => { setToast("Content coming soon!"); setTimeout(() => setToast(''), 3000); }}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${resource.color}`}>
                  <resource.icon className="w-7 h-7" />
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-primary shrink-0 ml-2" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-charcoal text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <span className="bg-gray-100 px-2 py-1 rounded-md">{resource.type}</span>
                  <span>•</span>
                  <span>{resource.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Banner */}
        <div className="mt-4 bg-secondary/30 rounded-3xl p-6 text-center border-2 border-primary/10 border-dashed">
          <h3 className="text-lg font-bold text-primary mb-2">Need help?</h3>
          <p className="text-charcoal font-medium text-sm mb-4">Join our community workshops held every weekend.</p>
          <button 
            onClick={() => { setToast("Workshop schedule coming soon!"); setTimeout(() => setToast(''), 3000); }}
            className="px-6 py-3 bg-white text-primary font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            Find Workshops
          </button>
        </div>

      </div>
    </>
  );
}
