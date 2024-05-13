import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AddArticle from "./OtherPages/AddArticle";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/addArticle" element={<AddArticle/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}
