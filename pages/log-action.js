import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';

export default function LogAction() {
  const router = useRouter();
  const [actionType, setActionType] = useState('Tree Planting');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const actionTypes = [
    "Tree Planting",
    "Composting",
    "Waste Segregation",
    "Solar Pump Usage"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!quantity || !date || !photoUploaded) {
      setError("Please fill all fields and upload a photo proof.");
      return;
    }

    const actionData = {
      id: Date.now(),
      type: actionType,
      quantity,
      date,
      status: "Pending",
      points: 0 // Points assigned after verification
    };

    const existingActions = JSON.parse(localStorage.getItem('greenSathiActions') || '[]');
    localStorage.setItem('greenSathiActions', JSON.stringify([actionData, ...existingActions]));

    setSubmitted(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-extrabold text-primary mb-2">Action Logged!</h2>
        <p className="text-charcoal font-medium">Your submission is pending verification.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Log Action | Green Sathi</title>
      </Head>

      <div className="flex flex-col gap-6 w-full max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">Log Eco-Action</h1>
          <p className="text-charcoal font-medium">Submit your green activities to earn credits.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-primary">Action Type</label>
            <div className="relative">
              <select 
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none font-medium text-charcoal shadow-sm"
              >
                {actionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-primary">Quantity / Metric (e.g., number of trees)</label>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full px-4 py-4 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-primary">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none font-medium text-charcoal shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-primary">Upload Photo Proof</label>
              <button 
                type="button"
                onClick={() => setPhotoUploaded(true)}
                className={`w-full py-10 h-full min-h-[160px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 transition-all ${
                  photoUploaded 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-primary/50 hover:text-primary'
                }`}
              >
                {photoUploaded ? (
                  <>
                    <CheckCircle2 className="w-10 h-10" />
                    <span className="font-bold">Photo Uploaded Successfully</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-10 h-10" />
                    <span className="font-bold">Tap to upload photo</span>
                    <span className="text-sm">JPG, PNG up to 5MB</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex flex-col justify-end gap-3">
              {error && <p className="text-red-500 font-semibold text-sm animate-in fade-in">{error}</p>}
              <button 
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg"
              >
                Submit Action
              </button>
            </div>
          </div>

        </form>
      </div>
    </>
  );
}
