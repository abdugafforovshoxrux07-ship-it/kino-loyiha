import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

/**
 * Shared shell for every page: sticky navbar, page content via <Outlet />,
 * and the footer. Keeps the min-height so short pages still push the
 * footer to the bottom.
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light text-slate-900 dark:bg-surface-dark dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
