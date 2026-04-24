import { Home, PlusCircle, Wallet, BookOpen, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [role, setRole] = useState('user');

  useEffect(() => {
    // Only access localStorage on client side
    const storedRole = localStorage.getItem('greenSathiRole') || 'user';
    setRole(storedRole);
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
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm fixed h-full z-20">
        <div className="p-6 flex items-center justify-center border-b border-gray-100">
          <div className="w-12 h-12 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center overflow-hidden mr-3">
             <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-extrabold text-primary">Green Sathi</span>
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
        <div className="relative z-10 p-4 md:p-8 max-w-5xl mx-auto h-full flex flex-col">
          
          {/* Mobile Demo Switcher */}
          <div className="md:hidden flex justify-end mb-4">
            <button onClick={handleDemoSwitch} className="px-4 py-2 rounded-full bg-charcoal text-white font-bold text-xs shadow-md">
              Demo: Switch Role
            </button>
          </div>

          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 px-6 py-3 pb-safe">
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
  );
}
