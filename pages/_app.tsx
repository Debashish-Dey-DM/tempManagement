import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Dashboard from '../Components/Dashboard'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
        <Dashboard/>
        <Component {...pageProps} />
    </div>)
}

export default MyApp
