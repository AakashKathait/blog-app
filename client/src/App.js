import React, { useState } from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import FullBlog from "./pages/FullBlog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  const [showNav, setShowNav] = useState(true);
  //show and hide navbar on scroll
  let lastScroll = window.scrollY;
  window.addEventListener("scroll", () => {
    if (window.scrollY < 0) {
      setShowNav(true);
    } else if (lastScroll < window.scrollY) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    lastScroll = window.scrollY + 10;
  });
  return (
    <>
      <Router>
        <div className="navbar-container">
          <Navbar showNav={showNav} />
        </div>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/new-blog" element={<CreateBlog />} />
            <Route path="/bloglist" element={<BlogList />} />
            <Route path="/fullblog/:id" element={<FullBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
