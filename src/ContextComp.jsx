import { createContext, useContext, useState } from "react";

//Creating the context that'll store the states that we want to use globally
const context1 = createContext();

//Storing the states inside the context
export const ContextComp = ( {children}) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
   <context1.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
   </context1.Provider>
  )
}

//To Use the context and the state that it stores globally
export const globalState1 = () => useContext(context1)