import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddArticle from "./AdminPages/AddArticle";
import Dashboard from "./AdminPages/Dashboard";
import Login from "./AdminPages/Login";
import SignUp from "./AdminPages/SignUp";
import HomePage from "./HomeSections/HomePage";
import AllArtists from "./OtherPages/AllArtists";
import BestDeals from "./OtherPages/BestDeals";
import Concept from "./OtherPages/Concept";
import FicheOeuvre from "./OtherPages/FicheOeuvre";
import Oeuvres from "./OtherPages/Oeuvres";
import PageArtist from "./OtherPages/PageArtist";
import Vendre from "./OtherPages/Vendre";

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
        <Route path="/oeuvres" element={<Oeuvres />}></Route>
        <Route path="/:auteur/:articleId" element={<FicheOeuvre />}></Route>
        <Route path="/toSignUp" element={<SignUp />}></Route>
        <Route path="/toLogin" element={<Login />}></Route>
        <Route path="/toDashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
