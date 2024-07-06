import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { globalState1 } from "../ContextComp";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { TfiMoney } from "react-icons/tfi";
import { BsQuestionSquare } from "react-icons/bs";
import { cross } from "../assets/icons";

const SideBar = () => {
  const { openSidebar, setOpenSidebar } = globalState1();

  return (
    <div className="prose" style={{ display: "flex", height: "100%" }}>
      <Sidebar
        backgroundColor="#ededed"
        breakPoint="all"
        onBackdropClick={() => setOpenSidebar(false)} //permet de mettre faux quand on clique hors de la sidebar
        toggled={openSidebar} //qd j'ouvre la sidebar et que je met false manuellement puis true, la transition duration marche
        transitionDuration={1300}
      >
        <div className="mb-[-7px] pl-52">
          <img
            src={cross}
            alt="Sortie"
            width={20}
            onClick={() => setOpenSidebar(false)}
          />
        </div>
        <Menu>
          <MenuItem
            component={<Link to="/" />}
            icon={<IoHomeOutline size={18} />}
          >
            Accueil
          </MenuItem>

          <SubMenu icon={<SlBasket size={18} />} label="Acheter">
            <MenuItem
              style={{ color: "#0160ee" }}
              component={<Link to="/allArticles" />}
            >
              Tous les articles
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
    </div>
  );
};

export default SideBar;
