import StarLogo from '../assets/stars.png'
import HeroImage from '../assets/hero-image.png'
import People1 from '../assets/avatar/people1.png'
import People2 from '../assets/avatar/people2.png'
import People3 from '../assets/avatar/people3.png'

const Hero = () => {
  return (
    <section className="relative overflow-hidden w-full">
      <div className="container-custom min-h-[85vh] max-h-[90vh] flex items-center relative z-10">
        <div className="w-full lg:w-[42%] pt-10 lg:pt-0">     
          <h1 className="text-[50px] sm:text-[60px] lg:text-[82px] font-black leading-[0.9] tracking-[-2px]">
            <div className='flex flex-row gap-3'>
              <span className="block text-black">
                Where
              </span>
              <br />
              <span className="relative inline-block text-[#E4B12F]">
                Quality
                <img src={StarLogo} alt="" className="absolute -top-4 -right-8.5 lg:-top-5 lg:-right-11.25 w-10 lg:w-14"/>
              </span>
            </div>
            <div className='flex flex-row gap-3'>
              <span className="text-black">
                Meets
              </span>
              <span className="text-black font-bold">
                Flavor.
              </span>
            </div>
          </h1>
          <button className="mt-8 bg-[#111827] hover:bg-[#1f2937] text-white px-8 h-14 rounded-xl font-semibold shadow-lg text-sm transition-all">
            Eksplor Sekarang
          </button>
          <div className="flex items-center mt-8">
            <div className="flex -space-x-3">
              <img
                src={People1}
                alt=""
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <img
                src={People2}
                alt=""
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <img
                src={People3}
                alt=""
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
            </div>
            <p className="ml-4 text-[18px] text-[#3B3B3B] font-medium">
              1.000+ Pengguna
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block absolute -right-65 top-1/2 -translate-y-1/2">
        <img
          src={HeroImage}
          alt="Food"
          className="lg:w-229 max-w-none object-contain"/>
      </div>
      <div className="lg:hidden absolute -bottom-20 -right-35 opacity-25">
        <img
          src={HeroImage}
          alt="Food"
          className="`w-130"
        />
      </div>
    </section>
  )
}

export default Hero