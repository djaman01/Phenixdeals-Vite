import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AddArticle from "./OtherPages/AddArticle";
import Vendre from "./OtherPages/Vendre";
import Concept from "./OtherPages/Concept";
import ArticleCategory from "./OtherPages/ArticleCategory";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/vendre" element={<Vendre/>}></Route>
        <Route path="/addArticle" element={<AddArticle/>}></Route>
        <Route path="/concept" element={<Concept/>}></Route>
        <Route path="/articles/:type" element={<ArticleCategory/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}
