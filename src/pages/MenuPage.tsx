import { useEffect, useRef, useState } from 'react'
import MenuCard from '../components/MenuCard'
import { menuService } from '../service/menu_service'
import HeroFood from '../assets/pexels-undo-kim-2153633398-34683317 1.png'
import { categoryService } from '../service/category_service'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'


const MenuPage = () => {
  const [menus, setMenus] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const menuSectionRef = useRef<HTMLDivElement>(null)
  const totalPages = 10;
  const fetchMenus = async () => {
    try{
      setLoading(true)
      const response = await menuService.getAll({
        page: currentPage,
        limit: 9,
        category_id: activeCategory || undefined,
      })
      setMenus(response.data.menus || [])
    }catch{
      toast.error('Gagal load data')
    }finally{
      setLoading(false)
    }
  }
  const fetchCategories = async () => {
    const response = await categoryService.getAll()
    setCategories(response.data.categories || [])
  }
  const generatePages = (currentPage: number, totalPages: number) => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages)
    } else {
      for (let i = 1; i <= currentPage; i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 1) {
        pages.push('...')
      }
      if (currentPage !== totalPages) {
        pages.push(totalPages)
      }
    }
    return [...new Set(pages)]
  }
  const pages = generatePages(currentPage, totalPages)
  useEffect(() => {
    fetchMenus()
  }, [ activeCategory,currentPage])
  useEffect(() => {
    fetchCategories()
  }, [])
  useEffect(() => {
    if (menuSectionRef.current) {
      window.scrollTo({
        top: menuSectionRef.current.offsetTop - 200,
        behavior: 'smooth',
      })
    }
  }, [currentPage])
  return (
    <div className="container-custom py-8 lg:py-10">
      <div className="relative h-55 lg:h-75 rounded-[28px] overflow-hidden mb-8">
        <img
          src={HeroFood}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
          <p className="text-[#E8B431] text-sm lg:text-base font-medium mb-2">
            Sedang Trending
          </p>

          <h1 className="text-white text-3xl lg:text-5xl font-bold max-w-xl leading-tight">
            Nasi Goreng Udang Mentega
          </h1>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 mb-10">
        <button
          onClick={() => {setActiveCategory(null);setCurrentPage(1)}} 
          className={`min-w-fit w-53 px-6 h-16 rounded-xl text-sm font-bold transition-all ${
            activeCategory === null
              ? 'bg-[#E8B431] text-white'
              : 'bg-[#111827] text-white'
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category.id} 
            onClick={() => {setActiveCategory(category.id); setCurrentPage(1)} }
            className={`min-w-fit w-53 px-6 h-16 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === category.id
                ? 'bg-[#E8B431] text-white'
                : 'bg-[#111827] text-white'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>  
      {loading ? <Loading/> :
      menus.length===0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-cente'>
          <p className="text-gray-500 max-w-md leading-relaxed">
            Belum ada resep pada kategori ini. 
          </p>
        </div>
      ):(
        <div ref={menuSectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
        {menus.map((menu: any) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
      )}
      
      <div className="flex items-center gap-1 mt-10 justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`text-black ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt;&lt; Previous 
        </button>
        {pages.map((page, index) => (
          <button
            key={index}
            disabled={page === '...'}
            onClick={() =>
              typeof page === 'number' && setCurrentPage(page)
            }
            className={`
              w-10 h-10 rounded-full text-sm font-medium transition-all border-none
              ${
                currentPage === page
                  ? 'bg-[#E5E7EB]'
                  : 'bg-white text-gray-700 border'
              }
              ${page === '...' ? 'cursor-default border-none bg-transparent' : ''}
            `}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === 10}
          className={`text-black ${
            currentPage === 10 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next &gt;&gt;
        </button>
      </div>
    </div>
  )
}

export default MenuPage