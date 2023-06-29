import React from "react";
import "./App.css";
import Main from "./pages/Main";
import Activity from "./pages/Activity";
import NavBar from "./components/NavBar";
import { Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/activity" element={<Activity/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
