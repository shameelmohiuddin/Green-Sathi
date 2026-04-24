import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';

export default function LogAction() {
  const router = useRouter();
  const [actionType, setActionType] = useState('Tree Planting');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [impactInfo, setImpactInfo] = useState(null);

  const actionTypes = [
    "Tree Planting",
    "Composting",
    "Waste Segregation",
    "Solar Pump Usage"
  ];

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!quantity || !date || !photoUrl) {
      setError("Please fill all fields and upload a photo proof.");
      return;
    }

    const qty = parseFloat(quantity);
    let points = 0;
    let co2 = 0;

    if (actionType === "Tree Planting") {
      points = qty * 100;
      co2 = qty * 21;
    } else if (actionType === "Composting") {
      points = qty * 15;
      co2 = qty * 0.5;
    } else if (actionType === "Waste Segregation") {
      points = qty * 10;
      co2 = qty * 0.3;
    } else if (actionType === "Solar Pump Usage") {
      points = qty * 50;
      co2 = qty * 1;
    }

    const actionData = {
      id: Date.now(),
      type: actionType,
      quantity: qty,
      date,
      status: "Pending",
      points: points,
      co2: co2,
      hasProof: true
    };

    const existingActions = JSON.parse(localStorage.getItem('greenSathiActions') || '[]');
    localStorage.setItem('greenSathiActions', JSON.stringify([actionData, ...existingActions]));

    setImpactInfo({ points, co2 });
    setSubmitted(true);
  };

  if (submitted && impactInfo) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 p-4">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-extrabold text-primary mb-4">Action Logged!</h2>
        <div className="bg-secondary/30 p-6 rounded-3xl w-full max-w-sm border border-primary/10 mb-6">
          <p className="text-charcoal font-bold text-lg mb-2">Amazing!</p>
          <p className="text-charcoal font-medium">
            You earned <span className="text-primary font-black text-xl">{impactInfo.points}</span> Eco-Points and helped reduce <span className="text-green-600 font-black text-xl">{impactInfo.co2.toFixed(1)}kg</span> of Carbon Emissions!
          </p>
        </div>
        <p className="text-gray-500 font-medium text-sm mb-8">Your submission is pending verification.</p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-lg"
        >
          OK
        </button>
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
              <div className="relative w-full h-full min-h-[160px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 overflow-hidden transition-all border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-primary/50 hover:text-primary cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {photoUrl ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white p-4">
                      <CheckCircle2 className="w-10 h-10 mb-2 shadow-sm" />
                      <span className="font-bold text-center text-sm shadow-sm">Photo Selected</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Camera className="w-10 h-10" />
                    <span className="font-bold text-center">Tap to upload photo</span>
                    <span className="text-sm text-center px-4">JPG, PNG up to 5MB</span>
                  </>
                )}
              </div>
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
