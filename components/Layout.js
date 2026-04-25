import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Home, PlusCircle, Wallet, BookOpen, LogOut, Info, X, Menu, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Layout({ children }) {
  const router = useRouter();
  const [role, setRole] = useState('user');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Only access localStorage on client side
    const storedRole = localStorage.getItem('greenSathiRole');
    if (!storedRole) {
      router.push('/');
      return;
    }
    
    setRole(storedRole);

    // Route protection: Enforce role-based access
    if (storedRole === 'verifier' && router.pathname !== '/admin' && router.pathname !== '/training') {
      router.push('/admin');
    } else if (storedRole === 'user' && router.pathname === '/admin') {
      router.push('/dashboard');
    }
    
    // Load profile for modal
    const profile = JSON.parse(localStorage.getItem('greenSathiUserProfile'));
    if (profile) setUserProfile(profile);

    // Initial theme check
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const userNavItems = [
    { name: t('navHome'), href: '/dashboard', icon: Home },
    { name: t('navLog'), href: '/log-action', icon: PlusCircle },
    { name: t('navWallet'), href: '/wallet', icon: Wallet },
    { name: t('navTraining'), href: '/training', icon: BookOpen },
  ];

  const adminNavItems = [
    { name: t('navDashboard'), href: '/admin', icon: Home },
    { name: t('navTraining'), href: '/training', icon: BookOpen },
  ];

  const navItems = role === 'verifier' ? adminNavItems : userNavItems;

  const handleLogout = () => {
    localStorage.removeItem('greenSathiRole');
    router.push('/');
  };

  const handleDemoSwitch = () => {
    const newRole = role === 'user' ? 'verifier' : 'user';
    localStorage.setItem('greenSathiRole', newRole);
    
    // Automatically switch the active profile to match the new role
    const usersDB = JSON.parse(localStorage.getItem('greenSathiUsersDB') || '[]');
    const newProfile = usersDB.find(u => u.role === newRole);
    if (newProfile) {
      localStorage.setItem('greenSathiUserProfile', JSON.stringify(newProfile));
    }
    
    window.location.href = newRole === 'user' ? '/dashboard' : '/admin'; // Force reload to update UI
  };

  return (
    <div className="flex min-h-screen bg-background dark:bg-charcoal font-sans transition-colors duration-300 overflow-x-hidden w-full">
      
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <h2 className="font-bold text-lg flex items-center gap-2"><Info className="w-5 h-5"/> {t('profileDetails')}</h2>
              <button onClick={() => setShowProfileModal(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {userProfile ? (
                <>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">{t('fullName')}</span><p className="font-semibold text-charcoal dark:text-white text-lg">{userProfile.fullName}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">Mobile Number</span><p className="font-semibold text-charcoal dark:text-white text-lg">+91 {userProfile.mobileNumber}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">{t('village')}</span><p className="font-semibold text-charcoal dark:text-white text-lg">{userProfile.village}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">{t('district')}</span><p className="font-semibold text-charcoal dark:text-white text-lg">{userProfile.districtPin}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase">{t('idType')} ({userProfile.idType})</span><p className="font-semibold text-charcoal dark:text-white text-lg">{userProfile.idNumber}</p></div>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center font-medium">No registration profile found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm fixed h-full z-50 transition-colors duration-300">
        <div 
          className="p-6 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setShowProfileModal(true)}
        >
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full border border-gray-200 shadow-sm" />
          <span className="text-xl font-extrabold text-primary dark:text-white tracking-tight">Green Sathi</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-md font-bold' : 'text-gray-500 dark:text-gray-400 hover:bg-secondary/30 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white font-semibold'}`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
          <button onClick={toggleDarkMode} className="flex items-center justify-between px-4 py-3 w-full rounded-xl bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
            <span className="flex items-center"><Moon className="w-4 h-4 mr-2 hidden dark:block"/><Sun className="w-4 h-4 mr-2 dark:hidden"/> {t('theme')}</span>
            <span className="text-xs opacity-60 uppercase">{isDarkMode ? t('dark') : t('light')}</span>
          </button>
          <button onClick={handleDemoSwitch} className="flex items-center justify-center px-4 py-3 w-full rounded-xl bg-charcoal dark:bg-gray-700 text-white font-bold text-sm shadow-md hover:bg-black dark:hover:bg-gray-600 transition-all">
            {t('demoSwitch')} {role === 'user' ? 'Verifier' : 'User'}
          </button>
          <button onClick={handleLogout} className="flex items-center px-4 py-3 w-full rounded-xl text-accent-orange hover:bg-accent-orange/10 font-semibold transition-all">
            <LogOut className="w-5 h-5 mr-3" />
            {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0 relative min-h-screen">
        {/* Soft geometric background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full filter blur-[80px] opacity-30 translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none dark:hidden"></div>
        <div className="relative z-10 p-4 pt-20 md:pt-8 md:p-8 max-w-5xl mx-auto h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Mobile Navigation & Headers */}
      <div className="md:hidden">
        {/* Mobile Top Header */}
        <div className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 flex justify-between items-center z-50 transition-colors duration-300">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowProfileModal(true)}
          >
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm" />
            <span className="font-extrabold text-primary dark:text-white tracking-tight text-lg">Green Sathi</span>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-white shadow-sm">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full bg-primary text-white shadow-sm">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Hamburger Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-[73px] left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-2xl z-40 animate-in slide-in-from-top-2 p-4 flex flex-col gap-2 transition-colors duration-300">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className={`flex items-center px-4 py-4 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-md font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold'}`}>
                    <item.icon className="w-6 h-6 mr-4" />
                    <span className="text-lg">{item.name}</span>
                  </div>
                </Link>
              )
            })}
            <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
            <button onClick={handleDemoSwitch} className="flex items-center justify-center px-4 py-4 w-full rounded-xl bg-charcoal dark:bg-gray-700 text-white font-bold text-base shadow-md">
              Switch Role to {role === 'user' ? 'Verifier' : 'User'}
            </button>
            <button onClick={handleLogout} className="flex items-center justify-center px-4 py-4 w-full rounded-xl bg-accent-orange/10 text-accent-orange font-bold text-base shadow-sm">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
