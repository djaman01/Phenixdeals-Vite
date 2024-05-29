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
          className="group prose relative mx-auto w-4/5 overflow-hidden rounded-2xl border bg-[#b5d9db] px-5 hover:text-white"
          data-aos="fade-down"
        >
          {/* grâce à groupe-hover: on peut cibler le parent div, en survolant le child div et translate-y-0 le remet à sa place */}
          {/* inset-0 permet de positionner l'overlay bleu, pile dans les bords du div parent, sans déborder */}
          <div className="absolute inset-0 translate-y-full transform bg-[#384c6c] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            {/* This div acts as the blue overlay */}
          </div>
          {/* This div contains the actual content and it's relative z-10 to appear above the overlay */}
          <div className="relative z-10">
            <p className="text-center text-3xl font-bold">Activité</p>
            <p className="text-lg">
              <b>phenixdeals.com</b> est une plateforme d'intérmédiation,
              spécialisé dans la vente d'objets d'arts, de décoration et de
              Bijoux.
            </p>
            <p className="pb-5 pt-5 text-lg">
              <b>Parcourez notre site:</b> Des articles variés sont disponibles,
              tous en rapport avec l'art et la décoration.
            </p>

            <button className=" montserrat-regular mx-auto mb-5 flex h-14 items-center gap-2 rounded-full bg-blue-500 px-4 ">
              <b>Nouveaux produits</b>
              <img
                src={arrowRight}
                alt="Right Arrow icon"
                className="ml-2 h-5 w-5 rounded-full"
              />
            </button>
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
            <p className="text-center text-3xl  font-bold">
              Vendez sur notre site !
            </p>
            <p className="mt-16 text-lg">
              <b>Postez vos bien sur le site sans frais: </b> <br />
              <br />
              Une fois vendu, nous prenons <u>15% de commission</u> sur le prix
              de vente
            </p>

            <button className=" montserrat-regular mx-auto mt-[115px] flex h-14 items-center gap-2 rounded-full bg-green-500 px-4 ">
              <b>Contactez-nous</b>
              <img
                src={arrowRight}
                alt="Right Arrow icon"
                className="ml-2 h-5 w-5 rounded-full"
              />
            </button>
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
            <p className="text-center text-3xl  font-bold">
              Abonnez-vous à nos réseaux sociaux
            </p>
            <p className="mt-[-10px] text-lg">
             <b> Rejoignez notre communauté</b> de passionnés d'art: <br />
              Restez informés de nos nouveautés en temps réel, ainsi que des événements
              artistiques à <b>Casablanca</b>
            </p>

            <div className="mt-12 mx-auto flex h-24 w-80 cursor-pointer items-center justify-around rounded-full bg-orange-500 p-7 hover:shadow-custom">
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
    </>
  );
};

export default Concept;
