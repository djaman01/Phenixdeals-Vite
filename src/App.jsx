import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomeSections/HomePage";
import AddArticle from "./AdminPages/AddArticle";
import Vendre from "./OtherPages/Vendre";
import Concept from "./OtherPages/Concept";
import Tableaux from "./OtherPages/Tableaux";
import FicheTableau from "./OtherPages/FicheTableau";
import AllArtists from "./OtherPages/AllArtists";
import PageArtist from "./OtherPages/PageArtist";
import Dashboard from "./AdminPages/Dashboard";
import SignUp from "./AdminPages/SignUp";
import Login from "./AdminPages/Login";
import BestDeals from "./OtherPages/BestDeals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/vendre" element={<Vendre />}></Route>
        <Route path="/addArticle" element={<AddArticle />}></Route>
        <Route path="/concept" element={<Concept />}></Route>
        <Route path="/bestDeals" element={<BestDeals />}></Route>
        <Route path="/allArtists" element={<AllArtists />}></Route>
        <Route path="/pageArtist/:auteur" element={<PageArtist />}></Route>
        <Route path="/tableaux" element={<Tableaux />}></Route>
        <Route
          path="/FicheTableau/:articleId"
          element={<FicheTableau />}
        ></Route>
        <Route path="/toSignUp" element={<SignUp />}></Route>
        <Route path="/toLogin" element={<Login />}></Route>
        <Route path="/toDashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
