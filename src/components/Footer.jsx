import { Link } from "react-router-dom";
import { logoPhenix } from "../assets/images";
import { copyrightSign, facebook, instagram } from "../assets/icons";

const Footer = () => {
  //To go instantly to the top of the page, when redirecting to it
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <footer className="padding-x grid grid-cols-4">
      <div className="max-sm:w-48">
        <h4 className=" font-montserrat mb-6 text-2xl font-medium leading-normal">
          Contact
        </h4>

        {/* Comme il y y a un array links, dans l'array footerLinks: on va mapper dessus */}
        <ul>
          <li className="mt-3 cursor-pointer text-base leading-normal text-white-400 hover:text-slate-gray">
            Mail: fisatex@fisatex.com
          </li>
          <li className="mt-3 cursor-pointer text-base leading-normal text-white-400 hover:text-slate-gray">
            Tel: +212-5-22-30-33-67
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start">
        <Link to="/">
          <img
            src={logoPhenix}
            alt="Phenix logo"
            width={150}
            height={46}
            className="cursor-pointer rounded-lg bg-white px-2 py-2 max-sm:ml-20"
            onClick={scrollToTop}
          />
        </Link>
        <p className="mt-6 font-mono text-base leading-7 text-white-400 sm:max-w-sm">
          Site spécialisé dans la vente d'objets d'art, de décoration et de
          bijoux.
        </p>
      </div>

      <div className="max-sm:w-48">
        <h4 className="font-montserrat mb-6 text-2xl font-medium leading-normal">
        À propos
        </h4>
        <Link to="/concept">
          <p className=" mt-3 cursor-pointer text-base leading-normal text-white-400 hover:text-slate-gray">
            Concept
          </p>
        </Link>
      </div>

      <div className="">
        <h4 className="font-montserrat mb-6 text-2xl font-medium leading-normal">Réseaux Sociaux</h4>
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white">
          <img
            src={facebook}
            alt="Facebook Logo"
            width={24}
            height={24}
            className="" //je fais ça, même si vide, pour que prettier le formate verticalement
          />
          <img src={instagram} alt="Instagram Logo" width={24} height={24} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
