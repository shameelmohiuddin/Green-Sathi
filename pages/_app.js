import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { LanguageProvider } from '../context/LanguageContext'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // 1. Handle Dark Mode Initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // 2. Seed Mock User DB
    if (!localStorage.getItem('greenSathiUsersDB')) {
      const initialUsers = [
        { fullName: "Anvita KP", mobileNumber: "9999900001", village: "Surathkal", districtPin: "Mangalore, 575014", idType: "Aadhaar", idNumber: "xxxx-xxxx-1234", role: "user" },
        { fullName: "Anusha J", mobileNumber: "9999900002", village: "Manipal", districtPin: "Udupi, 576104", idType: "Voter ID", idNumber: "ABC1234567", role: "user" },
        { fullName: "Amrutha AM", mobileNumber: "9999900003", village: "Kadri", districtPin: "Mangalore, 575002", idType: "Ration Card", idNumber: "RC-0987654321", role: "user" },
        { fullName: "Kavyashree AJ", mobileNumber: "9999900004", village: "Kaup", districtPin: "Udupi, 574106", idType: "Aadhaar", idNumber: "xxxx-xxxx-5678", role: "user" },
        { fullName: "Renita Pinto", mobileNumber: "9999900005", village: "Kinnigoli", districtPin: "Mangalore, 574150", idType: "Voter ID", idNumber: "XYZ9876543", role: "user" },
        { fullName: "Pooja Reddy", mobileNumber: "9999900006", village: "Malpe", districtPin: "Udupi, 576108", idType: "Aadhaar", idNumber: "xxxx-xxxx-9999", role: "verifier" }
      ];
      localStorage.setItem('greenSathiUsersDB', JSON.stringify(initialUsers));
    }
  }, []);
  const isNoLayoutPage = router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register'

  if (isNoLayoutPage) {
    return (
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  )
}
