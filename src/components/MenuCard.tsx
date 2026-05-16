import type { Menu } from '../types/menu'
import { Link } from 'react-router-dom'
import { Clock3 } from 'lucide-react'
import NasiGoreng from '../assets/nasi-goreng-with-satay 1.png'

interface Props {
  menu: Menu
}
const MenuCard = ({ menu }: Props) => {
  return (
    <Link
      to={`/menus/${menu.slug}`}
      className="bg-white rounded-2xl h-108 md:h-108 overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <img
        src={NasiGoreng}
        alt={menu.name}
        className="w-full h-72 object-cover rounded-3xl"
      />
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {menu.category?.name}
          </span>
          <div className="flex items-center gap-1">
            <Clock3 size={14} />
            {menu.cooking_duration} min
          </div>
        </div>
        <h3 className="font-bold text-lg line-clamp-2">
          {menu.name}
        </h3>
      </div>
    </Link>
  )
}
export default MenuCard