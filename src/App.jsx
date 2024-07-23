import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AddArticle from "./OtherPages/AddArticle";
import Vendre from "./OtherPages/Vendre";
import Concept from "./OtherPages/Concept";
import Tableaux from "./OtherPages/Tableaux";
import Decoration from "./OtherPages/Decoration";
import Bijoux from "./OtherPages/Bijoux";
import AllArticles from "./OtherPages/AllArticles";
import FicheArticle from "./OtherPages/FicheArticle";
import AllArtists from "./OtherPages/AllArtists";
import PageArtist from "./OtherPages/PageArtist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/vendre" element={<Vendre/>}></Route>
        <Route path="/addArticle" element={<AddArticle/>}></Route>
        <Route path="/concept" element={<Concept/>}></Route>
        <Route path="/allArticles" element={<AllArticles/>}></Route>
        <Route path="/allArtists" element={<AllArtists/>}></Route>
        <Route path="/pageArtist/:auteur" element={<PageArtist/>}></Route>
        <Route path="/tableaux" element={<Tableaux/>}></Route>
        <Route path="/decorations" element={<Decoration/>}></Route>
        <Route path="/bijoux" element={<Bijoux/>}></Route>
        <Route path="/ficheArticle/:articleId" element={<FicheArticle/>}></Route>


      </Routes>
    </BrowserRouter>
  );
}
