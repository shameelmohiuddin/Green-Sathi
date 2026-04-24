import '../styles/globals.css'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isNoLayoutPage = router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register'

  if (isNoLayoutPage) {
    return <Component {...pageProps} />
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
