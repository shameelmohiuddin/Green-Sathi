import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Home, PlusCircle, Wallet, BookOpen, LogOut, Info, X } from 'lucide-react';
import Link from 'next/link';

export default function Layout({ children }) {
  const router = useRouter();
  const [role, setRole] = useState('user');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Only access localStorage on client side
    const storedRole = localStorage.getItem('greenSathiRole');
    if (!storedRole) {
      router.push('/');
    } else {
      setRole(storedRole);
    }
    
    // Load profile for modal
    const profile = JSON.parse(localStorage.getItem('greenSathiUserProfile'));
    if (profile) setUserProfile(profile);
  }, []);

  const userNavItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Log Action', href: '/log-action', icon: PlusCircle },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Training', href: '/training', icon: BookOpen },
  ];

  const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Training', href: '/training', icon: BookOpen },
  ];

  const navItems = role === 'verifier' ? adminNavItems : userNavItems;

  const handleLogout = () => {
    localStorage.removeItem('greenSathiRole');
    router.push('/');
  };

  const handleDemoSwitch = () => {
    const newRole = role === 'user' ? 'verifier' : 'user';
    localStorage.setItem('greenSathiRole', newRole);
    window.location.href = newRole === 'user' ? '/dashboard' : '/admin'; // Force reload to update UI
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <h2 className="font-bold text-lg flex items-center gap-2"><Info className="w-5 h-5"/> Profile Details</h2>
              <button onClick={() => setShowProfileModal(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {userProfile ? (
                <>
                  <div><span className="text-sm text-gray-500 font-bold uppercase">Full Name</span><p className="font-semibold text-charcoal text-lg">{userProfile.fullName}</p></div>
                  <div><span className="text-sm text-gray-500 font-bold uppercase">Mobile Number</span><p className="font-semibold text-charcoal text-lg">+91 {userProfile.mobileNumber}</p></div>
                  <div><span className="text-sm text-gray-500 font-bold uppercase">Village / Gram</span><p className="font-semibold text-charcoal text-lg">{userProfile.village}</p></div>
                  <div><span className="text-sm text-gray-500 font-bold uppercase">District & PIN</span><p className="font-semibold text-charcoal text-lg">{userProfile.districtPin}</p></div>
                  <div><span className="text-sm text-gray-500 font-bold uppercase">ID ({userProfile.idType})</span><p className="font-semibold text-charcoal text-lg">{userProfile.idNumber}</p></div>
                </>
              ) : (
                <p className="text-gray-500 text-center font-medium">No registration profile found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm fixed h-full z-50">
        <div 
          className="p-6 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setShowProfileModal(true)}
        >
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full border border-gray-200 shadow-sm" />
          <span className="text-xl font-extrabold text-primary tracking-tight">Green Sathi</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-md font-bold' : 'text-gray-500 hover:bg-secondary/30 hover:text-primary font-semibold'}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <button onClick={handleDemoSwitch} className="flex items-center justify-center px-4 py-3 w-full rounded-xl bg-charcoal text-white font-bold text-sm shadow-md hover:bg-black transition-all">
            Demo: Switch to {role === 'user' ? 'Verifier' : 'User'}
          </button>
          <button onClick={handleLogout} className="flex items-center px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 font-semibold transition-all">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0 relative min-h-screen">
        {/* Soft geometric background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[80px] opacity-30 translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none"></div>
        <div className="relative z-10 p-4 pt-20 md:pt-8 md:p-8 max-w-5xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Mobile Navigation & Headers */}
      <div className="md:hidden">
        {/* Mobile Top Header */}
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center z-40">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowProfileModal(true)}
          >
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" />
            <span className="font-extrabold text-primary tracking-tight text-lg">Green Sathi</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleDemoSwitch} className="px-3 py-1.5 rounded-full bg-charcoal text-white font-bold text-xs shadow-md">
              Switch
            </button>
            <button onClick={handleLogout} className="px-3 py-1.5 rounded-full bg-red-100 text-red-600 font-bold text-xs shadow-sm flex items-center gap-1">
              <LogOut className="w-3 h-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 px-6 py-3 pb-safe">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-secondary/50 text-primary' : 'text-gray-400'}`}>
                      <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                    </div>
                    <span className={`text-[10px] mt-1 ${isActive ? 'font-bold text-primary' : 'font-medium text-gray-400'}`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

    </div>
  );
}
