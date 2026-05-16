import logo_white from '../assets/logo/logo-beecook-white.png'
import Instagram from '../assets/sosmed/socmed-instagram.png'
import Facebook from '../assets/sosmed/socmed-facebook.png'
import X from '../assets/sosmed/socmed-x.png'
import Tiktok from '../assets/sosmed/socmed-tiktok.png'

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white px-6 md:px-14 py-14 mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-15 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <img
              src={logo_white}
              alt="BeeCook Logo"
              className="h-12 w-auto"
            />
          </div>
          <div>
            <h3 className="font-bold mb-4 text-2xl">
              Partnership
            </h3>
            <div className="space-y-2 text-xl text-gray-300">
              <p>Layanan</p>
              <p>Kontributor</p>
              <p>Iklan</p>
              <p>Karir</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-2xl">
              Bantuan
            </h3>
            <div className="space-y-2 text-xl text-gray-300">
              <p>FAQ</p>
              <p>Kontak Kami</p>
              <p>Aksesibilitas</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-start gap-4">
            <img
              src={Tiktok}
              alt="Tiktok"
              className="h-10 w-10 object-contain"
            />
            <img
              src={Facebook}
              alt="Facebook"
              className="h-10 w-10 object-contain"
            />
            <img
              src={Instagram}
              alt="Instagram"
              className="h-10 w-10 object-contain"
            />
            <img
              src={X}
              alt="X"
              className="h-10 w-10 object-contain"
            />
          </div>
        </div>
        <div className="mt-12 pt-6 text-left text-xl text-[#FFFFFF]">
          BECOOK MEDIA | ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  )
}

export default Footer