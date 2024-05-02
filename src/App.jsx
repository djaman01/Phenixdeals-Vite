import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}
