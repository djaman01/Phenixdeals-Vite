import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { globalState1 } from "../ContextComp";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { CiPhone } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { FaRegThumbsUp } from "react-icons/fa";

const SideBar = () => {
  const { openSidebar, setOpenSidebar } = globalState1();

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

          <SubMenu icon={<SlBasket size={20} />} label="Acheter">
            <MenuItem component={<Link to="/allArtists" />}>
              Tous les Artistes
            </MenuItem>
            <MenuItem component={<Link to="/tableaux" />}>Tableaux</MenuItem>
            <MenuItem component={<Link to="/decorations" />}>
              {" "}
              Décoration{" "}
            </MenuItem>
            <MenuItem component={<Link to="/bijoux" />}>Bijoux</MenuItem>
          </SubMenu>

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

          <MenuItem
            icon={<FaRegThumbsUp size={19} />}
            component={<Link to="/bestDeals" />}
          >
            Best Deals
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
