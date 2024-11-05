import Header from "../components/Header";

import Aos from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

import { SocialIcon } from "react-social-icons";
import { arrowRight } from "../assets/icons";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Concept = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }


  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
    });
  });

  return (
    <>
    <div className="mt-3 mb-3">
      <Header />
    </div>

      <div className=" padding grid grid-cols-3 items-center justify-center max-lg:grid-cols-1 max-lg:px-0 max-lg:py-10 max-lg:gap-y-5">
        {/* Activity card: overflow-hidden cache l'overlay bleu, car avec transform translate-y-full, on l'a placer à l'exterieur du container, pour que quand on hover, il revient à sa place */}
        <div
          className="group prose relative mx-auto w-4/5 overflow-hidden rounded-2xl border bg-[#b5d9db] px-5 hover:text-white"
          data-aos="fade-down"
        >
          {/* grâce à groupe-hover: on peut cibler le parent div, en survolant le child div et translate-y-0 le remet à sa place */}
          {/* inset-0 permet de positionner l'overlay bleu, pile dans les bords du div parent, sans déborder */}
          <div className="absolute inset-0 translate-y-full transform bg-[#384c6c] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            {/* This div acts as the blue overlay */}
          </div>
          {/* This div contains the actual content and it's relative z-10 to appear above the  colored overlay */}
          <div className="relative z-10">
            <p className="text-center text-3xl font-bold max-lg:mt-7">Activité</p>
            <p className="text-lg">
              <b>phenixdeals.com</b> est une plateforme d'intérmédiation,
              spécialisé dans la vente d'objets d'arts, de décoration et de
              Bijoux.
            </p>
            <p className="pb-5 pt-5 text-lg">
              <b>Parcourez notre site:</b> Des articles variés en rapport avec l'art et la décoration sont disponibles 
            </p>
            <Link to="/" className="no-underline" onClick={scrollToTop}>
            <button className=" montserrat-regular mx-auto mb-5 flex h-14 items-center gap-2 rounded-full bg-blue-500 px-4 ">
              <b>Nouveaux Articles</b>
              <img
                src={arrowRight}
                alt="Right Arrow icon"
                className="ml-2 h-5 w-5 rounded-full"
              />
            </button>
            </Link>
          </div>
        </div>

        {/* Vendre Card */}
        <div
          className="group prose relative mx-auto h-full w-4/5 overflow-hidden rounded-2xl border bg-[#A0DAA9] px-5 hover:text-white"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 translate-y-full transform bg-[#00A170] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            {/* This div acts as the green overlay */}
          </div>

          <div className="relative z-10">
            <p className="text-center text-3xl font-bold max-lg:mt-7">
              Vendez sur notre site !
            </p>
            <p className="mt-16 text-lg max-lg:mt-10">
              <b>Mettez vos biens en vente sur notre site: </b> <br />
              <br />
              Contactez-nous pour plus de détails
            </p>
            <Link to="/vendre" className="no-underline" onClick={scrollToTop}>
              <button className=" montserrat-regular mx-auto mt-[142px] max-lg:mt-10 max-lg:mb-5 flex h-14 items-center gap-2 rounded-full bg-green-500 px-4 ">
                <b>Contactez-nous</b>
                <img
                  src={arrowRight}
                  alt="Right Arrow icon"
                  className="ml-2 h-5 w-5 rounded-full"
                />
              </button>
            </Link>
          </div>
        </div>

        {/* Social Media Card */}
        <div
          className="group prose relative mx-auto h-full w-4/5 overflow-hidden rounded-2xl border bg-[#FDAC53] px-5 hover:text-white"
          data-aos="fade-down"
        >
          <div className="absolute inset-0 translate-y-full transform bg-[#FE840E] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            {/* This div acts as the green overlay */}
          </div>

          <div className="relative z-10">
            <p className="text-center text-3xl font-bold max-lg:mt-7 max-lg:text-l ">
              Abonnez-vous à nos réseaux sociaux
            </p>
            <p className="mt-[-10px] text-lg">
              <b> Rejoignez notre communauté</b> de passionnés d'art: <br />
              Restez informés de nos nouveautés en temps réel, ainsi que des
              événements artistiques à <b>Casablanca</b>
            </p>

            <div className="mx-auto mt-[75px] max-lg:mt-10 max-lg:mb-5 flex h-24 w-80 max-lg:w-auto cursor-pointer items-center justify-around rounded-full bg-orange-500 p-7 hover:shadow-custom">
              <SocialIcon
                url="https://www.instagram.com/phenixdeals/"
                target="_blank"
              />
              <SocialIcon
                url="https://web.facebook.com/profile.php?id=100090243464213"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-8">
        <Footer />
      </footer>
    </>
  );
};

export default Concept;
