import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { globalState1 } from "../ContextComp";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const SideBar = () => {
  const { openSidebar, setOpenSidebar } = globalState1();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        backgroundColor="#ededed"
        breakPoint="all"
        onBackdropClick={() => setOpenSidebar(false)} //permet de mettre faux quand on clique hors de la sidebar
        toggled={openSidebar}
      >
        <Menu>
          <MenuItem
            component={<Link to="/" />}
            icon={<IoHomeOutline size={18} />}
          >
            Accueil
          </MenuItem>
        </Menu>
      </Sidebar>

      
    </div>
  );
};

export default SideBar;
