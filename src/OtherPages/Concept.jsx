import Header from "../components/Header";

import Aos from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

import { SocialIcon } from "react-social-icons";
import { arrowRight } from "../assets/icons";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Concept = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

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
      <Helmet>
        <title>Concept | Phenix-deals</title>

        <meta
          name="description"
          content="Phenix-deals.com est un site web Marocain qui vous propose d'acheter et de vendre des tableaux d'artistes peintres"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://www.phenix-deals.com/concept"
        />

        <meta property="og:title" content="Concept | Phenix-deals" />

        <meta
          property="og:decription"
          content="Phenix-deals.com est un site web Marocain qui vous propose d'acheter et de vendre des tableaux d'artistes peintres"
        />

        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

<link rel="canonical" href="https://www.phenix-deals.com/concept" />
      </Helmet>

      <div className="mb-3 mt-3">
        <Header />
      </div>

      <div className=" padding grid grid-cols-3 items-center justify-center max-lg:grid-cols-1 max-lg:gap-y-5 max-lg:px-0 max-lg:py-10">
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
          <div className="relative z-10 mb-3 h-[350px] border border-transparent">
            <p className="text-center text-3xl font-bold max-lg:mt-7">
              Activité
            </p>
            <p className="text-lg">
              <b>phenixdeals.com</b> est un site web Marocain, spécialisé dans
              la vente de tableaux d'artiste peintres.
            </p>
            <p className="pt-2 text-lg">
              <b>Parcourez notre site:</b> Des tableaux aux styles variés sont
              disponibles à la vente
            </p>
          </div>
          <div className=" relative mb-5 mt-[-10px] flex items-center justify-center border border-transparent">
            <Link to="/" className="no-underline" onClick={scrollToTop}>
              <button className=" montserrat-regular mx-auto flex h-14 items-center gap-2 rounded-full bg-blue-500 px-4 ">
                <b>Nouveaux Tableaux</b>
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

          <div className="relative z-10 mb-3 h-[350px] border border-transparent">
            <p className="text-center text-3xl font-bold max-lg:mt-7">
              Vendez sur notre site !
            </p>
            <p className="text-lg max-lg:mt-10">
              <b>
                Mettez vos tableaux en vente sur notre site web{" "}
                <u>sans frais</u> !
              </b>{" "}
              <br />
              <br />
              Nous prenons notre commission après la vente de votre tableau:
              <br />
              <span className="font-semibold">
                Contactez-nous pour plus d'informations
              </span>
            </p>
          </div>
          <div className=" relative mb-5 mt-[-10px] flex items-center justify-center border border-transparent">
            <Link to="/vendre" className="no-underline" onClick={scrollToTop}>
              <button className=" montserrat-regular mx-auto flex h-14 items-center gap-2 rounded-full bg-green-500 px-4 ">
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

          <div className="relative z-10 mb-3 h-[350px] border border-transparent ">
            <p className="max-lg:text-l text-center text-3xl font-bold max-lg:mt-7 ">
              Abonnez-vous à nos réseaux sociaux
            </p>
            <p className="mt-[-10px] text-lg">
              <b> Rejoignez notre communauté</b> de passionnés d'art: <br />
              Restez informés de nos nouveautés en temps réel, ainsi que des
              événements artistiques à <b>Casablanca</b>
            </p>
          </div>
          <div className="relative mb-5 mt-[-10px] flex items-center justify-center border border-transparent">
            <div className="mx-auto flex h-10 w-80 cursor-pointer items-center justify-around rounded-full bg-orange-500 p-7 hover:shadow-custom ">
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
