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
        <div className="pl-52 mb-[-7px]">
          <img src={cross} alt="Sortie" width={20} onClick={()=>setOpenSidebar(false)}/>
        </div>
        <Menu>
          <MenuItem
            component={<Link to="/" />}
            icon={<IoHomeOutline size={18} />}
          >
            Accueil
          </MenuItem>

          <SubMenu icon={<SlBasket size={18} />} label="Acheter">
            <MenuItem style={{color:'#0160ee'}}>Tous les articles</MenuItem>
            <MenuItem>Tableaux</MenuItem>
            <MenuItem>Décoration</MenuItem>
            <MenuItem>Bijoux</MenuItem>
            <MenuItem>Livres</MenuItem>
          </SubMenu>

          <MenuItem icon={<TfiMoney size={18} />}>Vendre</MenuItem>

          <MenuItem icon={<BsQuestionSquare size={18} />}>À propos</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
