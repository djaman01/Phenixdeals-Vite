import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="prose" style={{ display: "flex", height: "100%" }}>
      <Sidebar
        backgroundColor="#ededed"
        breakPoint="all"
        onBackdropClick={() => setToggled(false)} //permet de mettre faux quand on clique hors de la sidebar
        toggled={toggled} //qd j'ouvre la sidebar et que je met false manuellement puis true, la transition duration marche
        transitionDuration={600}
      >
        <Menu className="mt-10">
          <MenuItem
            component={<Link to="/" />}
            icon={<IoHomeOutline size={20} />}
          >
            Accueil
          </MenuItem>

          <SubMenu icon={<FaRegImage size={22} />} label="Oeuvres">
            <MenuItem component={<Link to="/allArtists" />}>
              Tous les Artistes
            </MenuItem>
            <MenuItem component={<Link to="/oeuvres" />}>
              Toutes les oeuvres
            </MenuItem>
          </SubMenu>

          <MenuItem
            icon={<FaRegThumbsUp size={19} />}
            component={<Link to="/bestDeals" />}
          >
            Best Deals
          </MenuItem>

          <MenuItem
            icon={<CiPhone size={24} />}
            component={<Link to="/vendre" />}
          >
            Contact
          </MenuItem>

          <MenuItem
            icon={<BsInfoCircle size={20} />}
            component={<Link to="/concept" />}
          >
            Concept
          </MenuItem>
        </Menu>
      </Sidebar>
      {/* Le npm est codé de tel sorte à ce que le bouton apparaisse seul, puis quand on appuie la sidebar apparait */}
      <button className="cursor-pointer" onClick={() => setToggled(!toggled)}>
        {toggled ? <RxCross1 size={28} /> : <RxHamburgerMenu size={28} />}{" "}
        {/* //Si toggled==true fait apparaitre la Croix, sinon le menu Hamburger*/}
      </button>
    </div>
  );
};

export default SideBar;
