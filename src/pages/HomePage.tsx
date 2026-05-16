import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import { categoryService } from '../service/category_service'
import LineLogo from '../assets/line-doodle.png';
import CheifPeople from '../assets/people-chef-subscribe.png';
import toast from 'react-hot-toast';


const HomePage = () => {
  const [categories, setCategories] = useState<any[]>([])
  const [email, setEmail] = useState('')

  const fetchData = async () => {
    const categoryRes = await categoryService.getAll()
    setCategories(categoryRes.data.categories || [])
  }
  const handleBerlangganan = ()=> {
    if (!email){
      toast.error('Email wajib di isi !')
      return;
    }
    toast.success(`Selamat ${email} berhasil berlangganan`)
    setEmail('')
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="overflow-x-hidden w-full">
      <Hero />
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
          Eksplor berdasarkan
          <span className="relative inline-block text-[#E8B431] ml-2">
            Kategori
            <img
              src={LineLogo}
              alt=""
              className="absolute -bottom-4 left-0 w-full"
            />
          </span>
        </h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible">
            {categories.map((category: any) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Dapatan menu menarik
                <br />
                setiap hari
              </h2>
              <p className="text-gray-500 leading-8 mb-8 max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4"> 
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-5 rounded-xl border border-gray-200 bg-white w-full focus:outline-none focus:border-[#E8B431]"
                />
                <button onClick={handleBerlangganan}
                  className="bg-[#111827] hover:bg-[#1f2937] text-white px-8 rounded-xl font-semibold h-14 whitespace-nowrap"
                >
                  Langganan
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-[320px] h-125 bg-[#efc969] rounded-t-[180px] rounded-b-[180px] overflow-hidden shadow-xl"
              >
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-55 h-30 bg-white/40 blur-3xl"
                />
                <img
                  src={CheifPeople}
                  alt="Chef"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default HomePage;
