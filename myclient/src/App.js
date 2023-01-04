import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Mystate } from "./context/context";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Mystate>
        <Navbar />;
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="register" element={<Register />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="view/:id" element={<Details />} />
        </Routes>
      </Mystate>
    </>
  );
}

export default App;
