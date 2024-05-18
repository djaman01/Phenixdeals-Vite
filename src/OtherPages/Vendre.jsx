import Header from "../components/Header";

import { IoMailOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ContactForm from "../components/ContactForm";



const Vendre = () => {

  
useEffect(() => {
  Aos.init({
    once: true,
    offset: 100,
    duration: 1000,
    easing: 'ease-in-out',
    // delay: 100,
  });
})

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        
          <div className="mt-5 ">
            <h1 className="montserrat-regular text-center text-[45px] text-blue-700 max-lg:mt-4">
              Contactez-nous
            </h1>
          </div>

          <div className="mx-auto mb-10 flex h-2 w-24 overflow-hidden rounded">
            {/* flex-1 = the element will grow to fill available space along the main axis */}
            <div className=" bg-[#69f0ae] flex-1"></div>
            <div className=" bg-[#00e676] flex-1"></div>
            <div className=" bg-[#00c853] flex-1"></div>
          </div>

          <div className="my-16 flex justify-center gap-20 max-lg:flex-col max-lg:items-center">
            <div
              data-aos="flip-left"
              className="flex h-60 w-72 flex-col items-center justify-center rounded-lg border border-gray-400 bg-gray-100"
            >
              <div className=" mb-4 mt-[-45px] flex justify-center rounded-full bg-red-400 px-3 py-3">
                <IoMailOutline color="white" size={20} />
              </div>
              <h2 className=" mb-3 text-2xl font-semibold text-gray-700">
                E-mail
              </h2>
              <p className="font-palanquin text-xl text-gray-500">
                phenix.deals@gmail.com
              </p>
            </div>

            <div
              data-aos="flip-up"
              className="flex h-60 w-72 flex-col items-center justify-center rounded-lg border border-gray-400 bg-gray-100"
            >
              <div className=" mb-4 mt-[-45px] flex justify-center rounded-full bg-red-400 px-3 py-3">
                <CiPhone color="white" size={20} />
              </div>
              <h2 className=" mb-3 text-2xl font-semibold text-gray-700">
                Téléphone
              </h2>
              <p className="font-palanquin text-xl text-gray-500">
                /
              </p>
            </div>

            <div
              data-aos="flip-right"
              className=" flex h-60 w-72 flex-col items-center justify-center rounded-lg border border-gray-400 bg-gray-100 text-gray-700"
            >
              <div className=" mb-4 mt-[-45px] flex justify-center rounded-full bg-red-400 px-3 py-3">
                <IoShareSocialOutline color="white" size={20} />
              </div>
              <h2 className="mb-3 text-2xl font-semibold">Réseaux Sociaux</h2>
              <div className=" flex w-28 items-center justify-around">
                <FaFacebook size={28} className="cursor-pointer" />
                <BiLogoInstagramAlt size={32} className="cursor-pointer" />
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
      
      </main>
    </>
  );
};

export default Vendre;
