import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { globalState1 } from "../ContextComp";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { TfiMoney } from "react-icons/tfi";
import { BsQuestionSquare } from "react-icons/bs";
import { cross } from "../assets/icons";
import { useState } from "react";
import { hamburger } from "../assets/icons";

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
        <Menu className="mt-20">
          <MenuItem
            component={<Link to="/" />}
            icon={<IoHomeOutline size={18} />}
          >
            Accueil
          </MenuItem>

          <SubMenu icon={<SlBasket size={18} />} label="Acheter">
            <MenuItem
              style={{ color: "#0160ee" }}
              component={<Link to="/allArtists" />}
            >
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
            icon={<TfiMoney size={18} />}
            component={<Link to="/vendre" />}
          >
            Vendre
          </MenuItem>

          <MenuItem
            icon={<BsQuestionSquare size={18} />}
            component={<Link to="/concept" />}
          >
            Concept
          </MenuItem>
        </Menu>
      </Sidebar>

      <button className="sb-button" onClick={() => setToggled(!toggled)}>
        <img
          src={hamburger}
          alt="menu-hamburger"
          width={25}
          height={25}
          className="cursor-pointer"
        />
      </button>
    </div>
  );
};

export default SideBar;
