import { Link } from "react-router-dom";
import { logoPhenix } from "../assets/images";
import { copyrightSign, facebook, instagram } from "../assets/icons";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  //To go instantly to the top of the page, when redirecting to it
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <footer className="padding-x grid grid-cols-3 bg-blue-100 py-5">
      <div className="flex flex-col items-center ">
        <h4 className="font-montserrat mb-4 text-2xl font-medium leading-normal">
          Contact
        </h4>

        {/* Comme il y y a un array links, dans l'array footerLinks: on va mapper dessus */}
        <ul>
          <li className="font-roboto mt-3 text-lg leading-normal">
            <b>Mail:</b> phenix.deals@gmail.com
          </li>
          <li className="font-roboto mt-3 text-lg leading-normal">
            <b>Tel:</b> /
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center">
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
        <p className="text-white-400 mt-6 w-[400px] font-mono text-base leading-7">
          Site spécialisé dans la vente d'objets d'art, de décoration et de
          bijoux.
        </p>
      </div>

      <div className=" flex flex-col items-center ">
        <h4 className="font-montserrat mb-4 text-2xl font-medium leading-normal">
          À propos
        </h4>
        <Link to="/concept" onClick={scrollToTop}>
          <p className="font-roboto mt-[-5px] cursor-pointer text-lg hover:underline ">
            Concept
          </p>
        </Link>

        <h4 className="font-montserrat mb-4 mt-2 text-2xl font-medium leading-normal">
          Réseaux Sociaux
        </h4>
        <div className="flex justify-around w-40 cursor-pointer ">
          <SocialIcon
            url="https://www.instagram.com/phenixdeals/"
            target="_blank"
            style={{ height: 48, width: 48 }}
          />
          <SocialIcon
            url="https://web.facebook.com/profile.php?id=100090243464213"
            target="_blank"
            style={{ height: 48, width: 48 }}
          />
        </div>
      </div>

      <div className=""></div>
    </footer>
  );
};

export default Footer;
