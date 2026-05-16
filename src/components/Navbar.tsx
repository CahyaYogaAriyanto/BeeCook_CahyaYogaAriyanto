import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/logo/logo-beecook-color.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors font-semibold text-lg ${
      isActive
        ? 'text-[#E8B431]'
        : 'text-gray-700 hover:text-[#E8B431]'
    }`

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 rounded-lg transition-colors font-semibold text-sm sm:text-base ${
      isActive
        ? 'text-[#E8B431] '
        : 'text-gray-700  hover:text-[#E8B431]'
    }`
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }
  return (
    <header className="sticky top-0 z-50 mb-0 md:mb-8 p-5 bg-white">
      <div className="container-custom h-16 flex items-center justify-between">
        <img src={logo} alt="BeeCook" className="h-8 w-auto md:h-12" />
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <NavLink to="/" className={navClass}>
            Beranda
          </NavLink>
          <NavLink to="/menus" className={navClass}>
            Resep
          </NavLink>
          <NavLink to="/dashboard" className={navClass}>
            Kelola
          </NavLink>
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
          <nav className="container-custom flex flex-col gap-2 pt-4">
            <NavLink to="/" className={mobileNavClass} onClick={handleLinkClick}>
              Beranda
            </NavLink>
            <NavLink to="/menus" className={mobileNavClass} onClick={handleLinkClick}>
              Resep
            </NavLink>
            <NavLink to="/dashboard" className={mobileNavClass} onClick={handleLinkClick}>
              Kelola
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar