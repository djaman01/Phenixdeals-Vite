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
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Vendre = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
      // delay: 100,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact | Phenix-deals</title>

        <meta
          name="description"
          content="Contactez-nous pour acheter ou vendre des tableaux d'artistes peintres au Maroc. Retrouvez notre téléphone et notre e-mail pour toute demande."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.phenix-deals.com/vendre" />
        <meta property="og:title" content="Contact | Phenix-deals" />
        <meta
          property="og:description"
          content="Contactez-nous pour acheter ou vendre des tableaux d'artistes peintres au Maroc. Retrouvez notre téléphone et notre e-mail pour toute demande."
        />
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

        <link rel="canonical" href="https://www.phenix-deals.com/vendre" />
      </Helmet>

      <div className="mb-3 mt-3">
        <Header />
      </div>

      <main className="overflow-hidden">
        <div>
          <h1 className="montserrat-regular text-center text-[45px] text-blue-700 max-lg:mt-5">
            Contactez-nous
          </h1>
        </div>

        <div className="mx-auto mb-10 flex h-2 w-24 overflow-hidden rounded max-lg:mb-5">
          {/* flex-1 = the element will grow to fill available space along the main axis */}
          <div className=" flex-1 bg-[#00e676]"></div>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1">
          <div className="ml-32 mt-12 grid grid-cols-2 grid-rows-3 gap-8 max-lg:mx-14 max-lg:mb-10 max-lg:grid-cols-1">
            <div
              data-aos="flip-left"
              className="flex h-60 w-full flex-col items-center justify-center rounded-lg border border-gray-400 bg-blue-100"
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
              data-aos="flip-left"
              className=" flex h-60 w-full flex-col items-center justify-center rounded-lg border border-gray-400 bg-blue-100 text-gray-700"
            >
              <div className="mb-4 mt-[-45px] flex justify-center rounded-full bg-red-400 px-3 py-3">
                <IoShareSocialOutline color="white" size={20} />
              </div>
              <h2 className="mb-3 text-2xl font-semibold">Réseaux Sociaux</h2>
              <div className=" flex w-28 items-center justify-around">
                <a
                  href="https://www.instagram.com/phenixdeals/"
                  target="_blank"
                >
                  <BiLogoInstagramAlt size={32} className="cursor-pointer" />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=100090243464213"
                  target="_blank"
                >
                  <FaFacebook size={28} className="cursor-pointer" />
                </a>
              </div>
            </div>

            <div
              data-aos="flip-left"
              className="flex h-60 w-full flex-col items-center justify-center rounded-lg border border-gray-400 bg-blue-100"
            >
              <div className=" mb-4 mt-[-45px] flex justify-center rounded-full bg-red-400 px-3 py-3">
                <CiPhone color="white" size={20} />
              </div>
              <h2 className=" mb-3 text-2xl font-semibold text-gray-700">
                Téléphone
              </h2>
              <p className="font-palanquin text-xl text-gray-500">
                06-19-63-53-36
              </p>
            </div>
          </div>

          <div data-aos="fade-left" className="mt-3 max-lg:mb-24">
            <ContactForm />
          </div>
        </div>
      </main>

      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  );
};

export default Vendre;
