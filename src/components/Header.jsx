import { globalState1 } from "../ContextComp";
import { hamburger } from "../assets/icons";
import { logoPhenix } from "../assets/images";
import SideBar from "./SideBar";
const Header = () => {
  const { openSidebar, setOpenSidebar } = globalState1();

  return (
    <header className="font-roboto padding-x w-full py-1">
      <nav className="max-container flex items-center justify-between">
        <img
          className="cursor-pointer"
          src={logoPhenix}
          alt="Logo Phenix"
          width={130}
          height={29}
        />

        <div className="text-slate-gray flex flex-1 items-center justify-center gap-14 text-lg leading-normal max-lg:hidden">
          <p className="cursor-pointer rounded-lg px-2 py-1 hover:bg-[#e4e9f1]">
            Accueil
          </p>
          <div className="group relative">
            <p className="cursor-pointer rounded-lg px-2 py-1 hover:bg-[#e4e9f1] ">
              Acheter
            </p>
            <div className="font-roboto absolute z-10 hidden w-52 cursor-pointer rounded-lg bg-white font-serif text-gray-700 ring-1 shadow-xl ring-slate-900/5 group-hover:block">
              <p className="mt-1 py-1 pl-2 hover:bg-[#e4e9f1] text-[#0160ee] ">Tous les articles</p>
              <p className="mt-1 py-1 pl-2 hover:bg-[#e4e9f1] ">Tableaux</p>
              <p className="mt-1 py-1 pl-2 hover:bg-[#e4e9f1] ">Décoration</p>
              <p className="mt-1 py-1 pl-2 hover:bg-[#e4e9f1] ">Bijoux</p>
            </div>
          </div>
          <p className="cursor-pointer rounded-lg px-2 py-1 hover:bg-[#e4e9f1] ">
            Vendre
          </p>
          <p className="cursor-pointer rounded-lg px-2 py-1 hover:bg-[#e4e9f1]">
            Concept
          </p>
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
