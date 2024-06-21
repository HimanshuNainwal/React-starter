import React from "react";

import { Routes, Route } from "react-router-dom";
import Hompage from "./Pages/Hompage";
import CategoryPage from "./Pages/CategoryPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./Pages/Product";




function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hompage />} />
        {/* <Route path="/category/new-arrivals.html" element={<CategoryPage />} /> */}
        <Route path="/category/:mohit" element={<CategoryPage />} />

        
        <Route path="/product" element={<Product/>} />

        {/* all */}
        <Route path="*" element={<p>Page Not Found</p>}  />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
