import { Link } from "react-router-dom";
import { logoPhenix } from "../assets/images";
import SideBar from "./SideBar";

const Header = () => {
  return (
    <header className="font-roboto padding-x w-full py-1">
      <nav className="max-container flex items-center justify-between">
        <Link to="/">
          <img
            className="cursor-pointer"
            src={logoPhenix}
            alt="Logo Phenix"
            width={130}
            height={29}
          />
        </Link>

        <div className="mr-24 mt-2 flex flex-1 items-center justify-center gap-14 text-lg leading-normal text-slate-gray max-lg:hidden">
          <Link to="/">
            <p className="cursor-pointer rounded-lg px-2 py-1 text-xl hover:bg-[#e4e9f1] active:rounded-lg active:bg-[#3b82f6] active:px-2 active:py-1 active:text-white ">
              Accueil
            </p>
          </Link>
          <div className="group relative">
            <p className="cursor-pointer rounded-lg px-2 py-1 text-xl hover:bg-[#e4e9f1] ">
              Oeuvres
            </p>

            <div className="font-roboto absolute z-10 hidden w-52 cursor-pointer rounded-lg bg-white font-serif text-gray-700 shadow-xl ring-1 ring-slate-900/5 group-hover:block">
              <Link to="/allArtists">
                <p className="mb-3 mt-2 py-1 pl-2 hover:bg-[#e4e9f1] active:bg-[#3b82f6] active:text-white">
                  Tous les Artistes
                </p>
              </Link>
              <Link to="/oeuvres">
                <p className="mb-2 py-1 pl-2 hover:bg-[#e4e9f1] active:bg-[#3b82f6] active:text-white ">
                  Toutes les oeuvres
                </p>
              </Link>
            </div>
          </div>

          <Link to="/bestDeals">
            <p className="cursor-pointer rounded-lg px-2 py-1 text-xl text-[#ff5722] hover:bg-[#e4e9f1] active:rounded-lg active:bg-[#3b82f6] active:px-2 active:py-1 active:text-white ">
              Best Deals
            </p>
          </Link>
          <Link to="/concept">
            <p className="cursor-pointer rounded-lg px-2 py-1 text-xl hover:bg-[#e4e9f1] active:rounded-lg active:bg-[#3b82f6] active:px-2 active:py-1 active:text-white">
              Concept
            </p>
          </Link>

          <Link to="/contact">
            <p className="cursor-pointer rounded-lg px-2 py-1 text-xl hover:bg-[#e4e9f1] active:rounded-lg active:bg-[#3b82f6] active:px-2 active:py-1 active:text-white ">
              Contact
            </p>
          </Link>
        </div>

        <div className="hidden max-lg:block">
          <SideBar className="lg:hidden" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
