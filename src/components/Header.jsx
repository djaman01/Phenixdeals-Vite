import { globalState1 } from "../ContextComp";
import { hamburger } from "../assets/icons";
import { logoPhenix } from "../assets/images";
import SideBar from "./SideBar";
const Header = () => {
  const { openSidebar, setOpenSidebar } = globalState1();

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

        <div className="text-slate-gray flex flex-1 items-center justify-center gap-14 text-lg leading-normal max-lg:hidden">
          <p className="cursor-pointer py-1 px-2 rounded-lg hover:bg-[#e4e9f1]">Accueil</p>
          <p className="cursor-pointer py-1 px-2 rounded-lg hover:bg-[#e4e9f1] ">Acheter</p>
          <p className="cursor-pointer py-1 px-2 rounded-lg hover:bg-[#e4e9f1] ">Vendre</p>
          <p className="cursor-pointer py-1 px-2 rounded-lg hover:bg-[#e4e9f1]">Concept</p>
        </div>

        <div className="hidden max-lg:block">
          {openSidebar === false ? (
            <img
              src={hamburger}
              alt="menu-hamburger"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => setOpenSidebar(true)}
            />
          ) : (
            <SideBar className="lg:hidden" /> //Pour que si on oublie de la fermer, elle n'appraisse pas en grand écran
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
