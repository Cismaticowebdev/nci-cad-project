import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articles from "./views/Articles";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="articles" element={<Articles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
