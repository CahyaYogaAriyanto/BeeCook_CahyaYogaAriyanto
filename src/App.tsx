import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer.tsx'
import { Toaster } from 'react-hot-toast'
import MenuDetailPage from './components/MenuDetail.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import MenuPage from './pages/MenuPage.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden w-full">
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menus" element={<MenuPage />} />
          <Route path="/menus/:slug" element={<MenuDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App