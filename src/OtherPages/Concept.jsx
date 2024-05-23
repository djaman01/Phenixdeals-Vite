import Header from "../components/Header";

import Aos from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

import { SocialIcon } from "react-social-icons";
import { arrowRight } from "../assets/icons";

const Concept = () => {
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
      <Header />

      <div className="mt-16 grid grid-cols-3 items-center justify-center">
        {/* Activity card: overflow-hidden cache l'overlay bleu, car avec transform translate-y-full, on l'a placer à l'exterieur du container, pour que quand on hover, il revient à sa place */}
        <div
          className="group prose relative mx-auto w-4/5 overflow-hidden border bg-[#a7d1d9] hover:text-white"
          data-aos="fade-down"
        >
          {/* grâce à groupe-hover: on peut cibler le parent div, en survolant le child div et translate-y-0 le remet à sa place */}
          {/* inset-0 permet de positionner l'overlay bleu, pile dans les bords du div parent, sans déborder */}
          <div className="absolute inset-0 translate-y-full transform bg-[#384c6c] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            {/* This div acts as the blue overlay */}
          </div>
          {/* This div contains the actual content and it's relative z-10 to appear above the overlay */}
          <div className="relative z-10 pl-3">
            <p className="text-3xl font-bold">Activité</p>
            <p>
              <b>phenixdeals.com</b> est une plateforme d'intérmédiation,
              spécialisé dans la vente d'objets d'arts, de décoration et de
              Bijoux.
            </p>
            <p className="pb-5 pt-5">
              <b>Parcourez notre site:</b> Des articles variés sont disponibles,
              tous en rapport avec l'art et la décoration.
            </p>

            <button className="border-coral-red bg-coral-red font-montserrat mb-5 flex h-14 items-center justify-center gap-2 rounded-full border p-2 px-7 py-4 text-xl leading-none text-white ">
              Nouveaux produits
              <img
                src={arrowRight}
                alt="Right Arrow icon"
                className="ml-2 h-5 w-5 rounded-full"
              />
            </button>
          </div>
        </div>

        <div
          className="group relative mx-auto w-4/5 overflow-hidden border"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 translate-y-full transform bg-blue-500 transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            {/* This div acts as the blue overlay */}
          </div>
          {/* This div contains the actual content and it's relative z-10 to appear above the overlay */}
          <div className="relative z-10 p-3">
            <p className="pb-3 pt-3">Activité</p>
            <p>
              <b>phenixdeals.com</b> est une plateforme d'intérmédiation,
              spécialisé dans la vente d'objets d'arts, de décoration et de
              Bijoux.
            </p>
            <p className="pb-5 pt-5">
              <b>Parcourez notre site:</b> Des articles variés sont disponibles,
              tous en rapport avec l'art et la décoration.
            </p>
            <button className="pb-5">Voir les nouveaux produits</button>
          </div>
        </div>
        <div
          data-aos="fade-down"
          className=" mx-auto flex h-24 w-80 cursor-pointer items-center justify-around rounded-full bg-[#f2f2f2] p-7 hover:shadow-custom"
        >
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
    </>
  );
};

export default Concept;
