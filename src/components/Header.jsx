import { hamburger } from "../assets/icons";
import { logoPhenix } from "../assets/images";

const Header = () => {
  return (
    <header className="padding-x w-full py-1">
      <nav className="max-container flex items-center justify-between">
        <img
          className="cursor-pointer"
          src={logoPhenix}
          alt="Logo Phenix"
          width={130}
          height={29}
        />

        <div className="text-slate-gray flex flex-1 items-center justify-center gap-16 text-lg leading-normal max-lg:hidden">
          <p className="cursor-pointer hover:text-blue-500">Accueil</p>
          <p className="cursor-pointer hover:text-blue-500">Acheter</p>
          <p className="cursor-pointer hover:text-blue-500">Vendre</p>
          <p className="cursor-pointer hover:text-blue-500">Concept</p>
        </div>

        <div className="hidden max-lg:block">
          <img
            src={hamburger}
            alt="menu-hamburger"
            width={25}
            height={25}
            className="cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
