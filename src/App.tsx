import { Route, Routes } from "react-router";

import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AddProduct from "./components/pages/AddProduct";
import LikedProducts from "./components/pages/LikedProducts";
import SpecificProductPage from "./components/pages/SpecificProductPage";

import { useContext } from "react";
import UsersContext from "./contexts/UsersContext";
import { UsersContextTypes } from "./types";

const App = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  return (
    <>
      <Routes>
        <Route path="/" element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add" element={loggedInUser ? <AddProduct /> : <Home />} />
          <Route path="liked" element={loggedInUser ? <LikedProducts /> : <Home />} />
          <Route path=":id" element={<SpecificProductPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
