import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { menuService } from '../service/menu_service';
import NasiGoreng from '../assets/nasi-goreng-with-satay 1.png';
import CategoryLogo from '../assets/category.svg';
import DurationLogo from '../assets/duration.svg';

const MenuDetailPage = () => {
  const { slug } = useParams()
  const [menu, setMenu] = useState<any>(null)
  const fetchMenu = async () => {
    const response = await menuService.getBySlug(slug as string)
    setMenu(response.data.menu || [])
    console.log(response)
  }
  useEffect(() => {
    fetchMenu()
  }, [slug])
  if (!menu) return null
  return (
    <div className="container-custom py-10">
      <div className="relative rounded-3xl overflow-hidden h-100">
        <img
          src={NasiGoreng}
          alt={menu.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end p-10">
          <div>
            <h1 className="text-5xl font-black text-white max-w-2xl">
              {menu.name}
            </h1>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-10 mt-10'>
      <div className='flex items-center gap-3'>
        <img src={CategoryLogo} alt="" className='h-14 w-auto'/>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-500'>
            Category
          </span>
          <span className='font-semibold text-[#111827]'>
            {menu.category.name}
          </span>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <img src={DurationLogo} alt="" className='h-10 w-auto'/>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-500'>
            Durasi
          </span>
          <span className='font-semibold text-[#111827]'>
            {menu.cooking_duration} menit
          </span>
        </div>
      </div>
    </div>
      <div className="grid md:grid-cols-4 gap-5 mt-10">
        <div className="border-3 border-amber-300 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold">
            {menu.nutrition?.calory} kcal
          </p>
          <p>Kalori</p>
        </div>
        <div className="border-3 border-amber-300 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold">
            {menu.nutrition?.protein}g
          </p>
          <p>Protein</p>
        </div>

        <div className="border-3 border-amber-300 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold">
            {menu.nutrition?.fat}g
          </p>
          <p>Lemak</p>
        </div>
        <div className="border-3 border-amber-300 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold">
            {menu.nutrition?.carbohydrate}g
          </p>
          <p>Karbohidrat</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 mt-14">
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Bahan-bahan
          </h2>
          <ul className="space-y-4">
            {menu.ingredients?.map((item: any, index: number) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Cara Masak
          </h2>
          <div className="space-y-6">
            {menu.recipes?.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="min-w-10 w-10 h-10 rounded-full bg-[#E8B431] text-black flex items-center justify-center text-lg font-bold shrink-0">
                  {index + 1}
                </div>
                <p className="flex-1 text-gray-700 leading-relaxed pt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuDetailPage